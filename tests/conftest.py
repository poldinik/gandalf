import os
import tempfile
import pytest
from gandalf_app.app import app as GandalfApp
from gandalf_app import database as GandalfDB
from gandalf_app.database import reset_database
import pathlib
import gandalf_app.settings as settings


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


