from flask import jsonify
import logging
from app.exceptions.filetypeExceptions import UnsupportedFileTypeError, TextExtractionError
logger = logging.getLogger(__name__)

def register_error_handlers(app):

    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.exception(f"unhandled exception: {e}")

        return jsonify(
            {
                "message":"Internal Server Error"
            }
        ), 500
    
    @app.errorhandler(UnsupportedFileTypeError)
    def unsupported_file_type_error(e):
        logger.warning(f"Unsupported file type: {e}")

        return jsonify(
            {
                "message": f"Unsupported file type: {e}"
            }
        ), 400
    
    @app.errorhandler(TextExtractionError)
    def text_extraction_error(e):
        logger.warning(f"Failed to extract text: {e}")

        return jsonify(
            {
                "message": f"Failed to extract text: {e}"
            }
        ), 400