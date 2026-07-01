import uuid
import os
from app.models.resume import Resume
from app.extensions import db

class ResumeService:
    def delete_file(file_path):
        """Delete a file from the filesystem."""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")

    @staticmethod
    def upload_resume(user_id,file):
        if not file:
            return {"message": "No file provided"}, 400
        
        # to check if the file is empty
        if file.filename == '':
            return {"message": "No file selected"}, 400
        
        if not file.filename.lower().endswith('.pdf'):
            return {"message": "Invalid file type. Only PDF files are allowed"}, 400

        # check if the file type is PDF
        if file.mimetype != "application/pdf":
            return {"message": "Invalid file type. Only PDF files are allowed"}, 400
        
        # Generate a unique filename for the uploaded file
        # extention = file.filename.split('.')[-1].lower() or
        extention = os.path.splitext(file.filename)[1].lower()
        filename = f"{str(uuid.uuid4())}{extention}" 
        
        # before saving
        # file.seek(0, os.SEEK_END)
        # file_size = file.tell()
        # file.seek(0)  # Reset the file pointer to the beginning of the file

        # Save the file to the uploads folder
        upload_folder = os.getenv('UPLOAD_FOLDER', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)  # Create the folder if it doesn't exist
        file_path = os.path.join(upload_folder, filename)
        
        try:
            file.save(file_path)

            # file size suitable after saving the file
            file_size = os.path.getsize(file_path)
            max_length= int(os.getenv('MAX_CONTENT_LENGTH', 5242880))  # Default to 5MB if not set
            if file_size > max_length: # 5MB in bytes
                ResumeService.delete_file(file_path)  # Delete the file if it exceeds the size limit
                return {"message": "File size exceeds the limit of 5MB"}, 400
            
            resume = Resume(user_id=user_id,original_name=file.filename,uploaded_name=filename,file_path=file_path,file_type=file.mimetype,file_size=file_size)
            db.session.add(resume)
            db.session.commit()

            return {"message": "File uploaded successfully","id": resume.id}, 200
        
        except Exception as e:
            ResumeService.delete_file(file_path)  # Delete the file if an error occurs
            db.session.rollback()  # Rollback the session in case of an error
            # return {
            #     "message": "An error occurred while saving the file",
            # }, 500
            raise e
        



