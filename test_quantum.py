from quantum.interface import QuantumInterface

def dummy_score(a, t, r):
    return a * 0.8 + t * 0.6 + r * 0.4

qi = QuantumInterface(use_quantum=False)

weights, score = qi.optimize(dummy_score)

print(weights)
print(score)