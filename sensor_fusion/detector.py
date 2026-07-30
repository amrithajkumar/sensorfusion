"""
=====================================================
Multi-Sensor Detector

Supports:
- Radar only (feature extraction stage)
- Thermal only (feature extraction stage)
- Acoustic only (feature extraction stage)

Fusion requires at least two available sensors.
=====================================================
"""

from models.acoustic_model import AcousticModel
from models.radar_model import RadarModel
from models.thermal_model import ThermalModel

from sensor_fusion.fusion import SensorFusion
from backend.logs.logger import logger


class MultiSensorDetector:

    def __init__(self):

        logger.info("Initializing Multi-Sensor Detector...")

        self.radar_model = RadarModel()
        self.radar_model.load_model()

        self.acoustic_model = AcousticModel()
        self.acoustic_model.load_model()

        self.thermal_model = ThermalModel()

        self.fusion = SensorFusion()

        logger.info("Detector Ready.")

    # -------------------------------------------------

    def radar_probability(self, radar_features):

        if radar_features is None:
            return None

        return self.radar_model.predict_proba(
            radar_features
        )

    # -------------------------------------------------

    def acoustic_probability(self, acoustic_features):

        if acoustic_features is None:
            return None

        return self.acoustic_model.predict_proba(
            acoustic_features
        )

    # -------------------------------------------------

    def thermal_probability(self, thermal_features):

        if thermal_features is None:
            return None

        return thermal_features

    # -------------------------------------------------

    def detect(

        self,

        radar_features=None,

        thermal_features=None,

        acoustic_features=None,

    ):

        logger.info("Running detector...")

        radar_probability = self.radar_probability(
            radar_features
        )

        acoustic_probability = self.acoustic_probability(
            acoustic_features
        )

        thermal_vector = self.thermal_probability(
            thermal_features
        )

        prediction = self.fusion.fuse(

            radar_probability=radar_probability,

            acoustic_probability=acoustic_probability,

            thermal_features=thermal_vector,

        )

        return prediction