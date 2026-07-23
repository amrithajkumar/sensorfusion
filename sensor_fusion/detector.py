"""
=====================================================
Multi-Sensor Detector

Connects:
- Acoustic Model
- Thermal Features
- Radar Features
- Sensor Fusion

=====================================================
"""

import numpy as np

from models.acoustic_model import AcousticModel
from sensor_fusion.fusion import SensorFusion


class MultiSensorDetector:

    def __init__(self):

        self.acoustic_model = AcousticModel()
        self.acoustic_model.load_model()

        self.fusion = SensorFusion()

    # --------------------------------------------------

    def detect(
        self,
        acoustic_features,
        thermal_features,
        radar_features,
    ):

        acoustic_probability = self.acoustic_model.predict_proba(
            acoustic_features
        )

        result = self.fusion.fuse(
            acoustic_probability,
            thermal_features,
            radar_features,
        )

        return result