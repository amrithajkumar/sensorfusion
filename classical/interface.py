from classical.optimizer import ClassicalOptimizer


class ClassicalInterface:

    def __init__(self, iterations=5000):

        self.optimizer = ClassicalOptimizer(
            iterations=iterations
        )

    def optimize(self, evaluation_function):

        return self.optimizer.optimize(
            evaluation_function
        )