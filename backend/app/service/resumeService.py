from app.models.resume import Resume
from app.extensions import db
from app.utils.file_utils import FileUtils
from app.utils.validators import Validators
from app.config import Config
import logging

logger = logging.getLogger(__name__)

class ResumeService:    
    @staticmethod
    def save_resume_to_db(user_id,file_path,filename,file,file_size):
        resume = Resume(user_id=user_id,original_name=file.filename,uploaded_name=filename,file_path=file_path,file_type=file.mimetype,file_size=file_size)
        db.session.add(resume)
        db.session.commit()
        return resume


    @staticmethod
    def upload_resume(user_id,file):
        # Validate the file
        logger.info(f"Validating resume for user_id: {user_id}, file: {file.filename}")
        validation_error = Validators.validate_resume(file)

        if validation_error:
            return validation_error
    
        # Generate a unique filename for the uploaded file
        filename = FileUtils.generate_file_name(file)

        # before saving
        # file.seek(0, os.SEEK_END)
        # file_size = file.tell()
        # file.seek(0)  # Reset the file pointer to the beginning of the file

        # Save the file to the uploads folder
        file_path = None  # Initialize file_path to None
        try:
            file_path = FileUtils.save_file(file, filename)

            # file size suitable after saving the file
            file_size = FileUtils.get_fileSize(file_path)
            max_length= Config.MAX_FILE_SIZE  # 5MB in bytes
            if file_size > max_length: # 5MB in bytes
                FileUtils.delete_file(file_path)  # Delete the file if it exceeds the size limit
                return {"message": "File size exceeds the limit of 5MB"}, 400
            
            resume = ResumeService.save_resume_to_db(user_id, file_path, filename, file, file_size)
            logger.info(f"Resume uploaded successfully for user_id: {user_id}, resume_id: {resume.id}")
            return {"message": "File uploaded successfully","id": resume.id}, 201
        except Exception:
            db.session.rollback()
            FileUtils.delete_file(file_path)  # Attempt to delete the file if saving fails
            logger.exception(f"Error saving resume to database")
            raise 