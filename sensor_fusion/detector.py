"""
=====================================================
Multi-Sensor Detector

Supports:
- Radar only
- Thermal only
- Acoustic only

If the Thermal model is unavailable,
the detector automatically falls back
to Radar + Acoustic.

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

        self.radar_model = RadarModel()
        self.radar_model.load_model()

        self.acoustic_model = AcousticModel()
        self.acoustic_model.load_model()

        # --------------------------------------------
        # Thermal Model (Optional)
        # --------------------------------------------

        try:
            self.thermal_model = ThermalInference()

            # Force model loading here so we know immediately
            self.thermal_model.load_model()

            self.thermal_available = True

            logger.info("Thermal model loaded successfully.")

        except Exception as e:

            logger.warning(
                f"Thermal model unavailable. "
                f"Continuing without Thermal Sensor.\n{e}"
            )

            self.thermal_model = None
            self.thermal_available = False

        # --------------------------------------------

        self.fusion = SensorFusion()

        logger.info("Detector Ready.")

    # ==================================================

    def radar_probability(self, radar_features):

        if radar_features is None:
            return 0.0

        try:

            return float(
                self.radar_model.predict_proba(
                    radar_features
                )
            )

        except Exception as e:

            logger.warning(f"Radar prediction failed: {e}")

            return 0.0

    # ==================================================

    def acoustic_probability(self, acoustic_features):

        if acoustic_features is None:
            return 0.0

        try:

            return float(
                self.acoustic_model.predict_proba(
                    acoustic_features
                )
            )

        except Exception as e:

            logger.warning(f"Acoustic prediction failed: {e}")

            return 0.0

    # ==================================================

    def thermal_probability(self, thermal_features):

        if thermal_features is None:
            return 0.0

        if not self.thermal_available:
            return 0.0

        try:

            return float(
                self.thermal_model.drone_probability(
                    thermal_features
                )
            )

        except Exception as e:

            logger.warning(
                f"Thermal prediction skipped: {e}"
            )

            return 0.0

    # ==================================================

    def detect(

        self,

        radar_features=None,

        thermal_features=None,

        acoustic_features=None,

        weights=None,

    ):

        logger.info("Running detector...")

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