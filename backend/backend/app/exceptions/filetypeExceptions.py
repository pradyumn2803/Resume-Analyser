class UnsupportedFileTypeError(Exception):
    """Exception raised for unsupported file types."""
    def __init__(self, message="Unsupported file type."):
        self.message = message
        super().__init__(self.message)

class TextExtractionError(Exception):
    """Exception raised for errors during text extraction."""
    def __init__(self, message="Error occurred during text extraction."):
        self.message = message
        super().__init__(self.message)