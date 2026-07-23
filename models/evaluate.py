"""
===========================================================
Evaluation Report Generator

Creates:
    • Confusion Matrix Image
    • ROC Curve Image
    • Classification Report

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import matplotlib.pyplot as plt

from sklearn.metrics import (
    ConfusionMatrixDisplay,
    RocCurveDisplay,
    classification_report,
)


class Evaluator:

    def __init__(self):

        self.output_dir = Path("results")

        self.output_dir.mkdir(
            parents=True,
            exist_ok=True
        )

    # ------------------------------------------------

    def save_confusion_matrix(

        self,

        y_true,

        y_pred

    ):

        disp = ConfusionMatrixDisplay.from_predictions(

            y_true,

            y_pred

        )

        plt.title("Confusion Matrix")

        plt.savefig(

            self.output_dir / "confusion_matrix.png",

            dpi=300,

            bbox_inches="tight"

        )

        plt.close()

    # ------------------------------------------------

    def save_roc_curve(

        self,

        y_true,

        probabilities

    ):

        RocCurveDisplay.from_predictions(

            y_true,

            probabilities

        )

        plt.title("ROC Curve")

        plt.savefig(

            self.output_dir / "roc_curve.png",

            dpi=300,

            bbox_inches="tight"

        )

        plt.close()

    # ------------------------------------------------

    def save_report(

        self,

        y_true,

        y_pred

    ):

        report = classification_report(

            y_true,

            y_pred

        )

        with open(

            self.output_dir / "classification_report.txt",

            "w",

            encoding="utf-8"

        ) as f:

            f.write(report)

        print("\nEvaluation files saved!")

        print(self.output_dir / "confusion_matrix.png")

        print(self.output_dir / "roc_curve.png")

        print(self.output_dir / "classification_report.txt")