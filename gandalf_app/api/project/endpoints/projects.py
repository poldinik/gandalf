import logging.config

from flask import request
from flask_restplus import Resource
from gandalf_app.api.project.serializers import project, project_created_response, project_recepit_response, \
    media_receipt_response, project_details_response, start_analysis_recepit_response
from gandalf_app.api.restplus import api
from gandalf_app.api.project.business import post_project, get_project, get_projects, add_data_to_project, \
    add_media_to_project, delete_project, deleteMediaForProject, deleteDataForProject, startAnalysis, getUuid, \
    update_analysis, get_project_with_analysis_with_uuid
from gandalf_app.settings import MULTIMEDIA_DIRECTORY
from flask import jsonify
import os
from werkzeug.utils import secure_filename
from gandalf_app.auth.jwt_auth import auth
from flask_restplus import reqparse
import flask
from .sse import announcer, format_sse
from pathlib import Path

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

ns = api.namespace('projects', description='Project management')

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_ROLES = {'PROBE', 'REFERENCE'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def allowed_role(role):
    return role in ALLOWED_ROLES


# parser = ns.parser()
# parser.add_argument('Authorization',
#                     type=str,
#                     required=True,
#                     location='headers',
#                     help='Bearer Access Token')


@ns.route('/')
class ProjectsManagementResource(Resource):

    @auth.login_required
    @api.marshal_with(project_created_response)
    # @api.doc(tags=['Project management'])
    @ns.response(500, 'Backend is not responding.')
    def get(self):
        """
        Obtain the list of available projects.
        """
        projects = get_projects()
        print("progetti recuperati: " + str(len(list(projects))))
        return projects, 200

    @auth.login_required
    @api.expect(project)
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(project_recepit_response)
    def post(self):
        """
        Create a new project.
        """
        created = post_project(request.json)
        return created, 201


@ns.route('/<int:projectId>')
class SingleProjectManagementResource(Resource):

    @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(project_details_response)
    def get(self, projectId):
        """
        Obtain project status.
        """

        return get_project(projectId), 200

    @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    def delete(self, projectId):
        """
        Delete a project.
        """

        delete_project(projectId)
        return None, 204


@ns.route('/<int:projectId>/start')
class AnalysisStartForProjectResource(Resource):

    # @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    #@api.marshal_with(start_analysis_recepit_response)
    def post(self, projectId):
        """
        Start an analysis for a project
        """

        # curl http://localhost:8888/api/v1/projects/1/start -d "tools=1,2,3"
        # http://localhost:8888/api/v1/projects/1/start?tools=1,2,3 POST
        parser = reqparse.RequestParser()
        parser.add_argument('tools', action='split', required=True)
        args = parser.parse_args()
        toolIds = list(args['tools'])

        log.info("Creazione cartella per risultati dell'analisi")
        result_uuid = getUuid()
        result_path = MULTIMEDIA_DIRECTORY + '/' + result_uuid + "-" + str(projectId)
        #Path(result_path).mkdir(parents=True, exist_ok=True)

        log.info("tools: " + str(len(toolIds)))
        uuid_list = []
        for i in toolIds:
            toolId = int(i)
            log.info("Lancia analisi per il tool " + str(toolId))
            uuid_list.append(startAnalysis(projectId, toolId, result_uuid, result_path, len(toolIds)))

        # risposta con uuid dell'analisi lanciata
        response = {
            'projectId': projectId,
            'uuid_list': uuid_list
        }
        return response, 200


@ns.route('/<int:projectId>/ping')
class AnalysisPingForProjectResource(Resource):

    # @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    def post(self, projectId):
        """
        Webhook per endpoint del tool per notificare lo stato di elaborazione
        """
        parser = reqparse.RequestParser()
        parser.add_argument('uuid')
        # upload_file_parser.add_argument('dataType', required=True)
        args = parser.parse_args()
        analysisUuid = args['uuid']
        print("Ping ricevuto per analisi: " + str(analysisUuid))
        log.info("Aggiorna l'analisi")
        update_analysis(analysisUuid)
        msg = format_sse(data=analysisUuid)
        announcer.announce(msg=msg)
        return {}, 200


@ns.route('/<int:projectId>/listen')
class AnalysisListenForProjectResource(Resource):

    # @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    def get(self, projectId):
        """
        SSE reactive verso il client per stato elaborazione analisi
        """
        parser = reqparse.RequestParser()
        parser.add_argument('uuid')
        args = parser.parse_args()
        analysisUuid = args['uuid']

        def stream():
            messages = announcer.listen()  # ritorna un queue.Queue
            while True:
                msg = messages.get()  # blocca finchè non arriva un nuovo messaggio
                yield msg

        return flask.Response(stream(), mimetype='text/event-stream')


@ns.route('/analysis')
class ProjectWithAnalysisResource(Resource):

    # @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(project_details_response)
    def get(self):
        """
        Ottiene il progetto che possiede una analisi con un certo uuid
        """
        parser = reqparse.RequestParser()
        parser.add_argument('uuid', required=True)
        args = parser.parse_args()
        analysisUuid = args['uuid']

        return get_project_with_analysis_with_uuid(analysisUuid), 200


@ns.route('/<int:projectId>/media')
class MediaFilesManagementResource(Resource):

    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(media_receipt_response)
    def post(self, projectId):
        """
        Upload a media file to a project.
        """
        upload_file_parser = reqparse.RequestParser()
        upload_file_parser.add_argument('name')
        upload_file_parser.add_argument('role')
        # upload_file_parser.add_argument('dataType', required=True)
        args = upload_file_parser.parse_args()
        name = args['name']
        # PROBE, REFERENCE
        role = args['role']

        # dataType = args['dataType']
        if 'file' not in request.files:
            flash('No file part')
            # return redirect(request.url)
        file = request.files['file']

        if file.filename == '':
            flash('No selected file')
            # return redirect(request.url)
            # /TODO: usare un filtro o va bene qualsiasi estensione?
        # if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # salvo il mio file in locale
        log.info("Salvo file...")
        # MULTIMEDIA_DIRECTORY = GandalfApp.config['MULTIMEDIA_DIRECTORY']
        # add_data_to_project(projectId, os.path.join(MULTIMEDIA_DIRECTORY, filename))
        if role and allowed_role(role):
            log.info("Role permesso, aggiunta a progetto")
            if name:
                filename = name
            file.save(os.path.join(MULTIMEDIA_DIRECTORY, filename))
            created = add_media_to_project(projectId, filename, role)
            # return add_data_to_project(projectId, os.path.join(MULTIMEDIA_DIRECTORY, filename))
            return created, 201
        return None, 400

        # return redirect(url_for('uploaded_file', filename=filename))
        # return "ok!", 200


@ns.route('/<int:projectId>/media/<int:mediaId>')
class SingleMediaFilesManagementResource(Resource):

    @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    def delete(self, projectId, mediaId):
        """
        Delete a media file from a project.
        """
        deleteMediaForProject(projectId, mediaId)
        return None, 204


@ns.route('/<int:projectId>/data')
class DataFilesManagementResource(Resource):

    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(media_receipt_response)
    def post(self, projectId):
        """
        Upload a data file to a project.
        """
        upload_file_parser = reqparse.RequestParser()
        upload_file_parser.add_argument('name')
        upload_file_parser.add_argument('dataType', required=True)
        args = upload_file_parser.parse_args()
        name = args['name']
        dataType = args['dataType']

        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        filename = secure_filename(file.filename)
        # salvo il mio file in locale
        log.info("Salvo file...")
        if name:
            filename = name
        file.save(os.path.join(MULTIMEDIA_DIRECTORY, filename))
        created = add_data_to_project(projectId, filename, dataType)

        return created, 201


@ns.route('/<int:projectId>/data/<int:dataId>')
class SingleDataFilesManagementResource(Resource):

    @auth.login_required
    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    def delete(self, projectId, dataId):
        """
        Delete a data file from a project.
        """
        deleteDataForProject(projectId, dataId)
        return None, 204


@ns.route('/<int:projectId>/results/<int:resultId>')
class ResultInspectionResource(Resource):

    def get(self, projectId, resultId):
        """
        Obtain a result's data.
        """
        return None, 200
