"""
=====================================================
Quantum Optimization Interface

This module acts as the bridge between the rest of
the project and the optimization algorithms.

The detector, backend, and dashboard never call
QuantumNow directly.

Instead they always call:

    QuantumInterface.optimize()

Today:
    -> Classical Optimizer

Future:
    -> QuantumNow Optimizer

=====================================================
"""

from quantum.optimizer import QuantumOptimizer
from quantum.quantum_now import QuantumNowOptimizer


class QuantumInterface:

    def __init__(self, use_quantum=False):

        self.use_quantum = use_quantum

        if use_quantum:

            self.optimizer = QuantumNowOptimizer()

        else:

            self.optimizer = QuantumOptimizer()

    def optimize(self, data):

        return self.optimizer.optimize(data)