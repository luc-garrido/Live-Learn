from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class Track(BaseModel):
    id: Optional[int] = None
    name: str
    user_id: UUID
    conteudo: Optional[str] = None
