import os

# Flask settings
FLASK_SERVER_NAME = 'localhost:8888'  # https://lesc.dinfo.unifi.it/gandalf
FLASK_DEBUG = True  # In produzione non usare!!!!! Sennò performance più basse (per hot reloading e altro)
HTTP_PROTOCOL = 'http'  # usare http o https per la definizione del protocollo per gli endpoint
# Flask-Restplus settings
RESTPLUS_SWAGGER_UI_DOC_EXPANSION = 'list'
RESTPLUS_VALIDATE = True
RESTPLUS_MASK_SWAGGER = False
RESTPLUS_ERROR_404_HELP = False

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# DIRECTORY per Multimedia caricati
# MULTIMEDIA_DIRECTORY = '/Users/loretto/Desktop/'
MULTIMEDIA_DIRECTORY = os.path.dirname(os.path.realpath(__file__))

# API version
API_VERSION = 1
