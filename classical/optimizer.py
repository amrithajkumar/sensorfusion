import random


class ClassicalOptimizer:

    def __init__(self, iterations=5000):
        self.iterations = iterations

    def optimize(self, evaluation_function):

        best_score = float("-inf")
        best_weights = None

        for _ in range(self.iterations):

            # Generate random weights
            radar = random.random()
            thermal = random.random()
            acoustic = random.random()

            total = radar + thermal + acoustic

            radar /= total
            thermal /= total
            acoustic /= total

            score = evaluation_function(

                acoustic_weight=acoustic,
                thermal_weight=thermal,
                radar_weight=radar,

            )

            if score > best_score:

                best_score = score

                best_weights = {

                    "radar": radar,
                    "thermal": thermal,
                    "acoustic": acoustic,

                }

        return best_weights, best_score