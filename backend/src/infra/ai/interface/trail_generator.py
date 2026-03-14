from abc import ABC, abstractmethod
from typing import Dict

class TrailGeneratorInterface(ABC):
    @abstractmethod
    def generate_trail(self, theme: str) -> Dict:
        pass

    @abstractmethod
    def generate_contents(self, course_theme: str, module_title: str) -> Dict:
        pass

    @abstractmethod
    def find_videos(self, course_theme: str, module_title: str) -> Dict:
        pass

    @abstractmethod
    def generate_questions_answers(self, course_theme: str, module_title: str) -> Dict:
        pass
