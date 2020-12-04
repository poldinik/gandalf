from flask_restplus import fields
from gandalf_app.api.restplus import api

project = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})

project_created_response = api.model('ProjectStatus', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
})


# project_recepit_response = api.model('ProjectReceipt', {
#     'id': fields.Integer(required=True, description='Project Id'),
#     'location': fields.String(required=True, description='Project location'),
#     'name': fields.String(required=True, description='Project name'),
# })
#
# project_details_response = api.model('ProjectDetails', {
#     'id': fields.Integer(required=True, description='Project Id'),
#     'location': fields.String(required=True, description='Project location'),
#     'name': fields.String(required=True, description='Project name'),
# })
