class ReliabilityService:

    def __init__(self):
        pass

    def estimate(

        self,

        radar_probability,

        thermal_probability,

        acoustic_probability,

    ):

        sensor_probabilities = {

            "radar": radar_probability,

            "thermal": thermal_probability,

            "acoustic": acoustic_probability,

        }

        mean_probability = (

            sum(sensor_probabilities.values())

            / len(sensor_probabilities)

        )

        reliability = {}

        for sensor, probability in sensor_probabilities.items():

            confidence_score = probability

            consistency_score = max(

                0.0,

                1.0 - abs(probability - mean_probability)

            )

            reliability[sensor] = round(

                (

                    0.70 * confidence_score

                    +

                    0.30 * consistency_score

                ),

                4,

            )

        return reliability