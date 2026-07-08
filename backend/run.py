from app import create_app
from app.extensions import db

app = create_app()

with app.app_context():
    from app.models.user import User
    from app.models.resume import Resume
    from app.models.resumeAnalysis import ResumeAnalysis
    db.create_all()

if __name__=='__main__':
    app.run(debug=True)