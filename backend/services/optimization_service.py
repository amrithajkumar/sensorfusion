import time

from quantum.interface import QuantumInterface

from classical.interface import ClassicalInterface


class OptimizationService:

    def __init__(self):

        self.quantum = QuantumInterface(

            use_quantum=True

        )

        self.classical = ClassicalInterface(

            iterations=5000

        )

    def optimize(

        self,

        evaluation_function,

    ):

        # -----------------------------
        # Quantum
        # -----------------------------

        quantum_start = time.perf_counter()

        quantum_weights, quantum_score = self.quantum.optimize(

            evaluation_function

        )

        quantum_runtime = round(

            time.perf_counter()

            -

            quantum_start,

            4,

        )

        # -----------------------------
        # Classical
        # -----------------------------

        classical_start = time.perf_counter()

        classical_weights, classical_score = self.classical.optimize(

            evaluation_function

        )

        classical_runtime = round(

            time.perf_counter()

            -

            classical_start,

            4,

        )

        improvement = (

            (

                quantum_score

                -

                classical_score

            )

            /

            classical_score

            *

            100

            if classical_score != 0

            else 0

        )

        return {

            "quantum": {

                "weights": quantum_weights,

                "score": quantum_score,

                "runtime": quantum_runtime,

            },

            "classical": {

                "weights": classical_weights,

                "score": classical_score,

                "runtime": classical_runtime,

            },

            "improvement": improvement,

        }