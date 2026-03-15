from pydantic import BaseModel

class RespondActivityResponse(BaseModel):
    is_correct: bool
    explanation: str