import logging.config

from flask import request
from flask_restplus import Resource
from tool_example_app.api.restplus import api
from tool_example_app.settings import MULTIMEDIA_DIRECTORY
from flask import jsonify
import os
from werkzeug.utils import secure_filename
from tool_example_app.auth.jwt_auth import auth
from flask_restplus import reqparse
import jpegio as jio
# import _thread
import threading
import time
import traceback
import requests
import pickle
import uuid

logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../../../logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

ns = api.namespace('jpegio', description='Jpeg IO tool')

IMAGE = MULTIMEDIA_DIRECTORY.replace("gandalf_app", "tool_example_app") + '/arborgreens01.jpg'


@ns.route('/')
class JpegIOResource(Resource):

    @ns.response(500, 'Backend is not responding.')
    def post(self):
        """
        Lancia elaborazione del tool jpegio
        """

        parser = reqparse.RequestParser()
        parser.add_argument('uuid')
        parser.add_argument('projectId')
        parser.add_argument('analysis_uuid')
        args = parser.parse_args()
        result_uuid = args['uuid']
        analysis_uuid = args['analysis_uuid']
        projectId = args['projectId']

        def run_tool():
            log.info("Running thread per elaborazione tool")
            print(IMAGE)
            jpeg = jio.read(IMAGE)
            coef_array = jpeg.coef_arrays[0]
            quant_tbl = jpeg.quant_tables[0]

            result = []
            result.append(coef_array)
            result.append(quant_tbl)
            # salva risultati in opportuna directory
            result_path = MULTIMEDIA_DIRECTORY + '/' + result_uuid

            with open(result_path + '/' + 'result-' + str(analysis_uuid) + '.pkl', 'wb') as output:
                pickle.dump(result, output, pickle.HIGHEST_PROTOCOL)

            # TODO: rimuovere sleep, serve solo per fare test asincroni e ritardare l'output
            time.sleep(2)
            print('Invio ping di completamento analisi')
            gandalf_endpoint = 'http://localhost:8888/api/v1/projects/' + str(projectId) + '/ping?analysis_uuid=' + str(
                analysis_uuid)
            requests.post(gandalf_endpoint)
            print('Elaborazione finita!')

        try:
            t = threading.Thread(target=run_tool)
            t.daemon = True  # set thread to daemon ('ok' won't be printed in this case)
            t.start()
        except:
            print('Error: unable to start thread')
            traceback.print_exc()

        # fine thread asincrono
        return {}, 200
