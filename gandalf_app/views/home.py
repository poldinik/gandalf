from flask import Blueprint, render_template
from flask import current_app as app

# Blueprint Configuration
home_bp = Blueprint(
    'home_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@home_bp.route('/', methods=['GET'])
def home():
    """Homepage."""
    return render_template('index.html')

@home_bp.route('/sse', methods=['GET'])
def home_sse():
    """Homepage per prova sse"""
    return render_template('sse.html')



