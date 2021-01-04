import logging.config

import os
from flask import Flask, Blueprint
from tool_example_app import settings
from tool_example_app.api.jpegio.endpoints.jpegio import ns as project_namespace
from tool_example_app.api.restplus import api
from tool_example_app.database import db
from tool_example_app.database import reset_database
from flask import make_response, jsonify
from tool_example_app.errors import CustomFlaskErr
from flask_cors import CORS

app = Flask(__name__)
logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

blueprint = Blueprint('api', __name__, url_prefix='/api/v{}'.format(settings.API_VERSION))
cors = CORS(app, resources={r"*": {"origins": "*"}})


@blueprint.app_errorhandler(CustomFlaskErr)
def handle_flask_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    print(response)
    return response


def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP
    flask_app.config['MULTIMEDIA_DIRECTORY'] = settings.MULTIMEDIA_DIRECTORY


configure_app(app)
api.init_app(blueprint)
api.add_namespace(project_namespace)

app.register_blueprint(blueprint)

db.init_app(app)
with app.app_context():
    reset_database()


def main():
    log.info('>>>>> Starting development server at http://{}/api/v{}/ <<<<<'.format(app.config['SERVER_NAME'],
                                                                                    settings.API_VERSION))
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()
