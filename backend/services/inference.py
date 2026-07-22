import os

class InferenceService:

    def predict(self, sensor_type: str, filename: str):

        return {
            "prediction": "Drone",
            "confidence": 0.94,
            "detected": True
        }

    def health(self):

        return {
            "status": "healthy"
        }