from gandalf_app.database import db
from gandalf_app import settings
from gandalf_app.database.models import Tool


def save(tool):
    db.session.add(tool)
    db.session.commit()
    return tool


def get_all():
    return Tool.query.all()


def get_by_id(toolId):
    return Tool.query.filter_by(id=toolId).first()


def delete(toolId):
    Tool.query.filter_by(id=toolId).delete()
    db.session.commit()
