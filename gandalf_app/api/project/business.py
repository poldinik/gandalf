from gandalf_app.database.models import Project, Media, UploadedMediaFile, UploadedDataFile
from gandalf_app.api.project.dao import save, get_all, get_by_id, saveMediaFile, saveDataFile, deleteProject, \
    get_media_by_id, removeMediaFromProject, get_data_by_id, removeDataFromProject
# from gandalf_app import settings
from gandalf_app.settings import MULTIMEDIA_DIRECTORY
import hashlib
import os
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


def get_project(projecId):
    return get_by_id(projecId)


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


def startAnalysis(projectId):
    analysisUuid = getUuid()
    return analysisUuid
