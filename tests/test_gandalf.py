import logging.config
import os

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)


def test_example(client):
    """Start with a blank database."""
    rv = client.get('localhost:8888/api/v1/')
    log.info(str(rv))
    assert True
