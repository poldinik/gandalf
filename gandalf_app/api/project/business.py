from gandalf_app.database.models import Project, UploadedMediaFile, UploadedDataFile, Analysis, ResultDetails
from gandalf_app.api.project.dao import save, get_all, get_by_id, saveMediaFile, saveDataFile, deleteProject, \
    get_media_by_id, removeMediaFromProject, get_data_by_id, removeDataFromProject, get_tool_by_id, saveAnalysis, \
    get_analysis_by_uuid
# from gandalf_app import settings
from gandalf_app.settings import MULTIMEDIA_DIRECTORY
import hashlib
import os
import uuid
import requests
import pickle


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


def startAnalysis(projectId, toolId, result_uuid, result_path, tools):
    project = get_by_id(projectId)
    tool = get_tool_by_id(toolId)

    tool_endpoint = tool.endpoint
    tool_method = tool.method

    if tool_method == 'POST':
        requests.post(tool_endpoint + '/?uuid=' + str(result_uuid) + '&projectId=' + str(projectId))
    else:
        requests.get(tool_endpoint + '/?uuid=' + str(result_uuid) + '&projectId=' + str(projectId))

    # crea un'analisi su db
    analysis = Analysis()
    analysis.uuid = result_uuid
    analysis.tools = tools
    saveAnalysis(analysis)

    # aggiunge l'analisi nella lista delle analisi per il progetto
    project.analysis.append(analysis)
    save(project)
    return result_uuid


def update_analysis(analysisUuid):
    # cerca l'analisi e aggiorna il numero di elaborazioni completate
    # se corrispponde poi al numero di tool per quell'analisi, l'analisi diventa completed
    analysis = get_analysis_by_uuid(analysisUuid)
    completed_tools = analysis.completed_tools
    completed_tools = completed_tools + 1

    if completed_tools == analysis.tools:
        analysis.status = 'COMPLETED'
        analysis.completed_tools = completed_tools
        project_id = analysis.project_id

    saveAnalysis(analysis)


def get_project_with_analysis_with_uuid(analysisUuid):
    # cerca il progetto che possiede un'analisi con un determinato uuid
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

    #resultDetails.data = dataList[0]

    #id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # location = db.Column(db.String())
    # probes = db.Column(db.PickleType())
    # toolId = db.Column(db.Integer())
    # name = db.Column(db.String())
    # resultType = db.Column(db.Enum(ResultType))
    # project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    # dataType = db.Column(db.String, db.ForeignKey('project.id'))
    return {
        'id': resultId,
        'location': '',
        'probes': [],
        'toolId': 1,
        'resultType': 'MULTI',
        'dataType': 'matrix',
        'data': dataList
    }
