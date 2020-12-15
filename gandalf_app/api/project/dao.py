from gandalf_app.database import db
from gandalf_app import settings
from gandalf_app.database.models import Project, UploadedMediaFile


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


def get_by_id(projectId):
    return Project.query.filter_by(id=projectId).first()


def get_media_by_id(mediaId):
    return UploadedMediaFile.query.filter_by(id=mediaId).first()


def removeMediaFromProject(project, media):
    role = media.role

    if role == 'PROBE':
        project.probes.remove(media)
    else:
        project.references.remove(media)
    db.session.commit()
