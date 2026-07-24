from pathlib import Path

from backend.services.adapters.ai_adapter import AIAdapter


class FeatureService:

    def __init__(self):
        self.adapter = AIAdapter()

    def extract_radar(self, file_path: Path):

        return self.adapter.extract_radar(file_path)

    def extract_thermal(self, file_path: Path):

        return self.adapter.extract_thermal(file_path)

    def extract_acoustic(self, file_path: Path):

        return self.adapter.extract_acoustic(file_path)