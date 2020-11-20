import logging

from flask import request
from flask_restplus import Resource
from gandalf_app.api.restplus import api

log = logging.getLogger(__name__)

ns = api.namespace('users', description='Operazioni legate agli utenti')


@ns.route('/')
class UserCollectionResource(Resource):

    def get(self):
        """
        Returns list of Users.
        """
        return None, 200

    def post(self):
        """
        Creates a new User.
        """
        return None, 201


@ns.route('/<int:userId>')
class SingleUserResource(Resource):

    def get(self, userId):
        """
        Returns a User by id.
        """
        return None, 200

    def delete(self, id):
        """
        Deletes a User by id.
        """
        return None, 204




