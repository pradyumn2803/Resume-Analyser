from app.models.user import User
from werkzeug.security import check_password_hash
class LoginService:

    @staticmethod
    def login_user(email,password):
        if not email or not password:
             return {"message": "Email and password are required", "status": "error"}, 400
        
        email = email.strip().lower()
        password = password.strip()
        
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password,password):
            return {"message": "Invalid user or password", "status": "error"}, 401
        
        return {
                "message": "Login successful", 
                "user": {
                        "id": user.id,
                        "name":user.name,
                        "email":user.email   
                        }
                }, 200
