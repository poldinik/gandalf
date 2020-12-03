import logging
from flask import request
from flask_restplus import Resource, Namespace
from validate_email import validate_email
from gandalf_app.database import db
from gandalf_app.auth.jwt_auth import auth
from gandalf_app.database.models import User
from gandalf_app.auth.jwt_auth import refresh_jwt
from gandalf_app.api.auth.serial import register_model, login_model, refresh_token_model, logout_model, rest_password_model
from gandalf_app.auth.user_utils import save_new_user
from gandalf_app.auth.auth_utils import Auth
from gandalf_app.api.errors import CustomFlaskErr as notice

ns = api.namespace('auth', description='Operazioni legate all\'autenticazione')
# parser = ns.parser()

# parser.add_argument('Authorization',type=str,required=True,location='headers',help='Bearer Access Token')


######  API
@auth_ns.route('/register')
class RegisterRequired(Resource):


    @auth_ns.expect(register_model, validate=True)
    def post(self):
        data = request.json
        return save_new_user(data=data)


@auth_ns.route('/login')
class LoginRequired(Resource):


    @auth_ns.expect(login_model, validate=True)
    def post(self):
        post_data = request.json
        print(post_data)
        return Auth.login_user(data=post_data)


@auth_ns.route('/logout')
class Logout(Resource):

    # @auth.login_required
    def post(self):
        post_data = request.json
        return Auth.logout(data=post_data)


@auth_ns.route('/refresh_token')
class RefreshTokenRequired(Resource):

    def post(self):
        post_data = request.json
        return Auth.refresh_token(data=post_data)


@auth_ns.route('/confirm/<confirm_token>', endpoint="confirm")
class ConfirmRquired(Resource):

    # @auth_ns.expect(login_model, validate=True)
    @auth_ns.param('email', required=True)
    def get(self, confirm_token):

        # Get Confirm email
        confirm_email = request.args.get('email')

        # Check confirm email
        # if  validate_email(confirm_email, check_mx=True, verify=True):

        #    return {"message": "email invalid input."}, 423
        # use staticmethod verify confirm toke
        if User.verify_confirm_token(confirm_token, confirm_email):

            raise notice(status_code=200, return_code=30002, action_status=True)

        else:

            raise notice(status_code=202, return_code=20009, action_status=False)
