import os
import tempfile
import pytest
from gandalf_app.app import app as GandalfApp
from gandalf_app.app import initialize_app
from gandalf_app import database as GandalfDB


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

@pytest.fixture
def app():
    app = GandalfApp
    initialize_app(app)
    app.config['TESTING'] = True
    return app

# tramite pytest-flask si crea automaticamente un cliente (teoricamente)