from gandalf_app.api.restplus import api
from flask_restplus import fields, Namespace

register_model = api.model('Register', {
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
})

login_model = api.model('Authentication', {
        'email': fields.String(required=True, description='user email address'),
        'password': fields.String(required=True, description='user password'),
})

logout_model = api.model('Logout', {
        'refresh_token': fields.String(required=True, description='refresh token'),
})

refresh_token_model = api.model('AuthenticationRefresh', {
        'refresh_token': fields.String(required=True, description='refresh token'),
})

rest_password_model = api.model('RestPassword', {
        'email': fields.String(required=True, description='user email address'),
        'old_password': fields.String(required=True, description='user old password'),
        'new_password': fields.String(required=True, description='user new password'),
})