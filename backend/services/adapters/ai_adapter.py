from pathlib import Path

from backend.ai.radar.extractor import RadarExtractor
from backend.ai.thermal.extractor import ThermalExtractor
from backend.ai.acoustic.extractor import AcousticExtractor


class AIAdapter:

    def __init__(self):

        self.radar = RadarExtractor()
        self.acoustic = AcousticExtractor()
        self.thermal = ThermalExtractor()

    def extract_radar(self, file_path: Path):
        return self.radar.extract(file_path)

    def extract_acoustic(self, file_path: Path):
        return self.acoustic.extract(file_path)

    def extract_thermal(self, file_path: Path):
        return self.thermal.extract(file_path)
    