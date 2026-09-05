from flask import Blueprint, jsonify, request
from app.service.loginUser import LoginService
login_bp = Blueprint('login',__name__, url_prefix='/auth')

@login_bp.post('/login')
def login():
    response = request.get_json()
    email = response.get('email')
    password = response.get('password')

    data, status_code = LoginService.login_user(email, password)
    return jsonify(data), status_code