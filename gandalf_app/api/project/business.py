from gandalf_app.database.models import Project
from gandalf_app.api.project.dao import save
from gandalf_app import settings


def post_project(data):
    name = data.get('name')
    project = Project(name)
    return save(project)


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
