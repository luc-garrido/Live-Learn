from pydantic import BaseModel
from typing import Optional

class Content(BaseModel):
    id: Optional[int] = None
    path: str
    title: Optional[str] = None
    module_id: int
