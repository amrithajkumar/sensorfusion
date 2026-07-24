"""
=====================================================
Multi-Sensor Detector

Main inference pipeline.

Responsible for:

Radar
Thermal
Acoustic
Fusion
Quantum Interface

Author : Quantum Fusion Team
=====================================================
"""

import numpy as np

from models.acoustic_model import AcousticModel
from models.radar_model import RadarModel
from models.thermal_model import ThermalModel

from sensor_fusion.fusion import SensorFusion


class MultiSensorDetector:

    def __init__(self):

        print("Initializing Multi-Sensor Detector...")

        # -------------------------------
        # Load Models
        # -------------------------------

        self.radar_model = RadarModel()
        self.radar_model.load_model()

        self.acoustic_model = AcousticModel()
        self.acoustic_model.load_model()

        self.thermal_model = ThermalModel()

        self.fusion = SensorFusion()

        print("Detector Ready.")

    # ==================================================
    # Radar
    # ==================================================

    def radar_probability(
        self,
        radar_features
    ):

        return self.radar_model.predict_proba(
            radar_features
        )

    # ==================================================
    # Acoustic
    # ==================================================

    def acoustic_probability(
        self,
        acoustic_features
    ):

        return self.acoustic_model.predict_proba(
            acoustic_features
        )

    # ==================================================
    # Thermal
    # ==================================================

    def thermal_features(
        self,
        thermal_features
    ):

        return thermal_features

    # ==================================================
    # Detection Pipeline
    # ==================================================

    def detect(

        self,

        radar_features,

        thermal_features,

        acoustic_features,

    ):

        radar_probability = self.radar_probability(
            radar_features
        )

        acoustic_probability = self.acoustic_probability(
            acoustic_features
        )

        thermal_vector = self.thermal_features(
            thermal_features
        )

        result = self.fusion.fuse(

        radar_probability,

        acoustic_probability,

        thermal_vector

    )

        return result