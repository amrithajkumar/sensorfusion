from quantum.interface import QuantumInterface


optimizer = QuantumInterface(use_quantum=False)

print(type(optimizer.optimizer))

weights = optimizer.optimize(
    lambda a, t, r: a,
    step=0.2
)

print(weights)