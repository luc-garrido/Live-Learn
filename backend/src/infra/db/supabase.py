from typing import List, Optional

from supabase import create_client
from src.config.config import settings
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.user import User
from src.models.track import Track
from src.models.module import Module
from src.models.video import Video
from src.models.content import Content
from src.models.activity import Activity

class Supabase(SupabaseInterface):
    def __init__(self):
        self.client = create_client(settings.database.url, settings.database.key)

    def _clean_data(self, data: dict) -> dict:
        return {k: v for k, v in data.items() if v is not None}

    def insert_user(self, user: User):
        data = user.model_dump(mode="json")
        response = self.client.table('users').insert(data).execute()
        return response.data

    def get_user_by_email(self, email: str):
        response = self.client.table('users').select('*').eq('email', email).execute()
        if response.data:
            return User(**response.data[0])
        return None

    def get_user_by_id(self, user_id: str):
        response = self.client.table('users').select('*').eq('id', user_id).execute()
        if response.data:
            return User(**response.data[0])
        return None

    def authenticate_user(self, email: str, password: str):
        try:
            response = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            user_data = response.user
            if user_data:
                return self.get_user_by_email(email)
            return None
        except Exception:
            return None

    def insert_track(self, track: Track):
        data = self._clean_data(track.model_dump(mode="json"))
        response = self.client.table('tracks').insert(data).execute()
        return response.data

    def insert_module(self, module: Module):
        data = self._clean_data(module.model_dump(mode="json"))
        response = self.client.table('modules').insert(data).execute()
        return response.data

    def insert_video(self, video: Video):
        data = self._clean_data(video.model_dump(mode="json"))
        response = self.client.table('videos').insert(data).execute()
        return response.data

    def insert_content(self, content: Content):
        data = self._clean_data(content.model_dump(mode="json"))
        response = self.client.table('contents').insert(data).execute()
        return response.data

    def insert_activity(self, activity: Activity):
        data = self._clean_data(activity.model_dump(mode="json"))
        response = self.client.table('activities').insert(data).execute()
        return response.data

    def get_tracks_by_user_id(self, user_id: str) -> List[Track]:
        response = self.client.table('tracks').select('*').eq('user_id', user_id).execute()
        return [Track(**item) for item in response.data]

    def get_track_by_id(self, track_id: int) -> Optional[Track]:
        response = self.client.table('tracks').select('*').eq('id', track_id).execute()
        if response.data:
            return Track(**response.data[0])
        return None

    def get_modules_by_track_id(self, track_id: int) -> List[Module]:
        response = self.client.table('modules').select('*').eq('track_id', track_id).execute()
        return [Module(**item) for item in response.data]

    def get_module_by_id(self, module_id: int) -> Optional[Module]:
        response = self.client.table('modules').select('*').eq('id', module_id).execute()
        if response.data:
            return Module(**response.data[0])
        return None

    def get_videos_by_module_id(self, module_id: int) -> List[Video]:
        response = self.client.table('videos').select('*').eq('module_id', module_id).execute()
        return [Video(**item) for item in response.data]

    def get_contents_by_module_id(self, module_id: int) -> List[Content]:
        response = self.client.table('contents').select('*').eq('module_id', module_id).execute()
        return [Content(**item) for item in response.data]

    def get_activities_by_module_id(self, module_id: int) -> List[Activity]:
        response = self.client.table('activities').select('*').eq('module_id', module_id).execute()
        return [Activity(**item) for item in response.data]

    def get_activity_by_id(self, activity_id: int) -> Optional[Activity]:
        response = self.client.table('activities').select('*').eq('id', activity_id).execute()
        if response.data:
            return Activity(**response.data[0])
        return None

    def mark_activity_answered(self, activity_id: int) -> List[dict]:
        response = self.client.table('activities').update({'answered': True}).eq('id', activity_id).execute()
        return response.data
