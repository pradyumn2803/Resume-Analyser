from flask import jsonify
from app.models.user import User
from app.extensions import db
from werkzeug.security import generate_password_hash

class RegisterService:

    @staticmethod
    def register_user(name, email, password):
    #if user already exists, return error message
        if not name or not email or not password:
            return {"message": "Name, email, and password are required"}, 400
        
        email=email.strip().lower()
        password=password.strip()

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"message": "User with this email already exists"}, 409

        try:
            hashed_password = generate_password_hash(password)
            new_user = User(name=name, email=email, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()


            return {
                "message": "User registered successfully",
                "id": new_user.id,
            },201
        except Exception as e:
            db.session.rollback()
            return {"message": "An error occurred while registering the user"}, 500