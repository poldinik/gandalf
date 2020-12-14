import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api

log = logging.getLogger(__name__)

ns = api.namespace('token', description='Operazioni legate al JSON Web Token')


@ns.route('/')
class TokenResource(Resource):

    def post(self):
        """
        Obtains a JWT for a User.
        """
        return None, 200


@ns.route('/refresh')
class RefreshTokenResource(Resource):

    def post(self):
        """
        Obtains a JWT for a User.
        """
        return None, 200





