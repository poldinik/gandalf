import logging.config

from flask import request
from flask_restplus import Resource
from tool_example_app.api.jpegio.serializers import project, project_created_response, project_recepit_response, \
    media_receipt_response, project_details_response
from tool_example_app.api.restplus import api
from tool_example_app.api.jpegio.business import post_project, get_project, get_projects, add_data_to_project, \
    add_media_to_project, delete_project, deleteMediaForProject, deleteDataForProject, startAnalysis
from tool_example_app.settings import MULTIMEDIA_DIRECTORY
from flask import jsonify
import os
from werkzeug.utils import secure_filename
from tool_example_app.auth.jwt_auth import auth
from flask_restplus import reqparse
import jpegio as jio

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

ns = api.namespace('jpegio', description='Jpeg IO tool')


@ns.route('/')
class JpegIOResource(Resource):

    @api.marshal_with(project_created_response)
    @ns.response(500, 'Backend is not responding.')
    def get(self):
        """
        Obtain the list of available projects.
        """
        projects = get_projects()
        print("progetti recuperati: " + str(len(list(projects))))
        return projects, 200

    @api.expect(project)
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(project_recepit_response)
    def post(self):
        """
        Create a new project.
        """
        jpeg = jio.read("image.jpg")
        coef_array = jpeg.coef_arrays[0]
        quant_tbl = jpeg.quant_tables[0]

        # Modifying jpeg.coef_arrays...
        # Modifying jpeg.quant_tables...

        jio.write(jpeg, "image_modified.jpg")
        return created, 201
