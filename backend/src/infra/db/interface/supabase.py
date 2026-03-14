from abc import ABC, abstractmethod
from typing import List, Optional
from src.models.user import User
from src.models.track import Track
from src.models.module import Module
from src.models.video import Video
from src.models.content import Content
from src.models.activity import Activity

class SupabaseInterface(ABC):
    @abstractmethod
    def insert_user(self, user: User) -> List[dict]:
        pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    def insert_track(self, track: Track) -> List[dict]:
        pass

    @abstractmethod
    def insert_module(self, module: Module) -> List[dict]:
        pass

    @abstractmethod
    def insert_video(self, video: Video) -> List[dict]:
        pass

    @abstractmethod
    def insert_content(self, content: Content) -> List[dict]:
        pass

    @abstractmethod
    def insert_activity(self, activity: Activity) -> List[dict]:
        pass

    @abstractmethod
    def mark_activity_answered(self, activity_id: int) -> List[dict]:
        pass
