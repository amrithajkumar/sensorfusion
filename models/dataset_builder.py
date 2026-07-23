"""
===========================================================
Dataset Builder

Creates the final Machine Learning dataset.

Input:
    datasets/fusion/features/*.npy

Output:
    datasets/fusion/X.npy
    datasets/fusion/y.npy

===========================================================
"""

from pathlib import Path

import numpy as np

from tqdm import tqdm


class DatasetBuilder:

    def __init__(self):

        self.feature_directory = Path(
            "datasets/fusion/features"
        )

        self.output_directory = Path(
            "datasets/fusion"
        )

        self.output_directory.mkdir(
            parents=True,
            exist_ok=True
        )

    # ----------------------------------------

    def discover_files(self):

        return sorted(

            self.feature_directory.rglob("*.npy")

        )

    # ----------------------------------------

    def load_features(self):

        files = self.discover_files()

        features = []

        print("\nLoading Fusion Features...\n")

        for file in tqdm(files):

            feature = np.load(file)

            features.append(feature)

        return np.array(features, dtype=np.float32)
        # ----------------------------------------
    # Generate Labels
    # ----------------------------------------

    def generate_labels(self, num_samples):

        """
        Baseline binary labels.

        1 -> Drone
        0 -> Unknown

        For the prototype we create a balanced dataset.
        """

        rng = np.random.default_rng(42)

        labels = rng.integers(

            low=0,

            high=2,

            size=num_samples

        )

        return labels.astype(np.int32)

    # ----------------------------------------
    # Save Dataset
    # ----------------------------------------

    def save_dataset(self, features, labels):

        feature_file = self.output_directory / "X.npy"

        label_file = self.output_directory / "y.npy"

        np.save(

            feature_file,

            features

        )

        np.save(

            label_file,

            labels

        )

        print("\nDataset Saved Successfully")

        print(f"Features : {feature_file}")

        print(f"Labels   : {label_file}")

    # ----------------------------------------
    # Build Dataset
    # ----------------------------------------

    def build(self):

        features = self.load_features()

        labels = self.generate_labels(

            len(features)

        )

        print("\nDataset Statistics")

        print("-----------------------")

        print(f"Samples  : {len(features)}")

        print(f"Features : {features.shape}")

        print(f"Labels   : {labels.shape}")

        self.save_dataset(

            features,

            labels

        )

        return features, labels

def main():

    builder = DatasetBuilder()

    builder.build()


if __name__ == "__main__":

    main()
    