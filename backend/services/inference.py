from pathlib import Path

from logs.logger import logger
from services.feature_service import FeatureService


class InferenceService:

    def __init__(self):
        self.feature_service = FeatureService()

    def predict(self, sensor_type: str, file_path: Path):

        logger.info(
            f"Running inference using {sensor_type}"
        )

        feature_result = self.feature_service.extract_features(
            sensor_type,
            file_path
        )

        prediction = {
            "prediction": "Drone",
            "confidence": 0.94,
            "detected": True,
            "sensor": sensor_type,
            "features": feature_result["features"]
        }

        logger.info(
            f"Prediction={prediction['prediction']} | "
            f"Confidence={prediction['confidence']}"
        )

        return prediction