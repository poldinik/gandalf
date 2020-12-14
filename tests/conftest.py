import os
import tempfile
import pytest
from gandalf_app.app import app as GandalfApp
# from gandalf_app.app import initialize_app
from gandalf_app import database as GandalfDB
from gandalf_app.database import reset_database
import pathlib
import gandalf_app.settings as settings

# @pytest.fixture
# def client():
#     # db_fd, GandalfApp.app.config['DATABASE'] = tempfile.mkstemp()
#     app = GandalfApp.app
#     app.config['TESTING'] = True
#     client = app.test_client()
#     # with app.test_client() as client:
#         # with GandalfApp.app.app_context():
#         #     GandalfDB.db.init_db()
#     return client

# os.close(db_fd)
# os.unlink(GandalfApp.app.config['DATABASE'])

# app = GandalfApp
# initialize_app(app)
# app.config['TESTING'] = True
# # resetta db per i test
# with app.app_context():
#     reset_database()
#
#

@pytest.fixture
def app():
    settings.MULTIMEDIA_DIRECTORY = str(pathlib.Path(__file__).parent.absolute())
    print("TEST MEDIA DIR: " + str(pathlib.Path(__file__).parent.absolute()))
    app = GandalfApp
    # initialize_app(app)
    app.config['TESTING'] = True
    # resetta db per i test
    with app.app_context():
        reset_database()
    return app

# link utile per esempio testing
# https://nikgrozev.com/2018/10/12/python-api-with-flask-and-flask-restplus/

# tramite pytest-flask si crea automaticamente un cliente (teoricamente)
