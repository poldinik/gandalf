from tool_example_app.database.models import Project, Media, UploadedMediaFile, UploadedDataFile
from tool_example_app.api.project.dao import save, get_all, get_by_id, saveMediaFile, saveDataFile, deleteProject, \
    get_media_by_id, removeMediaFromProject, get_data_by_id, removeDataFromProject
#from gandalf_app import settings


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
    pass