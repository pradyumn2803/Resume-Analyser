import re

class TextCleaningService:

    @staticmethod
    def clean_text(text):
        text = TextCleaningService._normalize_newlines(text)
        text = TextCleaningService._replace_tabs(text)
        text = TextCleaningService._remove_extra_spaces(text)
        text = TextCleaningService._remove_extra_blank_lines(text)
        text = TextCleaningService._remove_non_printable_characters(text)

        return text.strip()

    @staticmethod
    def _normalize_newlines(text):
        text = text.replace("\r\n","\n")
        text = text.replace("\r","\n")
        return text

    @staticmethod
    def _remove_extra_spaces(text):
        return re.sub(r" +"," ",text)
    
    @staticmethod
    def _replace_tabs(text):
        return re.sub(r"\t+"," ",text)


    @staticmethod
    def _remove_non_printable_characters(text):
        return re.sub(r"[^\x20-\x7E\n]","",text)

    @staticmethod
    def _remove_extra_blank_lines(text):
        return re.sub(r"\n{3,}","\n\n",text)

