import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api

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

    def post(self):
        """
        Creates a new Project.
        """
        return None, 201


@ns.route('/<int:projectId>')
class SingleProjectManagementResource(Resource):

    def get(self, projectId):
        """
        Returns a Project by id.
        """
        return None, 200

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





