from app.repository.analysisRepo import AnalysisRepository
from app.repository.resumeRepo import ResumeRepo
from app.service.textExtractionService import TextExtractionService
from app.service.textCleaningService import TextCleaningService
from app.service.prompt_builder import PromptBuilder
from app.service.gemini_service import GeminiService
from datetime import datetime
from app.constants.constants import AnalysisStatus
import logging

logger = logging.getLogger(__name__)

class AnalysisService:

    @staticmethod
    def analyze_resume(resume_id,user_id):
        resume = ResumeRepo.fetch_resume(resume_id)

        if not resume:
            return{
                "message": "Resume not Found"
            }, 404
        
        if(resume.user_id!=user_id):
            return{
                "message": "Unauthorized"
            }, 403

        
        analysis = AnalysisRepository.fetch(resume_id)

        if analysis:
            return {
                "message": "Analysis already present"
            }, 409
        logger.info(f"started analysis for resume{resume.id}")
       
        analysis = AnalysisRepository.create_pending_analysis(resume.id)
        logger.info(f"created analysis for resume{analysis.id}")
        
        analysis.analysis_status=AnalysisStatus.PROCESSING
        analysis=AnalysisRepository.update(analysis)

        try:
            logger.info(f"started Text extraction for resume{resume.id}")
            text = TextExtractionService.extract_text(resume.file_path)
            analysis.extracted_text = text

            cleaned_text = TextCleaningService.clean_text(text)
            analysis.cleaned_text = cleaned_text


            analysis=AnalysisRepository.update(analysis)

            prompt = PromptBuilder.build_resume_analysis_prompt(cleaned_text)
            response= GeminiService.generate(prompt)

            analysis.ats_score = response["ats_score"]
            analysis.suggestions = response["suggestions"]
            analysis.llm_response = response

            analysis.analyzed_at = datetime.utcnow()
            analysis.analysis_status = AnalysisStatus.COMPLETED

            analysis = AnalysisRepository.update(analysis)
            logger.info(f"Analysis done for resume{resume.id}")
        
            return {
                "message": "Analysis completed successfully",
                "analysis_id": analysis.id
            }, 200
        
        except Exception as e:
            analysis.analysis_status = AnalysisStatus.FAILED
            analysis.analyzed_at = datetime.utcnow()
            analysis.error_message = f"Failed to analyse the file {e}"
            analysis=AnalysisRepository.update(analysis)
            logger.exception(f"Analysis failed for resume{resume.id}")
            raise 
        