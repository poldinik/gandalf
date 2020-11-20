from gandalf_app.database import db
from gandalf_app.database.models import Project


def create_project(data):
    name = data.get('name')
    project = Project(name)
    db.session.add(project)
    db.session.commit()

