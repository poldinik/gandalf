import logging
import traceback

from flask_restplus import Api
from gandalf_app import settings
from sqlalchemy.orm.exc import NoResultFound

log = logging.getLogger(__name__)

api = Api(version='1.0',
          title='Gandalf',
          description='Multimedia analysis API',
          terms_url='https://lesc.dinfo.unifi.it/gandalf/terms',
          contact_url='https://lesc.dinfo.unifi.it/gandalf/support',
          license='Apache 2.0',
          license_url='https://www.apache.org/licenses/LICENSE-2.0.html',
          )


@api.errorhandler
def default_error_handler(e):
    message = 'An unhandled exception occurred.'
    log.exception(message)

    if not settings.FLASK_DEBUG:
        return {'message': message}, 500


@api.errorhandler(NoResultFound)
def database_not_found_error_handler(e):
    log.warning(traceback.format_exc())
    return {'message': 'A database result was required but none was found.'}, 404
