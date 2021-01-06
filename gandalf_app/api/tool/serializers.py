from flask_restplus import fields
from gandalf_app.api.restplus import api

tool_datail_response = api.model('ToolDetail', {
    'id': fields.Integer(required=True, description='tool id'),
    'name': fields.String(required=True, description='tool name'),
    'description': fields.String(required=True, description='tool description'),
    'endpoint': fields.String(required=True, description='tool endpoint api'),
    'method': fields.String(required=True, description='endpoint api http method'),
    'supportedDataTypes': fields.List(fields.String()),
    'supportedDataFormats': fields.List(fields.String()),
    'references': fields.List(fields.String())
})

tool = api.model('Tool', {
    'name': fields.String(required=True, description='tool name'),
    'description': fields.String(required=True, description='tool description'),
    'endpoint': fields.String(required=True, description='tool endpoint api'),
    'method': fields.String(required=True, description='endpoint api http method'),
    'supportedDataTypes': fields.List(fields.String()),
    'supportedDataFormats': fields.List(fields.String()),
    'references': fields.List(fields.String())
})


