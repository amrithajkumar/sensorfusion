"""
=====================================================
Quantum Weight Optimizer

Optimizes sensor fusion weights.

Current Version:
    - Grid Search (Classical Baseline)

Future Version:
    - QuantumNow QUBO Optimizer

=====================================================
"""

from itertools import product


class QuantumOptimizer:

    def __init__(self):
        pass

    def optimize(self, evaluation_function):

        best_score = -1

        best_weights = None

        candidates = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]

        for a,t,r in product(candidates,candidates,candidates):

            if abs(a+t+r-1.0)>1e-6:
                continue

            score = evaluation_function(a,t,r)

            if score>best_score:

                best_score=score

                best_weights={

                    "acoustic":a,
                    "thermal":t,
                    "radar":r
                }

        return best_weights,best_score