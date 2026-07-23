def normalize_weights(weights):
    """
    Normalize weights so they sum to 1.
    """

    total = sum(weights.values())

    if total == 0:
        return weights

    return {
        key: value / total
        for key, value in weights.items()
    }