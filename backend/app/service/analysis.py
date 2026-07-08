from app.repository.analysisRepo import AnalysisRepository
from app.repository.resumeRepo import ResumeRepo
from app.service.textExtractionService import TextExtractionService
from datetime import datetime
from app.constants.constants import AnalysisStatus
import logging

Logger = logging.getLogger(__name__)

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
        Logger.info(f"started analysis for resume{resume.id}")
       
        analysis = AnalysisRepository.create_pending_analysis(resume.id)
        Logger.info(f"created analysis for resume{analysis.id}")
        
        analysis.analysis_status=AnalysisStatus.PROCESSING
        analysis=AnalysisRepository.update(analysis)

        try:
            Logger.info(f"started Text extraction for resume{resume.id}")
            text = TextExtractionService.extract_text(resume.file_path)
            analysis.extracted_text = text
            analysis.analyzed_at = datetime.utcnow()
            analysis.analysis_status = AnalysisStatus.COMPLETED

            analysis=AnalysisRepository.update(analysis)
            Logger.info(f"Analysis done for resume{resume.id}")
        
            return {
                "message": "Analysis completed successfully",
                "analysis_id": analysis.id
            }, 200
        
        except Exception as e:
            analysis.analysis_status = AnalysisStatus.FAILED
            analysis.analyzed_at = datetime.utcnow()
            analysis.error_message = f"Failed to analyse the file {e}"
            analysis=AnalysisRepository.update(analysis)
            Logger.exception(f"Analysis failed for resume{resume.id}")
            raise 
        