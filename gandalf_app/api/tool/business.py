from gandalf_app.database import db
from gandalf_app.database.models import Tool
from gandalf_app.api.tool.dao import save, get_all, get_by_id, delete


def post_tool(data):
    name = data.get('name')
    description = data.get('description')
    supportedDataTypes = data.get('supportedDataTypes')
    supportedDataFormats = data.get('supportedDataFormats')
    references = data.get('references')
    tool = Tool(name, description)
    tool.endpoint = data.get('endpoint')
    tool.method = data.get('method')
    tool.supportedDataTypes = supportedDataTypes
    tool.supportedDataFormats = supportedDataFormats
    tool.references = references
    return save(tool)


def get_tool(toolId):
    return get_by_id(toolId)


def get_tools():
    return get_all()


def delete_tool(toolId):
    delete(toolId)
