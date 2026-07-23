"""
===========================================================
Multi-Sensor Feature Fusion

Loads handcrafted features from:

1. Thermal
2. Acoustic
3. Radar

Performs:
- Standardization
- PCA
- Feature Fusion

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import numpy as np

from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

from tqdm import tqdm


class FeatureFusion:

    def __init__(self):

        # ==============================
        # Input Directories
        # ==============================

        self.thermal_directory = Path(
            "datasets/thermal/sequence_features"
        )

        self.acoustic_directory = Path(
            "datasets/acoustic/features"
        )

        self.radar_directory = Path(
            "datasets/radar/features"
        )

        # ==============================
        # Output Directory
        # ==============================

        self.output_directory = Path(
            "datasets/fusion/features"
        )

        self.output_directory.mkdir(
            parents=True,
            exist_ok=True
        )

        # ==============================
        # Scalers
        # ==============================

        self.thermal_scaler = StandardScaler()

        self.acoustic_scaler = StandardScaler()

        self.radar_scaler = StandardScaler()

        # ==============================
        # PCA
        # ==============================

        self.thermal_pca = PCA(
            n_components=64,
            random_state=42
        )

        self.acoustic_pca = PCA(
            n_components=64,
            random_state=42
        )

    # =====================================================
    # Discover Feature Files
    # =====================================================

    def discover_files(self, directory):

        return sorted(

            directory.rglob("*.npy")

        )

    # =====================================================
    # Load Features
    # =====================================================

    def load_features(self, files):

        features = []

        valid_files = []

        for file in files:

            try:

                feature = np.load(file)

                features.append(feature)

                valid_files.append(file)

            except Exception:

                continue

        return np.array(features), valid_files
        # =====================================================
    # Normalize Features
    # =====================================================

    def normalize_features(self, features, scaler):

        normalized = scaler.fit_transform(features)

        return normalized

    # =====================================================
    # PCA Reduction
    # =====================================================

    def reduce_dimensions(self, features, pca):

        n_samples, n_features = features.shape

        components = min(

            pca.n_components,

            n_samples,

            n_features

        )

        if components < 1:

            raise ValueError(

                "Not enough samples for PCA."

            )

        reducer = PCA(

            n_components=components,

            random_state=42

        )

        reduced = reducer.fit_transform(features)

        return reduced

    # =====================================================
    # Process One Modality
    # =====================================================

    def process_modality(

        self,

        files,

        scaler,

        pca=None

    ):

        features, valid_files = self.load_features(files)

        if len(features) == 0:

            raise ValueError(

                "No valid feature files found."

            )

        normalized = self.normalize_features(

            features,

            scaler

        )

        if pca is not None:

            processed = self.reduce_dimensions(

                normalized,

                pca

            )

        else:

            processed = normalized

        return processed, valid_files

    # =====================================================
    # Display Information
    # =====================================================

    def print_statistics(

        self,

        thermal,

        acoustic,

        radar

    ):

        print("\n========== Feature Statistics ==========")

        print(f"Thermal  : {thermal.shape}")

        print(f"Acoustic : {acoustic.shape}")

        print(f"Radar    : {radar.shape}")

        print("========================================\n")

        # =====================================================
    # Create Synthetic Fusion Dataset
    # =====================================================

    def create_fusion_dataset(

        self,

        thermal,

        acoustic,

        radar,

        samples=1000

    ):

        rng = np.random.default_rng(42)

        fused_features = []

        for _ in tqdm(

            range(samples),

            desc="Creating Fusion Dataset"

        ):

            thermal_index = rng.integers(

                len(thermal)

            )

            acoustic_index = rng.integers(

                len(acoustic)

            )

            radar_index = rng.integers(

                len(radar)

            )

            fused_vector = np.concatenate(

                [

                    thermal[thermal_index],

                    acoustic[acoustic_index],

                    radar[radar_index]

                ]

            )

            fused_features.append(

                fused_vector

            )

        return np.array(

            fused_features,

            dtype=np.float32

        )

    # =====================================================
    # Save Fusion Dataset
    # =====================================================

    def save_fusion_dataset(

        self,

        fused_features

    ):

        for index, feature in enumerate(

            fused_features

        ):

            output_file = (

                self.output_directory /

                f"fusion_{index:05d}.npy"

            )

            np.save(

                output_file,

                feature

            )

        print(

            f"\nSaved {len(fused_features)} fused samples."

        )

        # =====================================================
    # Complete Fusion Pipeline
    # =====================================================

    def run(self):

        print("\n========================================")
        print(" Multi-Sensor Feature Fusion")
        print("========================================\n")

        # Discover files
        thermal_files = self.discover_files(
            self.thermal_directory
        )

        acoustic_files = self.discover_files(
            self.acoustic_directory
        )

        radar_files = self.discover_files(
            self.radar_directory
        )

        print(f"Thermal Files : {len(thermal_files)}")
        print(f"Acoustic Files: {len(acoustic_files)}")
        print(f"Radar Files   : {len(radar_files)}\n")

        # Process thermal
        thermal_features, _ = self.process_modality(
            thermal_files,
            self.thermal_scaler,
            self.thermal_pca
        )

        # Process acoustic
        acoustic_features, _ = self.process_modality(
            acoustic_files,
            self.acoustic_scaler,
            self.acoustic_pca
        )

        # Process radar
        radar_features, _ = self.process_modality(
            radar_files,
            self.radar_scaler,
            None
        )

        self.print_statistics(
            thermal_features,
            acoustic_features,
            radar_features
        )

        # Create fusion dataset
        fused_features = self.create_fusion_dataset(
            thermal_features,
            acoustic_features,
            radar_features,
            samples=1000
        )

        print(f"Fusion Shape: {fused_features.shape}")

        self.save_fusion_dataset(
            fused_features
        )

        print("\nFusion Completed Successfully!")

        return fused_features


# =====================================================
# Main
# =====================================================

def main():

    fusion = FeatureFusion()

    fusion.run()


if __name__ == "__main__":

    main()