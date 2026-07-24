import numpy as np


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

        radar_probability,

        acoustic_probability,

        thermal_features,

    ):

        thermal_probability = self.thermal_score(
            thermal_features
        )

        fusion_score = (

            self.rw * radar_probability +

            self.tw * thermal_probability +

            self.aw * acoustic_probability

        )

        prediction = int(fusion_score >= 0.50)

        return {

            "prediction": prediction,

            "fusion_score": round(float(fusion_score), 4),

            "radar_probability": round(float(radar_probability), 4),

            "thermal_probability": round(float(thermal_probability), 4),

            "acoustic_probability": round(float(acoustic_probability), 4),

            "weights": {

                "radar": self.rw,

                "thermal": self.tw,

                "acoustic": self.aw

            }

        }