"""
===========================================================
Feature Manager

Loads and manages feature datasets for:

1. Thermal
2. Acoustic
3. Radar
4. Fusion

Provides a unified interface for model training.

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import numpy as np


class FeatureManager:

    def __init__(self):

        # ==========================================
        # Feature Directories
        # ==========================================

        self.thermal_directory = Path(
            "datasets/thermal/sequence_features"
        )

        self.acoustic_directory = Path(
            "datasets/acoustic/features"
        )

        self.radar_directory = Path(
            "datasets/radar/features"
        )

        self.fusion_directory = Path(
            "datasets/fusion/features"
        )

    # ==========================================
    # Discover Feature Files
    # ==========================================

    def discover_files(self, directory):

        return sorted(

            directory.rglob("*.npy")

        )

    # ==========================================
    # Load Dataset
    # ==========================================

    def load_dataset(self, directory):

        files = self.discover_files(directory)

        features = []

        for file in files:

            try:

                feature = np.load(file)

                features.append(feature)

            except Exception as error:

                print(f"Failed: {file.name}")

                print(error)

        return np.array(features, dtype=np.float32)

    # ==========================================
    # Dataset Summary
    # ==========================================

    def dataset_summary(self, name, data):

        print(f"{name}")

        print(f"Samples    : {len(data)}")

        print(f"Shape      : {data.shape}")

        print()

        # ==========================================
    # Load Thermal Features
    # ==========================================

    def load_thermal(self):

        thermal = self.load_dataset(

            self.thermal_directory

        )

        self.dataset_summary(

            "Thermal Features",

            thermal

        )

        return thermal

    # ==========================================
    # Load Acoustic Features
    # ==========================================

    def load_acoustic(self):

        acoustic = self.load_dataset(

            self.acoustic_directory

        )

        self.dataset_summary(

            "Acoustic Features",

            acoustic

        )

        return acoustic

    # ==========================================
    # Load Radar Features
    # ==========================================

    def load_radar(self):

        radar = self.load_dataset(

            self.radar_directory

        )

        self.dataset_summary(

            "Radar Features",

            radar

        )

        return radar

    # ==========================================
    # Load Fusion Features
    # ==========================================

    def load_fusion(self):

        fusion = self.load_dataset(

            self.fusion_directory

        )

        self.dataset_summary(

            "Fusion Features",

            fusion

        )

        return fusion

    # ==========================================
    # Load All Datasets
    # ==========================================

    def load_all(self):

        datasets = {

            "thermal": self.load_thermal(),

            "acoustic": self.load_acoustic(),

            "radar": self.load_radar(),

            "fusion": self.load_fusion()

        }

        return datasets

        # ==========================================
    # Validate Dataset
    # ==========================================

    def validate_dataset(self, name, data):

        if data.size == 0:

            raise ValueError(

                f"{name} dataset is empty."

            )

        if np.isnan(data).any():

            raise ValueError(

                f"{name} contains NaN values."

            )

        print(f"{name} validation passed.")

    # ==========================================
    # Validate All Datasets
    # ==========================================

    def validate_all(self, datasets):

        for name, data in datasets.items():

            self.validate_dataset(

                name,

                data

            )

        print("\nAll datasets are valid.\n")

    # ==========================================
# Main
# ==========================================

def main():

    manager = FeatureManager()

    datasets = manager.load_all()

    manager.validate_all(datasets)

    print("Feature Manager Ready.")


if __name__ == "__main__":

    main()