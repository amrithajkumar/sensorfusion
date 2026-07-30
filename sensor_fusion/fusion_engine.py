"""
=====================================================
Fusion Engine

Central Sensor Fusion Controller

Supports:
    - Weighted Fusion
    - Quantum Optimized Fusion
    - Future Bayesian Fusion
    - Future Kalman Fusion

Author : Quantum Fusion Team
=====================================================
"""

from sensor_fusion.fusion import SensorFusion


class FusionEngine:

    def __init__(self):

        self.weighted = SensorFusion()

    # --------------------------------------------------

    def fuse(
        self,
        radar_probability,
        thermal_probability,
        acoustic_probability,
        method="weighted",
        weights=None,
    ):

        if method == "weighted":

            return self.weighted.fuse(

                radar_probability=radar_probability,

                thermal_probability=thermal_probability,

                acoustic_probability=acoustic_probability,

                weights=weights,

            )

        raise ValueError(
            f"Unsupported fusion method: {method}"
        )


# =====================================================
# Example
# =====================================================

if __name__ == "__main__":

    fusion = FusionEngine()

    result = fusion.fuse(

        radar_probability=0.87,

        thermal_probability=0.95,

        acoustic_probability=0.91,

    )

    print(result)