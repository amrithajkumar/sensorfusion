"""
=====================================================
QuantumNow Optimizer using BQPhy SDK

Optimizes:
    - Acoustic Weight
    - Thermal Weight
    - Radar Weight

using BosonQ BQPhy.

=====================================================
"""

import numpy as np
import bqphy.BQPhy_Optimiser as qea

from quantum.utils import normalize_weights


class QuantumNowOptimizer:

    def __init__(self):

        self.optimizer = qea.BQPhy_OPTIMISER()

    def optimize(self, evaluation_function):

        # Store evaluation function
        self.evaluation_function = evaluation_function

        config = {

            "numPopulation": 40,

            "maxGeneration": 100,

            "designVariables": 3,

            "typeOfOptimisation": "CONTINUOUS",

            "lowerBounds": [0.0, 0.0, 0.0],

            "upperBounds": [1.0, 1.0, 1.0],

            "generationLogging": "minimumLogging",

            "outputFilePath": "results/quantum"

        }

        self.optimizer.initialize(config)

        self.optimizer.model(self._fitness)

        self.optimizer.runOptimization()

        best_solution, best_history = self.optimizer.getBestDesign()

        weights = {

            "acoustic": float(best_solution[0]),

            "thermal": float(best_solution[1]),

            "radar": float(best_solution[2])

        }

        weights = normalize_weights(weights)

        best_score = self.evaluation_function(

            weights["acoustic"],

            weights["thermal"],

            weights["radar"]

        )

        return weights, best_score

    def _fitness(self, population):

        fitness = np.zeros(population.shape[0])

        for i in range(population.shape[0]):

            weights = {

                "acoustic": float(population[i][0]),

                "thermal": float(population[i][1]),

                "radar": float(population[i][2])

            }

            weights = normalize_weights(weights)

            score = self.evaluation_function(

                weights["acoustic"],

                weights["thermal"],

                weights["radar"]

            )

            # BQPhy minimizes fitness
            fitness[i] = -score

        return fitness