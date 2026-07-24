from pathlib import Path

from feature_extraction.acoustic_features import AcousticFeatureExtractor


class AcousticExtractor:

    def __init__(self):
        self.extractor = AcousticFeatureExtractor()

    def extract(self, file_path: Path):

        return self.extractor.extract_features(file_path)