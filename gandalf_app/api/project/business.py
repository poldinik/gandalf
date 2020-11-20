from gandalf_app.database import db
from gandalf_app.database.models import Project


def post_project(data):
    name = data.get('name')
    project = Project(name)
    db.session.add(project)
    db.session.commit()
    return project


def get_projects():
    pass


def get_project():
    pass


def delete_project():
    pass


def start_analysis():
    pass


def upload_media():
    pass


def upload_data():
    pass


def get_result():
    pass
