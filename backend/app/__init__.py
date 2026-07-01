from datetime import timedelta

from flask import Flask
from app.extensions import db, jwt
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))
    jwt.init_app(app)

    from app.routes.health import health_bp
    app.register_blueprint(health_bp)

    from app.routes.version import version_bp
    app.register_blueprint(version_bp)

    from app.routes.register import register_bp
    app.register_blueprint(register_bp)

    from app.routes.login import login_bp
    app.register_blueprint(login_bp) 

    from app.routes.profile import profile_bp
    app.register_blueprint(profile_bp)

    from app.routes.resume import resume_bp
    app.register_blueprint(resume_bp)

    return app