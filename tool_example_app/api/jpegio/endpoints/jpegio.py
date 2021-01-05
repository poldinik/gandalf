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
import thread

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

ns = api.namespace('jpegio', description='Jpeg IO tool')


@ns.route('/')
class JpegIOResource(Resource):

    @api.expect(project)
    @ns.response(500, 'Backend is not responding.')
    @api.marshal_with(project_recepit_response)
    def post(self):
        """
        Lancia elaborazione del tool jpegio
        """

        parser = reqparse.RequestParser()
        parser.add_argument('uuid')
        parser.add_argument('projectId')
        args = parser.parse_args()
        analysisUuid = args['uuid']
        projectId = args['projectId']

        def tool_elaboration(threadName):
            log.info("Running " + str(threadName))
            jpeg = jio.read("image.jpg")
            coef_array = jpeg.coef_arrays[0]
            quant_tbl = jpeg.quant_tables[0]

            # Modifying jpeg.coef_arrays...
            # Modifying jpeg.quant_tables...

            jio.write(jpeg, "image_modified.jpg")
            # TODO: salva risultati in opportuna directory
            gandalf_endpoint = 'http://localhost:8888/projects/' + str(projectId) + '/ping?uuid=' + str(analysisUuid)
            requests.get(gandalf_endpoint)

        try:
            thread.start_new_thread(tool_elaboration, "jpegio-tool-elaboration-thread")
        except:
            print('Error: unable to start thread')

        # fine thread asincrono
        return {}, 200
