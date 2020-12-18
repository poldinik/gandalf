import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api
from gandalf_app.api.tool.serializers import tool, tool_datail_response
from gandalf_app.api.tool.business import post_tool, get_tools, get_by_id, delete_tool
from gandalf_app.auth.jwt_auth import auth
log = logging.getLogger(__name__)

ns = api.namespace('tools', description='Introspection')


@ns.route('/')
class ToolCollectionResource(Resource):

    @auth.login_required
    @api.marshal_with(tool_datail_response)
    @ns.response(500, 'Backend is not responding.')
    def get(self):
        """
        List of available tools.
        """
        return get_tools(), 200

    @auth.login_required
    @api.expect(tool)
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(tool_datail_response)
    def post(self):
        """
        Creates a new Tool.
        """
        created = post_tool(request.json)
        return created, 201


@ns.route('/<int:toolId>')
class SingleToolResource(Resource):

    @auth.login_required
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(tool_datail_response)
    def get(self, toolId):
        """
        Returns a Tool by id.
        """
        return get_by_id(toolId), 200

    @auth.login_required
    @ns.response(500, 'Backend is not responding.')
    def delete(self, toolId):
        """
        Deletes a Tool by id.
        """
        return delete_tool(toolId), 204





