from gandalf_app.database import db
from gandalf_app import settings


def save(project):
    db.session.add(project)
    db.session.commit()
    project.location = '{}/api/v{}/projects/{}'.format(settings.FLASK_SERVER_NAME, settings.API_VERSION, project.id)
    db.session.commit()
    return project
