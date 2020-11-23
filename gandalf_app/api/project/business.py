from gandalf_app.database.models import Project
from gandalf_app.api.project.dao import save, get_all, get_by_id
from gandalf_app import settings


def post_project(data):
    name = data.get('name')
    project = Project(name)
    return save(project)


def get_projects():
    return get_all()


def get_project(projecId):
    return get_by_id(projecId)


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
