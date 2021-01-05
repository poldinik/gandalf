from flask_restplus import fields
from tool_example_app.api.restplus import api

project = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})

uploadedMediaFile = api.model('UploadedMediaFile', {
    'id': fields.Integer(required=True, description='UploadedMediaFile Id'),
    'fileName': fields.String(required=True, description='UploadedMediaFile file name'),
    'hash': fields.String(required=True, description='UploadedMediaFile hash code of file'),
    # TODO:  thumbnail, come crearlo?
})

uploadedDataFile = api.model('UploadedDataFile', {
    'id': fields.Integer(required=True, description='UploadedDataFile Id'),
    'fileName': fields.String(required=True, description='UploadedDataFile file name'),
    'hash': fields.String(required=True, description='UploadedDataFile hash code of file'),
    # TODO:  thumbnail, come crearlo?
    'dataType': fields.String(required=True, description='UploadedDataFile file data type'),
})

resultSummary = api.model('ResultSummary', {
    'id': fields.Integer(required=True, description='ResultSummary Id'),
    'location': fields.String(required=True, description='ResultSummary location'),
    'probes': fields.List(fields.String()),
    'toolId': fields.Integer(),
    'name': fields.String(required=True, description='A description of this result '),
    'resultType': fields.String(required=True, description='Type of result produced by the used tool.'),
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
    'status': fields.String(required=True, description='Project status'),
    'name': fields.String(required=True, description='Project name'),
    'location': fields.String(required=True, description='Project location'),
    'probes': fields.List(fields.Nested(uploadedMediaFile)),
    'references': fields.List(fields.Nested(uploadedMediaFile)),
    'additionalData': fields.List(fields.Nested(uploadedDataFile)),
    'results': fields.List(fields.Nested(resultSummary))
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


start_analysis_response = api.model('StartAnalysis', {
    'uuid': fields.Integer(required=True, description='Uuid for analysis'),
})