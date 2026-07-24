"""
===========================================================
Thermal Model

Loads aggregated thermal sequence features.

This module prepares thermal feature vectors for the
sensor fusion model.

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import numpy as np


class ThermalModel:

    def __init__(self):

        self.feature_directory = Path(
            "datasets/thermal/sequence_features"
        )

        self.X = None
        self.sequence_names = []

    # =====================================================
    # Load Sequence Features
    # =====================================================

    def load_dataset(self):

        features = []

        for split in ["train", "val", "test"]:

            split_path = self.feature_directory / split

            if not split_path.exists():
                continue

            print(f"\nLoading {split}...")

            for file in sorted(split_path.glob("*.npy")):

                feature_vector = np.load(file)

                features.append(feature_vector)

                self.sequence_names.append(file.stem)

        self.X = np.asarray(features, dtype=np.float32)

        print("\n===================================")
        print("Thermal Dataset Loaded")
        print("===================================")
        print(f"Sequences : {len(self.X)}")
        print(f"Features  : {self.X.shape[1]}")
        print("===================================")

    # =====================================================
    # Get Features
    # =====================================================

    def get_features(self):

        if self.X is None:
            raise RuntimeError(
                "Dataset not loaded. Call load_dataset() first."
            )

        return self.X

    # =====================================================
    # Get Sequence Names
    # =====================================================

    def get_sequence_names(self):

        return self.sequence_names

    # =====================================================
    # Summary
    # =====================================================

    def summary(self):

        print("\n========== Thermal Model ==========")
        print(f"Total Sequences : {len(self.X)}")
        print(f"Feature Size    : {self.X.shape[1]}")
        print("===================================")


if __name__ == "__main__":

    model = ThermalModel()

    model.load_dataset()

    model.summary()