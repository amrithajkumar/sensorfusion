"""
===========================================================
Random Forest Baseline

Loads:
    datasets/fusion/X.npy
    datasets/fusion/y.npy

Performs:
    - Train/Test Split
    - Random Forest Training
    - Prediction
    - Model Evaluation

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from models.metrics import Metrics
from models.evaluate import Evaluator


class RandomForestModel:

    def __init__(self):

        self.dataset_directory = Path("datasets/fusion")

        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            n_jobs=-1
        )

    # ------------------------------------------------

    def load_dataset(self):

        x_path = self.dataset_directory / "X.npy"
        y_path = self.dataset_directory / "y.npy"

        X = np.load(x_path)
        y = np.load(y_path)

        print("\nDataset Loaded")
        print("---------------------")
        print(f"Features : {X.shape}")
        print(f"Labels   : {y.shape}")

        return X, y

    # ------------------------------------------------

    def split_dataset(self, X, y):

        return train_test_split(
            X,
            y,
            test_size=0.20,
            random_state=42,
            stratify=y
        )

    # ------------------------------------------------

    def train(self, X_train, y_train):

        print("\nTraining Random Forest...\n")

        self.model.fit(X_train, y_train)

        print("Training Completed.")

    # ------------------------------------------------

    def predict(self, X_test):

        return self.model.predict(X_test)

    # ------------------------------------------------

    def predict_probabilities(self, X_test):

        return self.model.predict_proba(X_test)[:, 1]

    # ------------------------------------------------

    def evaluate(self, y_test, predictions):

        metrics = Metrics()

        results = metrics.evaluate(
            y_test,
            predictions
        )

        metrics.print_results(results)

        return results

    # ------------------------------------------------

    def run(self):

        X, y = self.load_dataset()

        X_train, X_test, y_train, y_test = self.split_dataset(
            X,
            y
        )

        print("\nTrain/Test Split")
        print("---------------------")
        print(f"Train : {len(X_train)}")
        print(f"Test  : {len(X_test)}")

        self.train(
            X_train,
            y_train
        )

        predictions = self.predict(
            X_test
        )

        probabilities = self.predict_probabilities(
            X_test
        )

        results = self.evaluate(
            y_test,
            predictions
        )

        evaluator = Evaluator()

        evaluator.save_confusion_matrix(
            y_test,
            predictions
        )

        evaluator.save_roc_curve(
            y_test,
            probabilities
        )

        evaluator.save_report(
            y_test,
            predictions
        )

        return results


# ===========================================================

def main():

    model = RandomForestModel()

    model.run()


if __name__ == "__main__":

    main()