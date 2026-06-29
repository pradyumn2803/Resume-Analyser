from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
profile_bp=Blueprint('profile', __name__, url_prefix='/users')

@profile_bp.get('/me')
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user_info=User.query.get(user_id)

    if not user_info:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({"message": "Profile fetched successfully", 
                    "user":{
                        "user_id": user_id, "email":user_info.email,"name":user_info.name}
                    }
                  ), 200