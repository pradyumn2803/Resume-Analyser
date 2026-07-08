from app.models.resume import Resume

class ResumeRepo:
    @staticmethod
    def fetch_all_resume(user_id):
        return Resume.query.filter_by(user_id=user_id).all()
    
    @staticmethod
    def fetch_resume(resume_id):
        return Resume.query.filter_by(
            id = resume_id
        ).first()