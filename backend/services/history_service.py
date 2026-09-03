import json
from datetime import datetime
from pathlib import Path

from backend.config import settings
from backend.logs.logger import logger


class HistoryService:

    def __init__(self):

        self.history_file = settings.HISTORY_FILE

        self.history_file.parent.mkdir(
            parents=True,
            exist_ok=True
        )

        if not self.history_file.exists():
            self.history_file.write_text("[]")

    def load_predictions(self):

        with open(self.history_file, "r") as file:
            return json.load(file)

    def save_prediction(
        self,
        filename,
        sensor,
        prediction,
        confidence
    ):

        history = self.load_predictions()

        history.append(
            {
                "timestamp": datetime.now().isoformat(),
                "filename": filename,
                "sensor": sensor,
                "prediction": prediction,
                "confidence": confidence
            }
        )

        with open(self.history_file, "w") as file:
            json.dump(
                history,
                file,
                indent=4
            )

        logger.info(
            f"Prediction saved for {filename}"
        )

    def clear_history(self):

        with open(self.history_file, "w") as file:
            json.dump([], file)

        logger.info("Prediction history cleared")