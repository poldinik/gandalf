from flask import make_response, jsonify
from gandalf_app.auth.jwt_auth import auth

SERVER_ERROR_500 = ({"message": "An error occured."}, 500)
NOT_FOUND_404 = ({"message": "Resource could not be found."}, 404)
NO_INPUT_400 = ({"message": "No input data provided."}, 400)
INVALID_INPUT_422 = ({"status": 1, "message": "Invalid input."}, 422)

PASSWORD_INVALID_421 = ({"message": "Invalid password."}, 421)
ALREADY_EXIST = ({"status": 1, "message": "Already exists."}, 409)

DOES_NOT_EXIST = ({"message": "Does not exists."}, 409)
NOT_ADMIN = ({"message": "Admin permission denied."}, 998)
HEADER_NOT_FOUND = ({"message": "Header does not exists."}, 999)


@auth.error_handler
def unauthorized():
    return make_response(jsonify(
        {
            'authEndpoint': settings.FLASK_SERVER_NAME + '/api/v1/token/login',
            'reason': 'No token has been sent.'
        }
    ), 401)


class CustomFlaskErr(Exception):
    status_code = 400

    def __init__(self, status_code=None, return_code=None, action_status=None, playbook=None):
        super().__init__(self)
        self.return_code = return_code
        self.status_code = status_code
        self.action_status = action_status
        self.playbook = playbook

    def to_dict(self):
        rv = dict()
        if self.playbook is not None:
            rv['data'] = self.playbook
        else:
            print(self.playbook)
        rv['action_status'] = self.action_status
        # rv['message'] = error_list.get(self.return_code)
        rv['return_code'] = self.return_code
        rv['status_code'] = self.status_code
        print(rv)
        return rv


