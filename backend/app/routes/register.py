from flask import Blueprint, jsonify, request
from app.service.registerUser import RegisterService
register_bp = Blueprint('register',__name__,url_prefix='/auth')

@register_bp.post('/register')
def register():
    response = request.get_json()
    name = response.get('name')
    email = response.get('email')
    password = response.get('password')

    data,status_code = RegisterService.register_user(name, email, password)

    return jsonify(data), status_code
