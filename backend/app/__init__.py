from flask import Blueprint,Flask
from app.extensions import db
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    from app.routes.health import health_bp
    app.register_blueprint(health_bp)

    from app.routes.version import version_bp
    app.register_blueprint(version_bp)

    from app.routes.register import register_bp
    app.register_blueprint(register_bp)

    return app