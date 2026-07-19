from app.extensions import db
from app.models.resumeAnalysis import ResumeAnalysis
from app.constants.constants import AnalysisStatus
class AnalysisRepository:
    @staticmethod
    def create_analysis(resume_id):
        analysis= ResumeAnalysis(resume_id=resume_id,analysis_status=AnalysisStatus.PROCESSING)
        return AnalysisRepository.create(analysis)

    @staticmethod
    def create(analysis):
        db.session.add(analysis)
        db.session.commit()
        return analysis

    @staticmethod
    def update(analysis):
        db.session.commit()
        return analysis

    @staticmethod
    def delete(analysis):
        db.session.delete(analysis)
        db.session.commit()

    @staticmethod
    def fetch(resume_id):
        return ResumeAnalysis.query.filter_by(
            resume_id=resume_id
        ).first()
    
    @staticmethod
    def fetch_analysis(resume_id):
        return (
            ResumeAnalysis.query.filter_by(resume_id=resume_id).first()
        )
    
    @staticmethod
    def fetch_resume(resume_id,user_id):
        return ResumeAnalysis.query.filter_by(
            resume_id=resume_id,
            user_id=user_id
        ).first()
    
    @staticmethod
    def rollback():
        db.session.rollback()