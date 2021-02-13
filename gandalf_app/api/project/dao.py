from gandalf_app.database import db
from gandalf_app import settings
from gandalf_app.database.models import Project, UploadedMediaFile, UploadedDataFile, Tool, Analysis, Elaboration, ResultSummary


def save(project):
    db.session.add(project)
    db.session.commit()
    project.location = '{}/api/v{}/projects/{}'.format(settings.FLASK_SERVER_NAME, settings.API_VERSION, project.id)
    db.session.commit()
    return project


def saveMediaFile(mediaFile, projectId):
    db.session.add(mediaFile)
    db.session.commit()
    mediaFile.location = '{}/api/v{}/projects/{}/media/{}'.format(settings.FLASK_SERVER_NAME, settings.API_VERSION,
                                                                  projectId, mediaFile.id)
    db.session.commit()
    return mediaFile


def saveDataFile(dataFile, projectId):
    db.session.add(dataFile)
    db.session.commit()
    dataFile.location = '{}/api/v{}/projects/{}/data/{}'.format(settings.FLASK_SERVER_NAME, settings.API_VERSION,
                                                                projectId, dataFile.id)
    db.session.commit()
    return dataFile


def deleteProject(projectId):
    Project.query.filter_by(id=projectId).delete()
    db.session.commit()


def get_all():
    return Project.query.all()


def get_project_by_id(projectId):
    return Project.query.filter_by(id=projectId).first()


def get_result_by_id(resultId):
    return ResultSummary.query.filter_by(id=resultId).first()


def get_tool_by_id(toolId):
    return Tool.query.filter_by(id=toolId).first()


def get_media_by_id(mediaId):
    return UploadedMediaFile.query.filter_by(id=mediaId).first()


def get_data_by_id(dataId):
    return UploadedDataFile.query.filter_by(id=dataId).first()


def removeMediaFromProject(project, media):
    role = media.role

    if role == 'PROBE':
        project.probes.remove(media)
    else:
        project.references.remove(media)
    db.session.commit()


def removeDataFromProject(project, data):
    project.additionalData.remove(data)
    db.session.commit()


def saveAnalysis(analysis):
    db.session.add(analysis)
    db.session.commit()
    return analysis


def saveResultSummary(resultSummary):
    db.session.add(resultSummary)
    db.session.commit()
    return resultSummary


def saveElaboration(elaboration):
    db.session.add(elaboration)
    db.session.commit()
    return elaboration


def get_analysis_by_uuid(uuid):
    return Analysis.query.filter_by(uuid=uuid).first()


def get_elaboration_by_uuid(uuid):
    return Elaboration.query.filter_by(uuid=uuid).first()
