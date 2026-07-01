import os
from dotenv import load_dotenv 
from datetime import timedelta

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 15)))
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 5242880))  # Default to 5MB if not set
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')  # Default to 'uploads' if not set