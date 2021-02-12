from gandalf_app.database.models import Project, UploadedMediaFile, UploadedDataFile, Analysis, ResultDetails, \
    ResultSummary, Elaboration
from gandalf_app.api.project.dao import save, get_all, get_by_id, saveMediaFile, saveDataFile, deleteProject, \
    get_media_by_id, removeMediaFromProject, get_data_by_id, removeDataFromProject, get_tool_by_id, saveAnalysis, \
    get_analysis_by_uuid, saveResultSummary, saveElaboration, get_elaboration_by_uuid
# from gandalf_app import settings
from gandalf_app.settings import MULTIMEDIA_DIRECTORY
import hashlib
import os
import uuid
import requests
import pickle
from flask_restplus import fields, marshal
import json
from gandalf_app import settings
import uuid


def getUuid():
    return str(uuid.uuid4())


def getHash(filePath):
    BLOCK_SIZE = 65536
    file_hash = hashlib.sha256()
    with open(filePath, 'rb') as f:
        fb = f.read(BLOCK_SIZE)
        while len(fb) > 0:
            file_hash.update(fb)
            fb = f.read(BLOCK_SIZE)
    return str(file_hash.hexdigest())


def post_project(data):
    name = data.get('name')
    project = Project(name)
    return save(project)


def get_projects():
    return get_all()


def get_project(projectId):
    return get_by_id(projectId)


def add_media_to_project(projectId, filename, role):
    project = get_by_id(projectId)
    uploadedMediaFile = UploadedMediaFile(filename)
    uploadedMediaFile.fileName = filename
    uploadedMediaFile.role = role

    filePath = os.path.join(MULTIMEDIA_DIRECTORY, filename)
    uploadedMediaFile.hash = getHash(filePath)
    createdMediaFile = saveMediaFile(uploadedMediaFile, projectId)
    if role == 'PROBE':
        project.probes.append(createdMediaFile)
    else:
        project.references.append(createdMediaFile)
    save(project)
    return createdMediaFile


def add_data_to_project(projectId, filename, dataType):
    project = get_by_id(projectId)
    uploadedDataFile = UploadedDataFile(filename)
    uploadedDataFile.fileName = filename
    uploadedDataFile.dataType = dataType
    filePath = os.path.join(MULTIMEDIA_DIRECTORY, filename)

    uploadedDataFile.hash = getHash(filePath)

    createdDataFile = saveDataFile(uploadedDataFile, projectId)
    project.additionalData.append(createdDataFile)
    save(project)
    return createdDataFile


def delete_project(projectId):
    deleteProject(projectId)


def deleteMediaForProject(projectId, mediaId):
    project = get_by_id(projectId)
    media = get_media_by_id(mediaId)
    removeMediaFromProject(project, media)


def deleteDataForProject(projectId, dataId):
    project = get_by_id(projectId)
    data = get_data_by_id(dataId)
    removeDataFromProject(project, data)


def startAnalysis(projectId, toolId, result_uuid, result_path, tools, elaboration_uuid):
    project = get_by_id(projectId)
    tool = get_tool_by_id(toolId)

    tool_endpoint = tool.endpoint
    tool_method = tool.method

    analysis_uuid = str(uuid.uuid4())

    if tool_method == 'POST':
        requests.post(
            tool_endpoint + '/?uuid=' + str(result_uuid) + '&projectId=' + str(projectId) + '&analysis_uuid=' +
            analysis_uuid)
    else:
        requests.get(
            tool_endpoint + '/?uuid=' + str(result_uuid) + '&projectId=' + str(projectId) + '&analysis_uuid=' +
            analysis_uuid)

    # crea un'analisi su db
    # un'analisi è una elaborazione di un tool che sfrutta probes di un progetto
    # un risultato è un insieme di analisi
    analysis = Analysis()
    analysis.uuid = analysis_uuid
    analysis.result_uuid = result_uuid  # uuid del risultato di cui l'analisi fa parte
    analysis.tools = tools
    analysis.project_id = projectId
    analysis.elaboration_uuid = elaboration_uuid
    saveAnalysis(analysis)

    # aggiunge l'analisi nella lista delle analisi per il progetto
    project.analysis.append(analysis)
    save(project)
    return analysis_uuid


def create_result_scaffold(projectId, toolIds, result_uuid, result_path):
    elaboration = Elaboration()
    elaboration.number_of_tools = len(toolIds)
    elaboration_uuid = str(uuid.uuid4())
    elaboration.uuid = elaboration_uuid

    uuid_list = []
    for i in toolIds:
        toolId = int(i)
        analysis_uuid = startAnalysis(projectId, toolId, result_uuid, result_path, len(toolIds), elaboration_uuid)
        #print("É stata lanciata l'analisi " + analysis_uuid)
        uuid_list.append(analysis_uuid)
        elaboration.analysis_uuid_list.append(analysis_uuid)

    created = saveElaboration(elaboration)
    print("Elaborazione " + elaboration_uuid + " status: " + created.status)
    return uuid_list


def update_elaboration(analysisUuid):
    analysis = get_analysis_by_uuid(analysisUuid)
    print("Aggiornamento analisi " + analysisUuid + " appartenente ad elaborazione " + analysis.elaboration_uuid)
    elaboration = get_elaboration_by_uuid(analysis.elaboration_uuid)
    completed_tool_elaborations = elaboration.completed_tool_elaborations
    completed_tool_elaborations = completed_tool_elaborations + 1

    if completed_tool_elaborations == elaboration.number_of_tools:
        elaboration.status = 'COMPLETED'
        elaboration.completed_tool_elaborations = completed_tool_elaborations
        project_id = elaboration.project_id
        # resultSummary = ResultSummary(name='Risultati del progetto ' + str(project_id))

    saveAnalysis(analysis)
    updated = saveElaboration(elaboration)
    print("Elaborazione " + updated.uuid + " status: " + updated.status)


def get_project_with_analysis_with_uuid(analysisUuid):
    analysis = get_analysis_by_uuid(analysisUuid)
    return get_project(analysis.project_id)


def get_result(projectId, resultId):
    project = get_by_id(projectId)

    resultDetails = ResultDetails('risultatoTest')

    with open(
            '/Users/loretto/PycharmProjects/gandalf/gandalf_app/c486077a-532a-432c-a01d-1c252d75a289/1/result-2204a851-5f00-41ee-bf63-b09d67208d43.pkl',
            'rb') as input:
        data = pickle.load(input)

    if len(data) > 0:
        dataList = [d.tolist() for d in data]
    else:
        dataList = []

    # resultDetails.data = dataList[0]

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # location = db.Column(db.String())
    # probes = db.Column(db.PickleType())
    # toolId = db.Column(db.Integer())
    # name = db.Column(db.String())
    # resultType = db.Column(db.Enum(ResultType))
    # project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    # dataType = db.Column(db.String, db.ForeignKey('project.id'))
    # probes = pickle.load(project.probes)

    resource_fields = {'probes': fields.List(fields.String()), 'name': fields.String}

    des = json.loads(json.dumps(marshal(project, resource_fields)))

    if des['probes'] is None:
        probes = []
    else:
        probes = des['probes']

    # https://lesc.dinfo.unifi.it/gandalf/api/v1/projects/123/results/120
    location = settings.HTTP_PROTOCOL + '://' + settings.FLASK_SERVER_NAME + '/gandalf/api/v' + str(
        settings.API_VERSION) + '/projects' + str(
        projectId) + "/results/" + str(resultId)

    if des['name'] is None:
        name = "NON_DISPONIBILE"
    else:
        name = des['name']
    # ritornare i data potrebbe essere molto pesante, per esempio matrici che hanno molti valori
    return {
        'id': resultId,
        'location': location,
        'probes': probes,
        'toolId': 1,
        'name': name,
        'resultType': 'MULTI',
        'dataType': 'matrix',
        # 'data': dataList
    }
