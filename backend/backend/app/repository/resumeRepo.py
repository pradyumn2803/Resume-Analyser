from app.models.resume import Resume
from app.extensions import db

class ResumeRepo:
    @staticmethod
    def fetch_all_resume(user_id):
        return Resume.query.filter_by(user_id=user_id).all()
    
    @staticmethod
    def fetch_resume(resume_id):
        return Resume.query.filter_by(
            id = resume_id
        ).first()
    
    @staticmethod
    def delete_resume(resume):
        db.session.delete(resume)
        db.session.commit()
        
    @staticmethod
    def rollback():
        db.session.rollback()