"""
===========================================================
Radar Random Forest Model

Trains a Random Forest classifier using the
radar feature vectors extracted from the
SAAB SIRS FMCW Dataset.

Author : Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import joblib
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report,
)
from sklearn.model_selection import train_test_split


class RadarModel:

    def __init__(self):

        self.feature_path = Path(
            "datasets/radar/features/X.npy"
        )

        self.label_path = Path(
            "datasets/radar/features/y.npy"
        )

        self.model_directory = Path(
            "results/models"
        )

        self.model_directory.mkdir(
            parents=True,
            exist_ok=True
        )

        self.model_path = (
            self.model_directory /
            "radar_random_forest.pkl"
        )
            # ==========================================================
    # Load Features
    # ==========================================================

    def load_dataset(self):

        print("\nLoading radar features...")

        X = np.load(self.feature_path)
        y = np.load(self.label_path)

        print(f"Samples  : {len(X)}")
        print(f"Features : {X.shape[1]}")

        return X, y


    # ==========================================================
    # Train-Test Split
    # ==========================================================

    def split_dataset(self, X, y):

        print("\nSplitting dataset...")

        X_train, X_test, y_train, y_test = train_test_split(

            X,
            y,

            test_size=0.20,

            random_state=42,

            stratify=y

        )

        print(f"Training Samples : {len(X_train)}")
        print(f"Testing Samples  : {len(X_test)}")

        return (

            X_train,

            X_test,

            y_train,

            y_test

        )
        # ==========================================================
    # Train Random Forest
    # ==========================================================

    def train_model(self, X_train, y_train):

        print("\nTraining Random Forest Model...")

        model = RandomForestClassifier(

            n_estimators=200,

            max_depth=10,

            random_state=42,

            class_weight="balanced",

            n_jobs=-1

        )

        model.fit(

            X_train,

            y_train

        )

        print("Training Complete!")

        return model


    # ==========================================================
    # Make Predictions
    # ==========================================================

    def predict(self, model, X_test):

        print("\nMaking Predictions...")

        predictions = model.predict(X_test)

        probabilities = model.predict_proba(X_test)[:, 1]

        return predictions, probabilities
        # ==========================================================
    # Evaluate Model
    # ==========================================================

    def evaluate(
        self,
        y_test,
        predictions,
        probabilities
    ):

        print("\n===================================")
        print("Radar Model Evaluation")
        print("===================================")

        accuracy = accuracy_score(
            y_test,
            predictions
        )

        precision = precision_score(
            y_test,
            predictions,
            zero_division=0
        )

        recall = recall_score(
            y_test,
            predictions,
            zero_division=0
        )

        f1 = f1_score(
            y_test,
            predictions,
            zero_division=0
        )

        roc_auc = roc_auc_score(
            y_test,
            probabilities
        )

        cm = confusion_matrix(
            y_test,
            predictions
        )

        print(f"\nAccuracy : {accuracy:.4f}")
        print(f"Precision: {precision:.4f}")
        print(f"Recall   : {recall:.4f}")
        print(f"F1 Score : {f1:.4f}")
        print(f"ROC AUC  : {roc_auc:.4f}")

        print("\nClassification Report")
        print("-----------------------------------")
        print(
            classification_report(
                y_test,
                predictions,
                target_names=[
                    "Non-Drone",
                    "Drone"
                ],
                zero_division=0
            )
        )

        print("Confusion Matrix")
        print("-----------------------------------")
        print(cm)

        return {

            "accuracy": accuracy,

            "precision": precision,

            "recall": recall,

            "f1_score": f1,

            "roc_auc": roc_auc,

            "confusion_matrix": cm

        }
        # ==========================================================
    # Save Model
    # ==========================================================

    def save_model(self, model):

        print("\nSaving trained model...")

        joblib.dump(

            model,

            self.model_path

        )

        print(f"Model saved successfully!")

        print(f"Location: {self.model_path}")

        return self.model_path
        # ==========================================================
    # Complete Pipeline
    # ==========================================================

    def run(self):

        # Load data
        X, y = self.load_dataset()

        # Split dataset
        X_train, X_test, y_train, y_test = self.split_dataset(
            X,
            y
        )

        # Train model
        model = self.train_model(
            X_train,
            y_train
        )

        # Predictions
        predictions, probabilities = self.predict(
            model,
            X_test
        )

        # Evaluation
        metrics = self.evaluate(
            y_test,
            predictions,
            probabilities
        )

        # Save model
        self.save_model(
            model
        )

        print("\n===================================")
        print("Radar Model Training Complete")
        print("===================================")

        return metrics


# ==========================================================
# Main
# ==========================================================

if __name__ == "__main__":

    radar_model = RadarModel()

    radar_model.run()