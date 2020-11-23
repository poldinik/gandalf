import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.project.serializers import project, project_created_response
from gandalf_app.api.restplus import api
from gandalf_app.api.project.business import post_project, get_project
from gandalf_app.settings import MULTIMEDIA_DIRECTORY

log = logging.getLogger(__name__)

ns = api.namespace('projects', description='Operazioni legate ai Progetti')

# parser = ns.parser()
# parser.add_argument('Authorization',
#                     type=str,
#                     required=True,
#                     location='headers',
#                     help='Bearer Access Token')


@ns.route('/')
class ProjectsManagementResource(Resource):

    def get(self):
        """
        Returns list of Projects.
        """
        return None, 200

    @api.expect(project)
    @api.marshal_with(project_created_response)
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

    def post(self, projectId):
        """
        Upload a Media File for a Project by id.
        """
        if 'file' not in request.files:
            flash('No file part')
            # return redirect(request.url)
        file = request.files['file']

        if file.filename == '':
            flash('No selected file')
            # return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # salvo il mio file in locale
            file.save(os.path.join(MULTIMEDIA_DIRECTORY, filename))
            # return redirect(url_for('uploaded_file', filename=filename))
        return None, 200


@ns.route('/<int:projectId>/media/<int:mediaId>')
class SingleMediaFilesManagementResource(Resource):

    def delete(self, projectId, mediaId):
        """
        Deletes a Media File by id from a Project.
        """
        return None, 204


@ns.route('/<int:projectId>/data')
class DataFilesManagementResource(Resource):

    def post(self, projectId):
        """
        Upload a Data File for a Project by id.
        """
        return None, 200


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





