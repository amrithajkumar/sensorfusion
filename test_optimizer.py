from quantum.optimizer import QuantumOptimizer


def scoring(acoustic, thermal, radar):

    """
    Dummy scoring function.

    Replace later with:
    Detection Rate
    Precision
    F1
    etc.
    """

    return (
        acoustic * 0.90
        +
        thermal * 0.82
        +
        radar * 0.75
    )


optimizer = QuantumOptimizer()

weights = optimizer.optimize(scoring)

print("\nBest Weights\n")

for k, v in weights.items():
    print(f"{k:12}: {v:.2f}")

print("\nBest Score")
print(optimizer.best_score)