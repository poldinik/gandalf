import logging.config

import os
from flask import Flask, Blueprint
from gandalf_app import settings
from gandalf_app.api.project.endpoints.projects import ns as project_namespace
from gandalf_app.api.user.endpoints.users import ns as user_namespace
from gandalf_app.api.tool.endpoints.tools import ns as tool_namespace
from gandalf_app.api.user.endpoints.tokens import ns as token_namespace
from gandalf_app.api.auth.endpoints.auth import ns as auth_namespace
from gandalf_app.api.restplus import api
from gandalf_app.database import db
from gandalf_app.database import reset_database
from gandalf_app.views.home import home_bp

app = Flask(__name__)
logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

blueprint = Blueprint('api', __name__, url_prefix='/api/v{}'.format(settings.API_VERSION))


def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP


def initialize_app(flask_app):
    configure_app(flask_app)
    api.init_app(blueprint)
    api.add_namespace(token_namespace)
    api.add_namespace(project_namespace)
    api.add_namespace(user_namespace)
    api.add_namespace(tool_namespace)
    # api.add_namespace(auth_namespace)
    flask_app.register_blueprint(blueprint)
    flask_app.register_blueprint(home_bp)
    db.init_app(flask_app)


def main():
    initialize_app(app)
    log.info('>>>>> Starting development server at http://{}/api/v{}/ <<<<<'.format(app.config['SERVER_NAME'], settings.API_VERSION))

    with app.app_context():
        # Extensions like Flask-SQLAlchemy now know what the "current" app
        # is while within this block. Therefore, you can now run........
        reset_database()
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()
