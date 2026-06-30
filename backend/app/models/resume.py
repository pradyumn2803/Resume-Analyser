from importlib.resources import path

from app import db
from datetime import datetime   

class Resume(db.Model):
    __tablename__ = "resume_metadata"

    id = db.Column(db.Integer, primary_key= True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete='CASCADE'), nullable=False)
    original_name = db.Column(db.String(255), nullable=False)
    uploaded_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    file_size = db.Column(db.Integer, nullable=False)
    file_type = db.Column(db.String(50), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self,user_id,original_name,uploaded_name,file_path,file_type,file_size):
        self.user_id = user_id
        self.original_name = original_name
        self.uploaded_name = uploaded_name
        self.file_path = file_path
        self.file_type = file_type
        self.file_size = file_size