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
        """Remove keys with None values to avoid inserting null PKs/IDs."""
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

    def mark_activity_answered(self, activity_id: int):
        response = self.client.table('activities').update({'answered': True}).eq('id', activity_id).execute()
        return response.data
