import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api
from gandalf_app.api.tool.serializers import tool, tool_recepit_response
from gandalf_app.auth.jwt_auth import auth
log = logging.getLogger(__name__)

ns = api.namespace('tools', description='Operazioni legate ai Tool')


@ns.route('/')
class ToolCollectionResource(Resource):

    def get(self):
        """
        Returns list of Tools.
        """
        return None, 200

    @auth.login_required
    @api.expect(tool)
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(tool_recepit_response)
    def post(self):
        """
        Creates a new Tool.
        """
        return None, 201


@ns.route('/<int:toolId>')
class SingleToolResource(Resource):

    def get(self, toolId):
        """
        Returns a Tool by id.
        """
        return None, 200

    def delete(self, id):
        """
        Deletes a Tool by id.
        """
        return None, 204





