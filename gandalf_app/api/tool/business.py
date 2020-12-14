from gandalf_app.database import db
from gandalf_app.database.models import Tool


def post_tool(data):
    name = data.get('name')
    tool = Tool(name)
    db.session.add(tool)
    db.session.commit()


def get_tools():
    pass


def delete_tool():
    pass

