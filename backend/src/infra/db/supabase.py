from supabase import create_client, Client

from src.config.config import settings

def Supabase():

    def __init__(self):
        self.__connection = create_client(settings.database.url, settings.database.password)
