from flask import Flask
from app.extensions import db, jwt
from app.config import Config
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(
        app,
        origins = [app.config.get("FRONTEND_URL")]
    )

    from app.logging_config import logging
    logging.basicConfig(level=logging.INFO)

    from app.error_handlers import register_error_handlers
    register_error_handlers(app)   

    db.init_app(app)
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