from flask_restplus import fields
from gandalf_app.api.restplus import api

project = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})

project_created_response = api.model('ProjectStatus', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'status': fields.String(required=True, description='Project status'),
    'name': fields.String(required=True, description='Project name'),
})

project_recepit_response = api.model('ProjectReceipt', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
})

project_details_response = api.model('ProjectDetails', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
    # TODO: serializzare probes, reference e additional data
})

media_receipt_response = api.model('MediaReceipt', {
    'id': fields.Integer(required=True, description='Media Id'),
    'location': fields.String(required=True, description='Media location'),
    'fileName': fields.String(required=True, description='Media file name'),
})

data_receipt_response = api.model('DataReceipt', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'fileName': fields.String(required=True, description='Project name'),
})

result_summary_response = api.model('ResultSummary', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
})

result_details_response = api.model('ResultDetails', {
    'id': fields.Integer(required=True, description='Project Id'),
    'location': fields.String(required=True, description='Project location'),
    'name': fields.String(required=True, description='Project name'),
})
