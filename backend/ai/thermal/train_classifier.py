"""
===========================================================
Thermal Classifier Training

Trains a Random Forest classifier using aggregated
thermal sequence features.

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)
from sklearn.model_selection import train_test_split


class ThermalClassifierTrainer:

    def __init__(self):

        self.dataset_directory = Path(
            "datasets/thermal/features"
        )

        self.model_directory = Path(
            "backend/ai/thermal/models"
        )

        self.model_directory.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.label_map = {
            "Airplane": 0,
            "Bird": 1,
            "Drone": 2,
            "Helicopter": 3,
        }

        self.reverse_label_map = {
            value: key
            for key, value in self.label_map.items()
        }

    # --------------------------------------------------

    def load_dataset(self):

        X = []
        y = []

        print("=" * 60)
        print("Loading thermal Features")
        print("=" * 60)

        for class_name, label in self.label_map.items():

            folder = self.dataset_directory / class_name

            if not folder.exists():
                print(f"Skipping {class_name} (folder not found)")
                continue

            files = sorted(folder.glob("*.npy"))

            print(f"{class_name:<12}: {len(files)} sequences")

            for file in files:

                feature_vector = np.load(file)

                X.append(feature_vector)
                y.append(label)

        X = np.asarray(X, dtype=np.float32)
        y = np.asarray(y)

        print("\nTotal Samples :", len(X))
        print("Feature Size  :", X.shape[1])

        return X, y

    # --------------------------------------------------

    def train(self):

        X, y = self.load_dataset()

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.20,
            random_state=42,
            stratify=y,
        )

        print("\nTraining Random Forest...\n")

        model = RandomForestClassifier(
            n_estimators=200,
            random_state=42,
            n_jobs=-1,
        )

        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

        accuracy = accuracy_score(
            y_test,
            predictions,
        )

        print("=" * 60)
        print("RESULTS")
        print("=" * 60)

        print(f"Accuracy : {accuracy * 100:.2f}%")

        print("\nClassification Report\n")

        print(
            classification_report(
                y_test,
                predictions,
                target_names=list(self.label_map.keys()),
            )
        )

        print("Confusion Matrix\n")

        print(
            confusion_matrix(
                y_test,
                predictions,
            )
        )

        model_path = (
            self.model_directory /
            "thermal_model.pkl"
        )

        joblib.dump(
            model,
            model_path,
        )

        print("\nModel Saved Successfully")

        print(model_path)


if __name__ == "__main__":

    trainer = ThermalClassifierTrainer()

    trainer.train()