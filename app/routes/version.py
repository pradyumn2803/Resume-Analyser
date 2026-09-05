from flask import Blueprint, jsonify

version_bp = Blueprint('version',__name__)

@version_bp.get('/version')
def version():
    return jsonify({'version':'1.0.0'}),200