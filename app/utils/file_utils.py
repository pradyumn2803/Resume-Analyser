import os
import uuid
from app.config import Config

class FileUtils:
    @staticmethod
    def get_fileSize(file_path):
        """Get the size of a file in bytes."""

        return os.path.getsize(file_path)


    @staticmethod
    def delete_file(file_path):
        """Delete a file from the filesystem."""
        if not file_path:
            return
        if os.path.exists(file_path):
            os.remove(file_path)
        

    # to return the extension of the file
    @staticmethod
    def get_extension(file):
        # extension = file.filename.split('.')[-1].lower() or
        return os.path.splitext(file.filename)[1].lower()


    @staticmethod
    def generate_file_name(file):
        extension = FileUtils.get_extension(file)
        return f"{str(uuid.uuid4())}{extension}"

    @staticmethod
    def save_file(file,filename):
        upload_folder = Config.UPLOAD_FOLDER
        os.makedirs(upload_folder, exist_ok=True)  # Create the folder if it doesn't exist
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        return file_path     