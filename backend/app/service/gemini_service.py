from app.config import Config
import google.generativeai as genai
import logging
from app.exceptions.llmExceptions import LLMError, JSONDecodeError
import re
import json

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
        response = re.sub(
            r"^```(?:json)?\s*",
            "",
            response
        )

        response = re.sub(
            r"\s*```$",
            "",
            response
        )

        return response.strip()

    @staticmethod
    def _parse_json(response):
        logger.info("Parsing the response")
        try:
            response = json.loads(response)
            logger.info("Successfully parsed the response")
            return response
        except JSONDecodeError as e:
            logger.exception("Failed to parse resume")

            raise LLMError(
                f"Invalid json returned by Gemini {e}"
            )
    @staticmethod
    def _validate_response(response):
        required_fields = [
            "ats_score",
            "summary",
            "strengths",
            "weaknesses",
            "missing_skills",
            "suggestions"
        ]

        for field in required_fields:
            if field not in response:
                raise LLMError(
                    f"Missing required field {field}"
                )