from app.extensions import db
from datetime import datetime
from app.constants.constants import AnalysisStatus

class ResumeAnalysis(db.Model):

    __tablename__="resume_analysis"

    id = db.Column(db.Integer,primary_key=True)
    resume_id = db.Column(db.Integer,db.ForeignKey("resume_metadata.id",ondelete="CASCADE"),nullable=False,unique=True,index=True)
    extracted_text = db.Column(db.Text,nullable=True)
    cleaned_text = db.Column(db.Text,nullable=True)
    ats_score = db.Column(db.Integer,nullable=True)
    suggestions = db.Column(db.JSON,nullable=True)
    llm_response = db.Column(db.JSON,nullable=True)
    analysis_status = db.Column(db.String(50),nullable=False,default=AnalysisStatus.PENDING)
    analyzed_at = db.Column(db.DateTime,nullable=True)
    error_message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)
    updated_at = db.Column(db.DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
    resume = db.relationship('Resume', back_populates='analysis')


