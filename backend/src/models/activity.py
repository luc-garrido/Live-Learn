from pydantic import BaseModel
from typing import Optional

class Activity(BaseModel):
    id: Optional[int] = None
    question: str
    module_id: int
    answered: bool = False
    answers: Optional[dict] = None
