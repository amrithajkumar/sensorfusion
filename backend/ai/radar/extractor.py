from pathlib import Path

import numpy as np

from feature_extraction.radar_features import RadarFeatureExtractor


class RadarExtractor:

    def __init__(self):
        self.extractor = RadarFeatureExtractor()

    def extract(self, file_path: Path):

        radar_matrix = np.load(file_path)

        features = self.extractor.extract_features(radar_matrix)

        return features