from pathlib import Path

from services.adapters.ai_adapter import AIAdapter


class FeatureService:

    SUPPORTED_SENSORS = {
        "thermal",
        "acoustic",
        "radar"
    }

    def __init__(self):

        self.adapter = AIAdapter()

    def extract_features(
        self,
        sensor_type: str,
        file_path: Path
    ):

        sensor_type = sensor_type.lower()

        if sensor_type not in self.SUPPORTED_SENSORS:
            raise ValueError(
                f"Invalid sensor type: {sensor_type}"
            )

        if sensor_type == "thermal":

            return {
                "sensor": sensor_type,
                "features": self.adapter.extract_thermal(file_path)
            }

        if sensor_type == "acoustic":

            return {
                "sensor": sensor_type,
                "features": self.adapter.extract_acoustic(file_path)
            }

        return {
            "sensor": sensor_type,
            "features": self.adapter.extract_radar(file_path)
        }