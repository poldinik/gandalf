from flask_restplus import fields
from gandalf_app.api.restplus import api

project = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})

project_created_response = api.model('Project', {
    'name': fields.String(required=True, description='Project name'),
})
