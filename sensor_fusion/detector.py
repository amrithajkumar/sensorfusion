"""
=====================================================
Multi-Sensor Detector

Runs inference on:

- Radar
- Thermal
- Acoustic

Returns final fused prediction.

Author : Quantum Fusion Team
=====================================================
"""

from models.acoustic_model import AcousticModel
from models.radar_model import RadarModel

from backend.ai.thermal.inference import ThermalInference

from sensor_fusion.fusion import SensorFusion
from backend.logs.logger import logger


class MultiSensorDetector:

    def __init__(self):

        logger.info("Initializing Multi-Sensor Detector...")

        # -------------------------------
        # Load Models
        # -------------------------------

        self.radar_model = RadarModel()
        self.radar_model.load_model()

        self.acoustic_model = AcousticModel()
        self.acoustic_model.load_model()

        self.thermal_model = ThermalInference()

        self.fusion = SensorFusion()

        logger.info("Detector Ready.")

    # ==================================================

    def radar_probability(self, radar_features):

        return float(
            self.radar_model.predict_proba(
                radar_features
            )
        )

    # ==================================================

    def acoustic_probability(self, acoustic_features):

        return float(
            self.acoustic_model.predict_proba(
                acoustic_features
            )
        )

    # ==================================================

    def thermal_probability(self, thermal_features):

        return float(
            self.thermal_model.drone_probability(
                thermal_features
            )
        )

    # ==================================================

    def detect(

        self,

        radar_features,

        thermal_features,

        acoustic_features,

        weights=None,

    ):

        radar_probability = self.radar_probability(
            radar_features
        )

        thermal_probability = self.thermal_probability(
            thermal_features
        )

        acoustic_probability = self.acoustic_probability(
            acoustic_features
        )

        result = self.fusion.fuse(

            radar_probability=radar_probability,

            thermal_probability=thermal_probability,

            acoustic_probability=acoustic_probability,

            weights=weights,

        )

        return result