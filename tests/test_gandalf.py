import logging.config
import os
import json
import io

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)


def responseToJson(response):
    return json.loads(response.get_data())


# ogni test method deve iniziare con test_
def getAuth(client):
    register(client)
    loginResponse = login(client)
    login_json_response = json.loads(loginResponse.get_data())
    log.info(str(login_json_response))
    return login_json_response['access_token']


# metodi da richiamare per ogni test
def login(client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
    }
    data = {
        'username': "utente1",
        'password': "pass1",
        'email': "utente1@gmail.com"
    }

    loginUrl = '/api/v1/token/'

    loginResponse = client.post(loginUrl, data=json.dumps(data), headers=headers)
    login_json_response = json.loads(loginResponse.get_data())
    log.info(str(login_json_response))
    authToken = login_json_response['access_token']
    log.info("Setta token di accesso")
    log.info(authToken)
    return loginResponse


def register(client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
    }
    data = {
        'username': "utente1",
        'password': "pass1",
        'email': "utente1@gmail.com"
    }

    registerUrl = '/api/v1/token/register'

    registerResponse = client.post(registerUrl, data=json.dumps(data), headers=headers)
    register_json_response = json.loads(registerResponse.get_data())
    log.info(str(register_json_response))
    return registerResponse


# INTEGRATION TEST PER REGITRAZIONE E LOGIN
def test_register_login(client):
    log.info("Lancio test per login")
    registerResponse = register(client)
    loginResponse = login(client)
    assert registerResponse.status_code == 200 and loginResponse.status_code == 200


# ValueError: flask-restplus blueprints can only be registered once.
# questo perchè la configurazione della app tramite conftest inizializza la app più volte? Andrebe fatto una volta sola
# soluzione è mettere app app scoped in app.py e non chiamare ogni volta initialize sennò fa binding ogni volta del blueprint
# e blueprint può ovviamente essere attaccato una volta sola
def test_root_url(client):
    log.info("Lancio test per base route")
    authToken = getAuth(client)
    response = client.get('/')
    log.info("token è " + str(authToken))
    log.info(str(response))
    assert response.status_code == 200


# INTEGRATION TEST PER LISTA VUOTA PROGETTI
def test_get_empty_project_list(client):
    log.info("Lancio test per lista progetti vuota")
    authToken = getAuth(client)
    log.info(str(authToken))
    response = client.get('/api/v1/projects/', headers={'Authorization': authToken})
    log.info(str(responseToJson(response)))
    assert len(responseToJson(response)) == 0


# INTEGRATION TEST PER CREAZIONE NUOVO PROGETTO
def test_post_new_project(client):
    log.info("Lancio test per creazione nuovo progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    response = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    log.info(str(responseToJson(response)))
    assert response.status_code == 201


# INTEGRATION TEST PER LISTA PROGETTI NON VUOTA
def test_get_project_list(client):
    log.info("Lancio test per lista progetti")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    responseList = client.get('/api/v1/projects/', headers=headers)
    log.info(str(responseToJson(responseList)))
    assert len(responseToJson(responseList)) == 1 \
           and responseToJson(responseList)[0]['name'] == 'progettodiprova' \
           and responseToJson(responseList)[0]['location'] == 'localhost:8888/api/v1/projects/1' \
           and responseToJson(responseList)[0]['status'] == 'ProjectStatus.DRAFT'


# INTEGRATION TEST PER CARICAMENTO MEDIA FILE PER SPECIFICO PROGETTO, ROLE = PROBE
def test_upload_media_probe_for_project(client):
    log.info("Lancio test per caricare un media per uno specifico progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    projectId = responseToJson(createdResponse)['id']
    url = "/api/v1/projects/" + str(projectId) + "/media?name=prova.jpg&role=PROBE"
    data = dict(
        file=(io.BytesIO(b'contenuto del file'), "prova_media_file.jpg"),
    )
    response = client.post(url, data=data, content_type='multipart/form-data')
    log.info(responseToJson(response))
    assert response.status_code == 201


# INTEGRATION TEST PER CARICAMENTO MEDIA FILE PER SPECIFICO PROGETTO, ROLE = REFERENCE
def test_upload_media_reference_for_project(client):
    log.info("Lancio test per caricare un media per uno specifico progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    projectId = responseToJson(createdResponse)['id']
    url = "/api/v1/projects/" + str(projectId) + "/media?name=prova.jpg&role=PROBE"
    data = dict(
        file=(io.BytesIO(b'contenuto del file'), "prova_media_file.jpg"),
    )
    response = client.post(url, data=data, content_type='multipart/form-data')
    log.info(responseToJson(response))
    assert response.status_code == 201


# INTEGRATION TEST PER CARICAMENTO DATA FILE PER SPECIFICO PROGETTO
def test_upload_data_for_project(client):
    log.info("Lancio test per caricare un media per uno specifico progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    projectId = responseToJson(createdResponse)['id']
    url = "/api/v1/projects/" + str(projectId) + "/data?name=datoprova.json&dataType=json"
    data = dict(
        file=(io.BytesIO(b'contenuto del file'), "datotest.json"),
    )
    response = client.post(url, data=data, content_type='multipart/form-data')
    log.info(responseToJson(response))
    assert response.status_code == 201


# INTEGRATION TEST PER PROGETTO BY ID
def test_get_project_by_id(client):
    log.info("Lancio test per ottenere progetto by id")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    response = client.get('/api/v1/projects/' + str(responseToJson(createdResponse)['id']), headers=headers)
    log.info(str(responseToJson(response)))
    assert responseToJson(response)['name'] == 'progettodiprova' \
           and responseToJson(response)['location'] == 'localhost:8888/api/v1/projects/1' \
           and responseToJson(response)['status'] == 'ProjectStatus.DRAFT'


# INTEGRATION TEST PER ELIMINAZIONE PROGETTO
def test_delete_project_by_id(client):
    log.info("Lancio test per eliminazione progetto by id")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    response = client.delete('/api/v1/projects/' + str(responseToJson(createdResponse)['id']), headers=headers)
    assert response.status_code == 204


# INTEGRATION TEST PER ELIMINAZIONE MEDIA FILE PER SPECIFICO PROGETTO
def test_delete_media_reference_for_project(client):
    log.info("Lancio test per eliminazione di un media file per uno specifico progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    projectId = responseToJson(createdResponse)['id']
    url = "/api/v1/projects/" + str(projectId) + "/media?name=prova.jpg&role=PROBE"
    data = dict(
        file=(io.BytesIO(b'contenuto del file'), "prova_media_file.jpg"),
    )
    response = client.post(url, data=data, content_type='multipart/form-data')
    log.info(responseToJson(response))

    deleteResponse = client.delete('/api/v1/projects/' + str(responseToJson(createdResponse)['id']) + '/media/' + str(
        responseToJson(response)['id']), headers=headers)

    assert deleteResponse.status_code == 204


# INTEGRATION TEST PER ELIMINAZIONE DATA FILE PER SPECIFICO PROGETTO
def test_delete_data_for_project(client):
    log.info("Lancio test per eliminare un data file per uno specifico progetto")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    projectId = responseToJson(createdResponse)['id']
    url = "/api/v1/projects/" + str(projectId) + "/data?name=datoprova.json&dataType=json"
    data = dict(
        file=(io.BytesIO(b'contenuto del file'), "datotest.json"),
    )
    response = client.post(url, data=data, content_type='multipart/form-data')

    deleteResponse = client.delete('/api/v1/projects/' + str(responseToJson(createdResponse)['id']) + '/data/' + str(
        responseToJson(response)['id']), headers=headers)

    assert deleteResponse.status_code == 204


# INTEGRATION TEST PER START ANALYSIS
def test_start_analysis_project(client):
    # TODO: placeholder perchè tool non realmente esistenti al momento
    log.info("Lancio test per lancio analisi")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }
    data = {
        'name': "progettodiprova",
    }
    createdResponse = client.post('/api/v1/projects/', data=json.dumps(data), headers=headers)
    startResponse = client.post('/api/v1/projects/' + str(responseToJson(createdResponse)['id']) + '/start',
                                headers=headers)
    assert startResponse.status_code == 202


# INTEGRATION TEST PER CREAZIONE NUOVO TOOL
def test_post_new_tool(client):
    log.info("Lancio test per creazione nuovo tool")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }

    data = {
        'name': "tool1",
        'description': "descrizione di prova",
        'supportedDataTypes': ['IMAGE', 'VIDEO', 'AUDIO'],
        'supportedDataFormats': ['JPEG'],
        'references': [
            'Jeronymo, Daniel Cavalcanti, Yuri Cassio Campbell Borges, and Leandro dos Santos Coelho. Image forgery detection by semi-automatic wavelet soft-thresholding with error level analysis. Expert Systems with Applications 85 (2017): 348-356.',
            'Sudiatmika, Ida Bagus Kresna, and Fathur Rahman. Image forgery detection using error level analysis and deep learning. Telkomnika 17.2 (2019): 653-659.'
        ]
    }
    response = client.post('/api/v1/tools/', data=json.dumps(data), headers=headers)
    log.info(str(responseToJson(response)))
    assert response.status_code == 201


# INTEGRATION TEST PER LISTA TOOLS
def test_get_tools(client):
    log.info("Lancio test per lista tool disponibili")
    authToken = getAuth(client)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Authorization': authToken
    }

    data = {
        'name': "tool1",
        'description': "descrizione di prova",
        'supportedDataTypes': ['IMAGE', 'VIDEO', 'AUDIO'],
        'supportedDataFormats': ['JPEG'],
        'references': [
            'Jeronymo, Daniel Cavalcanti, Yuri Cassio Campbell Borges, and Leandro dos Santos Coelho. Image forgery detection by semi-automatic wavelet soft-thresholding with error level analysis. Expert Systems with Applications 85 (2017): 348-356.',
            'Sudiatmika, Ida Bagus Kresna, and Fathur Rahman. Image forgery detection using error level analysis and deep learning. Telkomnika 17.2 (2019): 653-659.'
        ]
    }
    response1 = client.post('/api/v1/tools/', data=json.dumps(data), headers=headers)
    log.info(str(responseToJson(response1)))

    data2 = {
        'name': "tool1",
        'description': "descrizione di prova",
        'supportedDataTypes': ['IMAGE', 'VIDEO', 'AUDIO'],
        'supportedDataFormats': ['JPEG'],
        'references': [
            'Jeronymo, Daniel Cavalcanti, Yuri Cassio Campbell Borges, and Leandro dos Santos Coelho. Image forgery detection by semi-automatic wavelet soft-thresholding with error level analysis. Expert Systems with Applications 85 (2017): 348-356.',
            'Sudiatmika, Ida Bagus Kresna, and Fathur Rahman. Image forgery detection using error level analysis and deep learning. Telkomnika 17.2 (2019): 653-659.'
        ]
    }
    response2 = client.post('/api/v1/tools/', data=json.dumps(data2), headers=headers)
    log.info(str(responseToJson(response2)))

    response = client.get('/api/v1/tools/', headers=headers)
    log.info(str(responseToJson(response)))
    assert response.status_code == 200 and len(responseToJson(response)) == 2
