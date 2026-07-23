"""
===========================================================
Acoustic Drone Detection Model

Trains a Random Forest classifier using acoustic features.

Dataset Structure
-----------------
datasets/
└── acoustic/
    └── features/
        ├── unknown/
        └── yes_drone/

Author : Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from models.metrics import Metrics
from models.evaluate import Evaluator


class AcousticModel:

    def __init__(self):

        self.dataset_path = Path("datasets/acoustic/features")

        self.model_directory = Path("results/models")
        self.model_directory.mkdir(
            parents=True,
            exist_ok=True
        )

        self.model_path = self.model_directory / "acoustic_random_forest.pkl"

        self.model = RandomForestClassifier(
            n_estimators=200,
            max_depth=20,
            random_state=42,
            class_weight="balanced",
            n_jobs=-1
        )

    # --------------------------------------------------

    def load_dataset(self):

        print("\nLoading Acoustic Dataset...\n")

        X = []
        y = []

        class_map = {
            "unknown": 0,
            "yes_drone": 1
        }

        for class_name, label in class_map.items():

            folder = self.dataset_path / class_name

            if not folder.exists():
                continue

            files = sorted(folder.glob("*.npy"))

            print(f"{class_name:12} : {len(files)} samples")

            for file in files:

                feature = np.load(file)

                X.append(feature)
                y.append(label)

        X = np.array(X, dtype=np.float32)
        y = np.array(y)

        print("\nDataset Loaded Successfully")
        print("----------------------------")
        print("Features :", X.shape)
        print("Labels   :", y.shape)

        return X, y

    # --------------------------------------------------

    def train(self):

        X, y = self.load_dataset()

        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X,
            y,
            test_size=0.20,
            random_state=42,
            stratify=y
        )

        print("\nTrain/Test Split")
        print("----------------------------")
        print("Train :", len(self.X_train))
        print("Test  :", len(self.X_test))

        print("\nTraining Acoustic Random Forest...")

        self.model.fit(
            self.X_train,
            self.y_train
        )

        print("Training Completed.")

    # --------------------------------------------------

    def evaluate(self):

        predictions = self.model.predict(self.X_test)

        probabilities = self.model.predict_proba(self.X_test)[:, 1]

        metrics = Metrics()

        results = metrics.evaluate(
            self.y_test,
            predictions
        )

        print("\n===================================")
        print(" Acoustic Model Evaluation")
        print("===================================\n")

        metrics.print_results(results)

        evaluator = Evaluator()

        evaluator.save_confusion_matrix(
            self.y_test,
            predictions
        )

        evaluator.save_roc_curve(
            self.y_test,
            probabilities
        )

        evaluator.save_report(
            self.y_test,
            predictions
        )

    # --------------------------------------------------

    def save_model(self):

        joblib.dump(
            self.model,
            self.model_path
        )

        print("\nModel Saved Successfully")
        print(self.model_path)

        # --------------------------------------------------

    def load_model(self):

        self.model = joblib.load(self.model_path)

        print("\nAcoustic Model Loaded Successfully")
        print(self.model_path)

    # --------------------------------------------------

    def predict(self, features):

        features = np.asarray(features, dtype=np.float32)

        if features.ndim == 1:
            features = features.reshape(1, -1)

        return self.model.predict(features)[0]

    # --------------------------------------------------

    def predict_proba(self, features):

        features = np.asarray(features, dtype=np.float32)

        if features.ndim == 1:
            features = features.reshape(1, -1)

        return self.model.predict_proba(features)[0][1]

    # --------------------------------------------------

    def run(self):

        self.train()

        self.evaluate()

        self.save_model()


# ======================================================

def main():

    model = AcousticModel()

    model.run()


if __name__ == "__main__":

    main()