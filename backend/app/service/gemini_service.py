from app.config import Config
import google.generativeai as genai
import logging
from app.exceptions.llmExceptions import LLMError

logger = logging.getLogger(__name__)

genai.configure(
    api_key=Config.GEMINI_API_KEY
)

model = genai.GenerativeModel(
    Config.GEMINI_MODEL
)

class GeminiService:

    @staticmethod
    def generate(prompt):
        response = GeminiService._call_model(prompt)
        response = GeminiService._clean_response(response)
        response = GeminiService._parse_json(response)

        GeminiService._validate_response(response)
        return response


    @staticmethod
    def _call_model(prompt):
        logger.info("Calling Gemini Model..")
        try:
            response = model.generate_content(
                prompt
            )

            logger.info("Received Response from Gemini")
            return response.text
        
        except Exception as e:
            logger.exception("Gemini api call failed")
            raise LLMError(
                f"Failed to call gemini Service {e}"
            )

    @staticmethod
    def _clean_response(response):
        pass

    @staticmethod
    def _parse_json(response):
        pass

    @staticmethod
    def _validate_response(response):
        pass