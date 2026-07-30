import numpy as np


class SensorFusion:

    def __init__(
        self,
        radar_weight=0.33,
        thermal_weight=0.33,
        acoustic_weight=0.34,
    ):

        self.default_weights = {
            "radar": radar_weight,
            "thermal": thermal_weight,
            "acoustic": acoustic_weight,
        }

    # ------------------------------------------------------

    def normalize(self, features):

        features = np.asarray(features, dtype=np.float32)

        minimum = features.min()
        maximum = features.max()

        if maximum == minimum:
            return np.zeros_like(features)

        return (features - minimum) / (maximum - minimum)

    # ------------------------------------------------------

    def thermal_score(self, thermal_features):

        thermal_features = self.normalize(thermal_features)

        return float(np.mean(thermal_features))

    # ------------------------------------------------------

    def fuse(
        self,
        radar_probability=None,
        acoustic_probability=None,
        thermal_features=None,
    ):

        available = {}

        # -----------------------------
        # Radar
        # -----------------------------
        if radar_probability is not None:
            available["radar"] = float(radar_probability)

        # -----------------------------
        # Thermal
        # -----------------------------
        if thermal_features is not None:
            available["thermal"] = self.thermal_score(
                thermal_features
            )

        # -----------------------------
        # Acoustic
        # -----------------------------
        if acoustic_probability is not None:
            available["acoustic"] = float(acoustic_probability)

        # -----------------------------
        # Safety Check
        # -----------------------------
        if len(available) < 2:
            raise ValueError(
                "At least two sensors are required for fusion."
            )

        # -----------------------------
        # Recalculate weights
        # -----------------------------
        total_weight = sum(
            self.default_weights[name]
            for name in available
        )

        normalized_weights = {}

        for name in available:

            normalized_weights[name] = (
                self.default_weights[name] /
                total_weight
            )

        # -----------------------------
        # Weighted Fusion
        # -----------------------------
        fusion_score = 0.0

        for sensor in available:

            fusion_score += (
                available[sensor] *
                normalized_weights[sensor]
            )

        detected = fusion_score >= 0.50

        return {

            "prediction": "Drone" if detected else "No Drone",

            "confidence": round(float(fusion_score), 4),

            "detected": bool(detected),

            "details": {

                "radar_probability": (
                    round(available["radar"], 4)
                    if "radar" in available
                    else None
                ),

                "thermal_probability": (
                    round(available["thermal"], 4)
                    if "thermal" in available
                    else None
                ),

                "acoustic_probability": (
                    round(available["acoustic"], 4)
                    if "acoustic" in available
                    else None
                ),

                "weights": normalized_weights,

                "active_sensors": list(
                    available.keys()
                )

            }

        }