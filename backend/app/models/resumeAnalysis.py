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

    def __init__(self,resume_id,extracted_text,cleaned_text,ats_score,suggestions,llm_response,analysis_status=AnalysisStatus.PENDING,analyzed_at=None,error_message=None):
        self.resume_id = resume_id
        self.extracted_text = extracted_text
        self.cleaned_text = cleaned_text
        self.ats_score = ats_score
        self.suggestions = suggestions
        self.llm_response = llm_response
        self.analysis_status = analysis_status
        self.analyzed_at = analyzed_at
        self.error_message=error_message

