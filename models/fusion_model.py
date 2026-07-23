import os
import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from utils.metrics import Metrics
from utils.evaluator import Evaluator


class FusionModel:

    def __init__(self):

        self.model = RandomForestClassifier(
            n_estimators=300,
            max_depth=20,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1
        )

        self.metrics = Metrics()

    # --------------------------------------------------

    def load_dataset(self):

        print("Loading fusion dataset...")

        X = np.load("datasets/fusion/X.npy")
        y = np.load("datasets/fusion/y.npy")

        print(f"Samples  : {len(X)}")
        print(f"Features : {X.shape[1]}")

        return train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42,
            stratify=y
        )

    # --------------------------------------------------

    def train(self):

        X_train, X_test, y_train, y_test = self.load_dataset()

        print("\nTraining Fusion Model...\n")

        self.model.fit(X_train, y_train)

        return X_test, y_test

    # --------------------------------------------------

    def evaluate(self):

        X_test, y_test = self.train()

        predictions = self.model.predict(X_test)
        probabilities = self.model.predict_proba(X_test)[:, 1]

        results = self.metrics.evaluate(
            y_test,
            predictions,
            probabilities
        )

        self.metrics.print_results(results)

        evaluator = Evaluator()

        evaluator.save_confusion_matrix(
            results["confusion_matrix"]
        )

        evaluator.save_roc_curve(
            y_test,
            probabilities
        )

        evaluator.save_classification_report(
            results["classification_report"]
        )

    # --------------------------------------------------

    def predict(self, features):

        return self.model.predict(features)

    # --------------------------------------------------

    def predict_proba(self, features):

        return self.model.predict_proba(features)

    # --------------------------------------------------

    def save_model(self):

        os.makedirs(
            "results/models",
            exist_ok=True
        )

        joblib.dump(
            self.model,
            "results/models/fusion_model.pkl"
        )

        print("Fusion model saved.")

    # --------------------------------------------------

    def load_model(self):

        self.model = joblib.load(
            "results/models/fusion_model.pkl"
        )

        print("Fusion model loaded.")

    # --------------------------------------------------

    def run(self):

        self.evaluate()

        self.save_model()


if __name__ == "__main__":

    FusionModel().run()