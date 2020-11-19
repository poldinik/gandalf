import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api

log = logging.getLogger(__name__)

ns = api.namespace('projects', description='Operazioni legate ai Progetti')


@ns.route('/')
class PostsCollection(Resource):

    def get(self):
        """
        Returns list of projects.
        """
        return ""

    def post(self):
        """
        Creates a new Project.
        """
        return None, 201
