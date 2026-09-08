from app.config import Config
import os
import logging
from app.exceptions.promptExceptions import PromptTemplateError

logger = logging.getLogger(__name__)
class PromptBuilder:

    @staticmethod
    def build_resume_analysis_prompt(cleaned_text):
        prompt_path = os.path.join(Config.PROMPT_FOLDER,"resume_analysis_prompt.txt")
        logger.info("Building resume analysis prompt")
        try:
            with open(prompt_path,'r',encoding="utf-8") as file:
                prompt=file.read()
            

            if "{{resume_text}}" not in prompt:
                raise PromptTemplateError(
                    "Missing {{resume_text}} placeholder in template"
                )

            prompt=prompt.replace(
                "{{resume_text}}",
                cleaned_text
            )

            logger.info("Prompt building done successfully")
            return prompt
        except FileNotFoundError:
            raise PromptTemplateError(
                f"Prompt template not found: {prompt_path}"
            )