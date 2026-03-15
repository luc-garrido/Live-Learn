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
    def get_user_by_id(self, user_id: str) -> Optional[User]:
        pass

    @abstractmethod
    def insert_track(self, track: Track) -> List[dict]:
        pass

    @abstractmethod
    def get_tracks_by_user_id(self, user_id: str) -> List[Track]:
        pass

    @abstractmethod
    def get_track_by_id(self, track_id: int) -> Optional[Track]:
        pass

    @abstractmethod
    def insert_module(self, module: Module) -> List[dict]:
        pass

    @abstractmethod
    def get_modules_by_track_id(self, track_id: int) -> List[Module]:
        pass

    @abstractmethod
    def get_module_by_id(self, module_id: int) -> Optional[Module]:
        pass

    @abstractmethod
    def insert_video(self, video: Video) -> List[dict]:
        pass

    @abstractmethod
    def get_videos_by_module_id(self, module_id: int) -> List[Video]:
        pass

    @abstractmethod
    def insert_content(self, content: Content) -> List[dict]:
        pass

    @abstractmethod
    def get_contents_by_module_id(self, module_id: int) -> List[Content]:
        pass

    @abstractmethod
    def insert_activity(self, activity: Activity) -> List[dict]:
        pass

    @abstractmethod
    def get_activities_by_module_id(self, module_id: int) -> List[Activity]:
        pass

    @abstractmethod
    def get_activity_by_id(self, activity_id: int) -> Optional[Activity]:
        pass

    @abstractmethod
    def mark_activity_answered(self, activity_id: int) -> List[dict]:
        pass
