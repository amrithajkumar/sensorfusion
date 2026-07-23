"""
===========================================================
Training Pipeline

Runs the complete classical ML pipeline.

Workflow:
    Dataset
        ↓
    Train Random Forest
        ↓
    Evaluate
        ↓
    Save Model

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import joblib

from models.random_forest import RandomForestModel


class Trainer:

    def __init__(self):

        self.output_directory = Path("results/models")

        self.output_directory.mkdir(
            parents=True,
            exist_ok=True
        )

    # ------------------------------------------------

    def train(self):

        print("\n========================================")
        print(" Classical ML Training Pipeline")
        print("========================================\n")

        model = RandomForestModel()

        model.run()

        model_path = self.output_directory / "baseline_random_forest.pkl"

        joblib.dump(
            model.model,
            model_path
        )

        print("\nModel Saved Successfully")

        print(model_path)

        return model_path


def main():

    trainer = Trainer()

    trainer.train()


if __name__ == "__main__":

    main()