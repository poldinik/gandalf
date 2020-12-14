from gandalf_app.database import db
from gandalf_app import settings
from gandalf_app.database.models import Project


def save(project):
    db.session.add(project)
    db.session.commit()
    project.location = '{}/api/v{}/projects/{}'.format(settings.FLASK_SERVER_NAME, settings.API_VERSION, project.id)
    db.session.commit()
    return project


def get_all():
    return Project.query.all()


def get_by_id(projectId):
    return Project.query.filter_by(id=projectId).first()
