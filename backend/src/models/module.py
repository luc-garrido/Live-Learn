from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class Module(BaseModel):
    id: Optional[int] = None
    name: str
    track_id: int
    user_id: UUID
    order_index: Optional[int] = None
