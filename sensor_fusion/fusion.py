"""
=====================================================
Sensor Fusion

Implements weighted sensor fusion.

Inputs:
    - Radar AI Probability
    - Thermal AI Probability
    - Acoustic AI Probability

Supports:
    - Default static weights
    - Quantum-optimized weights

Author : Quantum Fusion Team
=====================================================
"""


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
    # Weighted Fusion
    # ------------------------------------------------------

    def fuse(
        self,
        radar_probability=None,
        thermal_probability=None,
        acoustic_probability=None,
        weights=None,
    ):

        available = {}

        if radar_probability is not None:
            available["radar"] = float(radar_probability)

        if thermal_probability is not None:
            available["thermal"] = float(thermal_probability)

        if acoustic_probability is not None:
            available["acoustic"] = float(acoustic_probability)

        if len(available) < 2:
            raise ValueError(
                "At least two sensors are required for fusion."
            )

        # Use quantum weights if available
        if weights is None:
            current_weights = self.default_weights
        else:
            current_weights = weights

        total_weight = sum(
            current_weights[name]
            for name in available
        )

        normalized_weights = {}

        for name in available:
            normalized_weights[name] = (
                current_weights[name] / total_weight
            )

        fusion_score = 0.0

        for sensor in available:
            fusion_score += (
                available[sensor]
                * normalized_weights[sensor]
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

                "weights": {
                    key: round(value, 4)
                    for key, value in normalized_weights.items()
                },

                "active_sensors": list(
                    available.keys()
                )

            }

        }