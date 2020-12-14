import logging.config

from flask import request
from flask_restplus import Resource
from gandalf_app.api.project.serializers import project, project_created_response, project_recepit_response, \
    media_receipt_response
from gandalf_app.api.restplus import api
from gandalf_app.api.project.business import post_project, get_project, get_projects, add_data_to_project, \
    add_media_to_project
from gandalf_app.settings import MULTIMEDIA_DIRECTORY
from flask import jsonify
import os
from werkzeug.utils import secure_filename
from gandalf_app.auth.jwt_auth import auth
from flask_restplus import reqparse

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

ns = api.namespace('projects', description='Operazioni legate ai Progetti')

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
    def get(self):
        """
        Returns list of Projects.
        """
        projects = get_projects()
        print("progetti recuperati: " + str(len(list(projects))))
        return projects, 200

    @api.expect(project)
    @api.marshal_with(project_recepit_response)
    def post(self):
        """
        Creates a new Project.
        """
        created = post_project(request.json)
        return created, 201


@ns.route('/<int:projectId>')
class SingleProjectManagementResource(Resource):

    @api.marshal_with(project_created_response)
    def get(self, projectId):
        """
        Returns a Project by id.
        """

        return get_project(projectId), 200

    def delete(self, id):
        """
        Deletes a Project by id.
        """
        return None, 204


@ns.route('/<int:projectId>/start')
class AnalysisStartForProjectResource(Resource):

    def post(self):
        """
        Stars a new Analysis for a Project.
        """
        return None, 200


@ns.route('/<int:projectId>/media')
class MediaFilesManagementResource(Resource):

    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(media_receipt_response)
    def post(self, projectId):
        """
        Upload a Media File for a Project by id.
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

    def delete(self, projectId, mediaId):
        """
        Deletes a Media File by id from a Project.
        """
        return None, 204


@ns.route('/<int:projectId>/data')
class DataFilesManagementResource(Resource):

    @ns.response(404, 'Not Found: the requested project has not been found.')
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(media_receipt_response)
    def post(self, projectId):
        """
        Upload a Data File for a Project by id.
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

    def delete(self, projectId, dataId):
        """
        Deletes a Data File by id from a Project.
        """
        return None, 204


@ns.route('/<int:projectId>/results/<int:resultId>')
class ResultInspectionResource(Resource):

    def get(self, projectId, resultId):
        """
        Obtain a result data
        """
        return None, 200
