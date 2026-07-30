from pathlib import Path
from typing import List

from backend.evaluation.metrics import MetricsCalculator
from backend.logs.logger import logger


class ModelEvaluator:

    def __init__(self, inference_service):

        self.inference_service = inference_service

    def evaluate(self, dataset):

        """
        dataset should be a list of dictionaries:

        [
            {
                "radar": "...",
                "thermal": "...",
                "acoustic": "...",
                "label": 1
            },
            ...
        ]
        """

        y_true = []

        y_pred = []

        y_scores = []

        logger.info("Starting Evaluation")

        for sample in dataset:

            result = self.inference_service.predict(

                Path(sample["radar"]),

                Path(sample["thermal"]),

                Path(sample["acoustic"]),

            )

            prediction = result["prediction"]

            confidence = result["confidence"]

            predicted_label = 1 if prediction.lower() == "drone" else 0

            y_true.append(sample["label"])

            y_pred.append(predicted_label)

            y_scores.append(confidence)

        metrics = MetricsCalculator.calculate(

            y_true,

            y_pred,

            y_scores,

        )

        logger.info("Evaluation Completed")

        return {

            "metrics": metrics,

            "samples": len(dataset),

            "y_true": y_true,

            "y_pred": y_pred,

            "y_scores": y_scores,

        }