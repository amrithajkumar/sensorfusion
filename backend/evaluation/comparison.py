from backend.logs.logger import logger


class ModelComparison:
    """
    Compares Classical Fusion vs Quantum Fusion results.
    """

    @staticmethod
    def compare(classical_metrics, quantum_metrics):

        comparison = {}

        metric_names = [

            "accuracy",

            "precision",

            "recall",

            "f1_score",

            "detection_rate",

            "false_alarm_rate",

            "roc_auc",

        ]

        for metric in metric_names:

            classical_value = classical_metrics.get(metric)

            quantum_value = quantum_metrics.get(metric)

            if classical_value is None or quantum_value is None:

                improvement = None

            else:

                improvement = quantum_value - classical_value

            comparison[metric] = {

                "classical": classical_value,

                "quantum": quantum_value,

                "improvement": improvement,

            }

        logger.info("Classical vs Quantum comparison completed.")

        return comparison

    @staticmethod
    def summary(comparison):

        summary = {}

        for metric, values in comparison.items():

            improvement = values["improvement"]

            if improvement is None:

                summary[metric] = "Unavailable"

                continue

            if metric == "false_alarm_rate":

                if improvement < 0:

                    summary[metric] = (
                        f"Quantum reduced False Alarm Rate by "
                        f"{abs(improvement)*100:.2f}%"
                    )

                elif improvement > 0:

                    summary[metric] = (
                        f"Quantum increased False Alarm Rate by "
                        f"{improvement*100:.2f}%"
                    )

                else:

                    summary[metric] = "No Change"

            else:

                if improvement > 0:

                    summary[metric] = (
                        f"Quantum improved by "
                        f"{improvement*100:.2f}%"
                    )

                elif improvement < 0:

                    summary[metric] = (
                        f"Quantum decreased by "
                        f"{abs(improvement)*100:.2f}%"
                    )

                else:

                    summary[metric] = "No Change"

        return summary