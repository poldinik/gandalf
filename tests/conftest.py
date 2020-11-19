import os
import tempfile

import pytest

from gandalf_app import app as GandalfApp

from gandalf_app import database as GandalfDB


@pytest.fixture
def client():
    db_fd, GandalfApp.app.config['DATABASE'] = tempfile.mkstemp()
    GandalfApp.app.config['TESTING'] = True

    with GandalfApp.app.test_client() as client:
        with GandalfApp.app.app_context():
            GandalfDB.db.init_db()
        yield client

    os.close(db_fd)
    os.unlink(GandalfApp.app.config['DATABASE'])

