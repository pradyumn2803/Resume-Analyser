class LLMError(Exception):
    """Raised when the prompt template cannot be loaded."""
    pass

class JSONDecodeError(Exception):
    """Raised when the gemini return invalid JSON"""
    pass