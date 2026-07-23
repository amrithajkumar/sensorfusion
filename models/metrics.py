"""
===========================================================
Evaluation Metrics

Computes:

• Accuracy
• Precision
• Recall
• F1 Score
• ROC AUC
• Confusion Matrix
• Classification Report

Author: Quantum Fusion Team
===========================================================
"""

import numpy as np

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report,
)


class Metrics:

    def evaluate(self, y_true, y_pred):

        results = {

            "accuracy": accuracy_score(y_true, y_pred),

            "precision": precision_score(
                y_true,
                y_pred,
                zero_division=0
            ),

            "recall": recall_score(
                y_true,
                y_pred,
                zero_division=0
            ),

            "f1": f1_score(
                y_true,
                y_pred,
                zero_division=0
            ),

            "confusion_matrix": confusion_matrix(
                y_true,
                y_pred
            ),

            "classification_report": classification_report(
                y_true,
                y_pred,
                zero_division=0
            )

        }

        try:

            results["roc_auc"] = roc_auc_score(
                y_true,
                y_pred
            )

        except Exception:

            results["roc_auc"] = 0.0

        return results

    # ----------------------------------------------------

    def print_results(self, results):

        print("\n===================================")
        print(" Evaluation Metrics")
        print("===================================\n")

        print(f"Accuracy  : {results['accuracy']:.4f}")
        print(f"Precision : {results['precision']:.4f}")
        print(f"Recall    : {results['recall']:.4f}")
        print(f"F1 Score  : {results['f1']:.4f}")
        print(f"ROC AUC   : {results['roc_auc']:.4f}")

        print("\nConfusion Matrix")

        print(results["confusion_matrix"])

        print("\nClassification Report\n")

        print(results["classification_report"])