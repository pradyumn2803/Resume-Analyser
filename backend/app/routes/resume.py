from flask import Blueprint, jsonify, render_template, request
from flask_jwt_extended import jwt_required,get_jwt_identity
from app.service.resumeService import ResumeService

resume_bp = Blueprint('resume',__name__, url_prefix='/resume')


@resume_bp.post('/upload')
@jwt_required()
def upload_resume():
    user_id = int(get_jwt_identity()) # to get the user id currently logged in
    file = request.files.get('resume')
    
    response,status = ResumeService.upload_resume(user_id, file)

    return jsonify(response), status

    