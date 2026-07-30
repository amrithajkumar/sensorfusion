"""
=====================================================
Quantum Evaluation Engine

Evaluates one set of sensor fusion weights.

Uses configurable optimization metrics from
backend/config.py.

=====================================================
"""

from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)

from backend.config import settings


class EvaluationEngine:

    def __init__(self):

        self.metric_weights = settings.OPTIMIZATION_METRICS

    def evaluate(
        self,
        y_true,
        y_pred,
    ):

        precision = precision_score(
            y_true,
            y_pred,
            zero_division=0
        )

        recall = recall_score(
            y_true,
            y_pred,
            zero_division=0
        )

        f1 = f1_score(
            y_true,
            y_pred,
            zero_division=0
        )

        tn, fp, fn, tp = confusion_matrix(
            y_true,
            y_pred
        ).ravel()

        detection_rate = tp / (tp + fn + 1e-9)

        false_alarm_rate = fp / (fp + tn + 1e-9)

        score = (

            self.metric_weights["f1"] * f1 +

            self.metric_weights["precision"] * precision +

            self.metric_weights["recall"] * recall +

            self.metric_weights["detection_rate"] * detection_rate +

            self.metric_weights["false_alarm_rate"] * false_alarm_rate

        )

        return {

            "precision": round(float(precision), 4),

            "recall": round(float(recall), 4),

            "f1": round(float(f1), 4),

            "detection_rate": round(float(detection_rate), 4),

            "false_alarm_rate": round(float(false_alarm_rate), 4),

            "score": round(float(score), 4),

        }