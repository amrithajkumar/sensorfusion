from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    roc_auc_score,
)


class MetricsCalculator:
    """
    Computes evaluation metrics for binary classification.
    """

    @staticmethod
    def calculate(y_true, y_pred, y_scores=None):

        metrics = {}

        metrics["accuracy"] = accuracy_score(
            y_true,
            y_pred,
        )

        metrics["precision"] = precision_score(
            y_true,
            y_pred,
            zero_division=0,
        )

        metrics["recall"] = recall_score(
            y_true,
            y_pred,
            zero_division=0,
        )

        metrics["f1_score"] = f1_score(
            y_true,
            y_pred,
            zero_division=0,
        )

        tn, fp, fn, tp = confusion_matrix(
            y_true,
            y_pred,
        ).ravel()

        metrics["true_positive"] = int(tp)
        metrics["true_negative"] = int(tn)
        metrics["false_positive"] = int(fp)
        metrics["false_negative"] = int(fn)

        metrics["detection_rate"] = (
            tp / (tp + fn)
            if (tp + fn) > 0
            else 0
        )

        metrics["false_alarm_rate"] = (
            fp / (fp + tn)
            if (fp + tn) > 0
            else 0
        )

        if y_scores is not None:

            try:

                metrics["roc_auc"] = roc_auc_score(
                    y_true,
                    y_scores,
                )

            except Exception:

                metrics["roc_auc"] = None

        else:

            metrics["roc_auc"] = None

        return metrics