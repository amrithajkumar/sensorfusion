from pathlib import Path

from backend.logs.logger import logger
from backend.services.feature_service import FeatureService

from sensor_fusion.detector import MultiSensorDetector


class InferenceService:

    def __init__(self):

        self.feature_service = FeatureService()

        self.detector = MultiSensorDetector()

    def predict(
        self,
        radar_file: Path,
        thermal_file: Path,
        acoustic_file: Path,
    ):

        try:

            logger.info("Starting Multi-Sensor Inference")

            # ---------------------------------------
            # Feature Extraction
            # ---------------------------------------

            radar_features = self.feature_service.extract_radar(
                radar_file
            )

            thermal_features = self.feature_service.extract_thermal(
                thermal_file
            )

            acoustic_features = self.feature_service.extract_acoustic(
                acoustic_file
            )

            logger.info("Feature extraction completed")

            # ---------------------------------------
            # Detection
            # ---------------------------------------

            prediction = self.detector.detect(
                radar_features,
                thermal_features,
                acoustic_features,
            )

            logger.info(
                f"Prediction={prediction['prediction']} | "
                f"Confidence={prediction['confidence']}"
            )

            return prediction

        except Exception as e:

            logger.exception(
                "Multi-Sensor Inference failed"
            )

            raise e