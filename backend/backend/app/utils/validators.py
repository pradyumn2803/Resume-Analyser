from app.utils.file_utils import FileUtils

class Validators:
    ALLOWED_MIME_TYPES = {'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
    ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx'}

    @staticmethod
    def validate_resume(file):
        if not file:
            return {"message": "No file provided"}, 400
        
        # to check if the file is empty
        if not file.filename.strip():
            return {"message": "No file selected"}, 400
        
        extension = FileUtils.get_extension(file)
        if extension not in Validators.ALLOWED_EXTENSIONS:
            return {"message": "Invalid file type. Only PDF, DOC, and DOCX files are allowed"}, 400

        # check if the file type is in the list of valid types
        if file.mimetype not in Validators.ALLOWED_MIME_TYPES:
            return {"message": "Invalid file type. Only PDF, DOC, and DOCX files are allowed"}, 400
        
        return None  # No errors