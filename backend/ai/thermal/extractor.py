from pathlib import Path

from feature_extraction.thermal_features import ThermalFeatureExtractor


class ThermalExtractor:

    def __init__(self):
        self.extractor = ThermalFeatureExtractor()

    def extract(self, file_path: Path):

        return self.extractor.extract_features(file_path)