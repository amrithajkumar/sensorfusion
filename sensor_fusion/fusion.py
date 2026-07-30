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

        total = radar_weight + thermal_weight + acoustic_weight

        self.rw = radar_weight / total
        self.tw = thermal_weight / total
        self.aw = acoustic_weight / total

    # ------------------------------------------------------
    # Weighted Fusion
    # ------------------------------------------------------

    def fuse(
        self,
        radar_probability,
        thermal_probability,
        acoustic_probability,
        weights=None,
    ):

        # --------------------------------------
        # Use Quantum-Optimized Weights
        # --------------------------------------

        if weights is None:

            rw = self.rw
            tw = self.tw
            aw = self.aw

        else:

            rw = weights["radar"]
            tw = weights["thermal"]
            aw = weights["acoustic"]

        # --------------------------------------
        # Fusion Score
        # --------------------------------------

        fusion_score = (

            rw * float(radar_probability) +

            tw * float(thermal_probability) +

            aw * float(acoustic_probability)

        )

        detected = fusion_score >= 0.50

        # --------------------------------------
        # Result
        # --------------------------------------

        return {

            "prediction": "Drone" if detected else "No Drone",

            "confidence": round(float(fusion_score), 4),

            "detected": bool(detected),

            "details": {

                "radar_probability": round(
                    float(radar_probability), 4
                ),

                "thermal_probability": round(
                    float(thermal_probability), 4
                ),

                "acoustic_probability": round(
                    float(acoustic_probability), 4
                ),

                "weights": {

                    "radar": round(float(rw), 4),

                    "thermal": round(float(tw), 4),

                    "acoustic": round(float(aw), 4),

                }

            }

        }