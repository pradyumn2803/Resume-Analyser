import os
import fitz
from docx import Document
from app.exceptions.filetypeExceptions import TextExtractionError, UnsupportedFileTypeError

class TextExtractionService:

    @staticmethod   
    def extract_text(file_path):
        _, extension = os.path.splitext(file_path)
        extension = extension.lower()

        if extension == '.pdf':
            return TextExtractionService._extract_pdf(file_path)
        elif extension == '.docx':
            return TextExtractionService._extract_docx(file_path)
        else:
            raise UnsupportedFileTypeError(f"Unsupported file type: {extension}")


    @staticmethod
    def _extract_pdf(file_path):
        doc = None
        try:
            doc = fitz.open(file_path)

            pages = [page.get_text() for page in doc if page.get_text().strip()]
            if not pages:
                raise TextExtractionError("No text found in the PDF document.")
            
            return "\n\n".join(pages)
        except Exception as e:
            raise TextExtractionError(f"Failed to extract text from PDF") from e
        finally:
            if doc:
                doc.close()

    @staticmethod
    def _extract_docx(file_path):
        try:
            doc= Document(file_path)
            paragraphs = [para.text for para in doc.paragraphs if para.text.strip()]
            if not paragraphs:
                raise TextExtractionError("No text found in the DOCX document.")
            return "\n\n".join(paragraphs)
        except Exception as e:
            raise TextExtractionError(f"Failed to extract text from DOCX {file_path}") from e