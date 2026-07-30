"""
===========================================================
Thermal Inference

Loads the trained Thermal Random Forest model
trained on the new thermal image feature dataset.

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import joblib
import numpy as np


class ThermalInference:

    def __init__(self):

        self.model_path = Path(
            "backend/ai/thermal/models/thermal_model.pkl"
        )

        self.model = None

        self.label_map = {
            0: "Airplane",
            1: "Bird",
            2: "Drone",
            3: "Helicopter",
        }

    # --------------------------------------------------

    def load_model(self):

        if self.model is None:

            if not self.model_path.exists():
                raise FileNotFoundError(
                    f"Model not found: {self.model_path}"
                )

            self.model = joblib.load(self.model_path)

            print("Thermal model loaded successfully.")

        return self.model

    # --------------------------------------------------

    def predict(self, feature_vector):

        model = self.load_model()

        feature_vector = np.asarray(
            feature_vector,
            dtype=np.float32
        ).reshape(1, -1)

        prediction = model.predict(feature_vector)[0]

        return self.label_map[int(prediction)]

    # --------------------------------------------------

    def predict_proba(self, feature_vector):

        model = self.load_model()

        feature_vector = np.asarray(
            feature_vector,
            dtype=np.float32
        ).reshape(1, -1)

        probabilities = model.predict_proba(feature_vector)[0]

        return {
            "Airplane": float(probabilities[0]),
            "Bird": float(probabilities[1]),
            "Drone": float(probabilities[2]),
            "Helicopter": float(probabilities[3]),
        }

    # --------------------------------------------------

    def drone_probability(self, feature_vector):

        probabilities = self.predict_proba(feature_vector)

        return probabilities["Drone"]


# ==========================================================
# Test
# ==========================================================

if __name__ == "__main__":

    inference = ThermalInference()

    sample_file = Path(
        "datasets/thermal/features/Drone"
    )

    files = sorted(sample_file.glob("*.npy"))

    if len(files) == 0:

        print("No sample feature file found.")

    else:

        feature_vector = np.load(files[0])

        print("\nPrediction")
        print("---------------------------")

        print(
            inference.predict(feature_vector)
        )

        print("\nProbabilities")
        print("---------------------------")

        probabilities = inference.predict_proba(
            feature_vector
        )

        for label, value in probabilities.items():

            print(f"{label:12}: {value:.4f}")

        print("\nDrone Probability")

        print(
            inference.drone_probability(
                feature_vector
            )
        )