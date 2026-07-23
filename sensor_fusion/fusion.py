import numpy as np


class SensorFusion:

    def __init__(
        self,
        acoustic_weight=0.4,
        thermal_weight=0.3,
        radar_weight=0.3,
    ):

        total = acoustic_weight + thermal_weight + radar_weight

        self.aw = acoustic_weight / total
        self.tw = thermal_weight / total
        self.rw = radar_weight / total

    # --------------------------------------------------------

    def normalize(self, value):

        value = np.asarray(value, dtype=float)

        minimum = value.min()
        maximum = value.max()

        if maximum == minimum:
            return np.zeros_like(value)

        return (value - minimum) / (maximum - minimum)

    # --------------------------------------------------------

    def thermal_score(self, thermal_features):

        thermal_features = self.normalize(thermal_features)

        return np.mean(thermal_features)

    # --------------------------------------------------------

    def radar_score(self, radar_features):

        radar_features = self.normalize(radar_features)

        return np.mean(radar_features)

    # --------------------------------------------------------

    def fuse(
        self,
        acoustic_probability,
        thermal_features,
        radar_features,
    ):

        acoustic_score = float(acoustic_probability)

        thermal_score = self.thermal_score(
            thermal_features
        )

        radar_score = self.radar_score(
            radar_features
        )

        fusion_score = (

            self.aw * acoustic_score

            +

            self.tw * thermal_score

            +

            self.rw * radar_score

        )

        prediction = 1 if fusion_score >= 0.5 else 0

        return {

            "prediction": prediction,

            "fusion_score": fusion_score,

            "acoustic_score": acoustic_score,

            "thermal_score": thermal_score,

            "radar_score": radar_score,

            "weights": {

                "acoustic": self.aw,

                "thermal": self.tw,

                "radar": self.rw

            }

        }