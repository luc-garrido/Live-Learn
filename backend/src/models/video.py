from pydantic import BaseModel
from typing import Optional

class Video(BaseModel):
    id: Optional[int] = None
    url: str
    title: Optional[str] = None
    module_id: int
