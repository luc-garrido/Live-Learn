from abc import ABC, abstractmethod

class Security(ABC):

    @abstractmethod
    def create_access_token(self, data: dict):
        pass

    @abstractmethod
    def create_refresh_token(self, data: dict):
        pass

    @abstractmethod
    def decode_token(self, token: str):
        pass
