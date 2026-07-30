from datetime import datetime


class ReportGenerator:
    """
    Generates a complete dashboard report.
    """

    @staticmethod
    def generate(

        metrics,

        comparison,

        quantum_weights,

        optimization_score,

        prediction_history=None,

        runtime=None,

        sensor_analysis=None,

    ):

        report = {

            "project": {

                "name": "Quantum Fusion",

                "version": "1.0",

                "framework": "QuantumNow Sensor Fusion",

                "generated_at": datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

            },

            "metrics": metrics,

            "comparison": comparison,

            "quantum": {

                "weights": quantum_weights,

                "optimization_score": optimization_score,

            },

            "runtime": {

                "execution_time_seconds": runtime

            },

            "sensor_analysis": sensor_analysis,

            "prediction_history": prediction_history

                if prediction_history is not None

                else []

        }

        return report