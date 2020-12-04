import logging.config
import os
import json

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)
authToken = ''

# ogni test method deve iniziare con test_

# metodi da richiamare per ogni test
def login():
    pass

def register():
    pass

def test_register_login(client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
    }
    data = {
        'username': "utente1",
        'password': "pass1",
        'email': "utente1@gmail.com"
    }

    registerUrl = '/api/v1/auth/register'
    loginUrl = '/api/v1/auth/login'

    registerResponse = client.post(registerUrl, data=json.dumps(data), headers=headers)
    register_json_response = json.loads(registerResponse.get_data())
    log.info(str(register_json_response))

    loginResponse = client.post(loginUrl, data=json.dumps(data), headers=headers)
    login_json_response = json.loads(loginResponse.get_data())
    log.info(str(login_json_response))
    authToken = login_json_response['access_token']
    log.info("Setta token di accesso")
    log.info(authToken)

    assert registerResponse.status_code == 200 and loginResponse.status_code == 200


# ValueError: flask-restplus blueprints can only be registered once.
# questo perchè la configurazione della app tramite conftest inizializza la app più volte? Andrebe fatto una volta sola
# soluzione è mettere app app scoped in app.py e non chiamare ogni volta initialize sennà fa binding ogni volta del blueprint
def test_example(client):
    response = client.get('/')
    log.info("token è " + str(authToken))
    log.info(str(response))
    assert response.status_code == 200
