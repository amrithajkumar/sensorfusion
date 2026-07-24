"""
===========================================================
Radar FMCW Feature Extraction

Extract handcrafted radar features from the
SAAB SIRS 77GHz FMCW Radar Dataset.

Output:
    X.npy
    y.npy

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import numpy as np


# ==========================================================
# Helper Functions
# ==========================================================

def calculate_skew(values):

    mean = np.mean(values)
    std = np.std(values)

    if std == 0:
        return 0.0

    return np.mean(((values - mean) / std) ** 3)


def calculate_kurtosis(values):

    mean = np.mean(values)
    std = np.std(values)

    if std == 0:
        return 0.0

    return np.mean(((values - mean) / std) ** 4) - 3


def calculate_entropy(values):

    histogram, _ = np.histogram(
        values,
        bins=64,
        density=True
    )

    histogram += 1e-10

    histogram /= histogram.sum()

    return -np.sum(histogram * np.log2(histogram))


# ==========================================================
# Radar Feature Extractor
# ==========================================================

class RadarFeatureExtractor:

    def __init__(self):

        self.dataset_path = Path(
            "datasets/radar/raw/data_SAAB_SIRS_77GHz_FMCW.npy"
        )

        self.output_directory = Path(
            "datasets/radar/features"
        )

        self.output_directory.mkdir(
            parents=True,
            exist_ok=True
        )

    # ==========================================================
    # Load Dataset
    # ==========================================================

    def load_dataset(self):

        print("Loading radar dataset...")

        dataset = np.load(
            self.dataset_path,
            allow_pickle=True
        )

        print(f"Loaded {len(dataset)} radar samples")

        return dataset


    # ==========================================================
    # Load One Sample
    # ==========================================================

    @staticmethod
    def load_radar_sample(sample):

        label = str(sample[0][0])

        radar_matrix = np.asarray(sample[1])

        return label, radar_matrix


    # ==========================================================
    # Convert Labels
    # ==========================================================

    @staticmethod
    def convert_label(label):

        label = label.strip()

        if label.startswith("D"):
            return 1

        return 0


    # ==========================================================
    # Downsample Radar Matrix
    # ==========================================================

    @staticmethod
    def preprocess_radar(radar_matrix):

        # Convert complex values to magnitude
        magnitude = np.abs(radar_matrix)

        # Downsample for faster processing
        magnitude = magnitude[::10, ::10]

        return magnitude.astype(np.float32)
        # ==========================================================
    # Statistical Features
    # ==========================================================

    def statistical_features(self, magnitude):

        values = magnitude.flatten()

        features = np.array([

            np.mean(values),

            np.std(values),

            np.var(values),

            np.min(values),

            np.max(values),

            np.median(values),

            np.percentile(values, 25),

            np.percentile(values, 75)

        ], dtype=np.float32)

        return features


    # ==========================================================
    # Energy Features
    # ==========================================================

    def energy_features(self, magnitude):

        values = magnitude.flatten()

        energy = np.sum(values ** 2)

        rms = np.sqrt(np.mean(values ** 2))

        peak = np.max(values)

        peak_to_peak = np.ptp(values)

        features = np.array([

            energy,

            rms,

            peak,

            peak_to_peak

        ], dtype=np.float32)

        return features
        # ==========================================================
    # Distribution Features
    # ==========================================================

    def distribution_features(self, magnitude):

        values = magnitude.flatten()

        features = np.array([

            calculate_skew(values),

            calculate_kurtosis(values),

            calculate_entropy(values)

        ], dtype=np.float32)

        return features


    # ==========================================================
    # FFT Features
    # ==========================================================

    def fft_features(self, magnitude):

        values = magnitude.flatten()

        fft_values = np.abs(np.fft.rfft(values))

        dominant_frequency = np.argmax(fft_values)

        features = np.array([

            np.mean(fft_values),

            np.max(fft_values),

            dominant_frequency

        ], dtype=np.float32)

        return features


    # ==========================================================
    # Extract Complete Feature Vector
    # ==========================================================

    def extract_features(self, radar_matrix):

        # Convert complex radar values to magnitude
        magnitude = self.preprocess_radar(radar_matrix)

        statistical = self.statistical_features(
            magnitude
        )

        energy = self.energy_features(
            magnitude
        )

        distribution = self.distribution_features(
            magnitude
        )

        fft = self.fft_features(
            magnitude
        )

        feature_vector = np.concatenate([

            statistical,

            energy,

            distribution,

            fft

        ])

        return feature_vector.astype(np.float32)
        # ==========================================================
    # Process Entire Dataset
    # ==========================================================

    def process_dataset(self):

        dataset = self.load_dataset()

        feature_matrix = []
        labels = []

        print("\nExtracting radar features...\n")

        total = len(dataset)

        for index, sample in enumerate(dataset):

            try:

                label, radar_matrix = self.load_radar_sample(sample)

                features = self.extract_features(radar_matrix)

                feature_matrix.append(features)

                labels.append(
                    self.convert_label(label)
                )

                print(
                    f"[{index + 1:03d}/{total}] "
                    f"{label:<20} ✓"
                )

            except Exception as error:

                print(
                    f"[{index + 1:03d}/{total}] "
                    f"Failed : {error}"
                )

        X = np.asarray(
            feature_matrix,
            dtype=np.float32
        )

        y = np.asarray(
            labels,
            dtype=np.int32
        )

        return X, y


    # ==========================================================
    # Save Features
    # ==========================================================

    def save_features(self, X, y):

        X_path = self.output_directory / "X.npy"
        y_path = self.output_directory / "y.npy"

        np.save(X_path, X)
        np.save(y_path, y)

        print("\n===================================")
        print("Features Saved Successfully")
        print("===================================")

        print(f"Feature Matrix : {X.shape}")
        print(f"Labels         : {y.shape}")

        print(f"\nSaved X -> {X_path}")
        print(f"Saved y -> {y_path}")

        # ==========================================================
    # Run Feature Extraction
    # ==========================================================

    def run(self):

        X, y = self.process_dataset()

        self.save_features(X, y)

        print("\n===================================")
        print("Radar Feature Extraction Complete")
        print("===================================")

        print(f"Total Samples      : {len(X)}")
        print(f"Features / Sample  : {X.shape[1]}")
        print(f"Drone Samples      : {int(np.sum(y))}")
        print(f"Non-Drone Samples  : {int(len(y) - np.sum(y))}")

        return {

            "processed": int(len(X)),
            "features": int(X.shape[1]),
            "drone": int(np.sum(y)),
            "non_drone": int(len(y) - np.sum(y))

        }


# ==========================================================
# Main
# ==========================================================

if __name__ == "__main__":

    extractor = RadarFeatureExtractor()

    statistics = extractor.run()

    print("\n===================================")
    print("Extraction Summary")
    print("===================================")

    for key, value in statistics.items():

        print(f"{key:<15}: {value}")