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
    PROMPT_FOLDER = os.getenv('PROMPT_FOLDER','prompt')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    GEMINI_MODEL = os.getenv("GEMINI_MODEL","gemini-2.5-flash-lite")
    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = os.getenv("REDIS_PORT")
    REDIS_DB = os.getenv("REDIS_DB")