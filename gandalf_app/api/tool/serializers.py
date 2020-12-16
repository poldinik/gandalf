from flask_restplus import fields
from gandalf_app.api.restplus import api

tool_datail_response = api.model('ToolDetail', {
        'email': fields.String(required=True, description='user email address'),
        'old_password': fields.String(required=True, description='user old password'),
        'new_password': fields.String(required=True, description='user new password'),
})

tool = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})


tool_recepit_response = api.model('ProjectReceipt', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
})