"""
===========================================================
Sequence Feature Aggregator

Aggregates frame-level feature vectors into a single
sequence-level feature vector.

Aggregation Methods
-------------------
1. Mean Pooling
2. Standard Deviation Pooling
3. Max Pooling

Output:
-------
44 Frame Features
        ↓
Mean (44)
Std  (44)
Max  (44)
        ↓
132-D Sequence Feature Vector

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import logging

import numpy as np
from tqdm import tqdm

from preprocessing.utils import create_directory


class SequenceAggregator:

    def __init__(self):

        self.input_directory = Path(
            "datasets/thermal/features"
        )

        self.output_directory = Path(
            "datasets/thermal/sequence_features"
        )

        create_directory(
            self.output_directory
        )

        self.logger = self._configure_logger()

    # =====================================================
    # Logger
    # =====================================================

    def _configure_logger(self):

        logger = logging.getLogger(
            self.__class__.__name__
        )

        if not logger.handlers:

            logger.setLevel(logging.INFO)

            formatter = logging.Formatter(
                "[%(levelname)s] %(message)s"
            )

            console = logging.StreamHandler()

            console.setFormatter(formatter)

            logger.addHandler(console)

        return logger

    # =====================================================
    # Discover Sequences
    # =====================================================

    def discover_sequences(self):
        """
        Every directory containing .npy files
        is treated as one video sequence.
        """

        sequences = []

        for folder in self.input_directory.rglob("*"):

            if not folder.is_dir():
                continue

            files = list(folder.glob("*.npy"))

            if len(files) > 0:

                sequences.append(folder)

        sequences = sorted(sequences)

        self.logger.info(
            f"Discovered {len(sequences)} sequences."
        )

        return sequences

    # =====================================================
    # Load Sequence
    # =====================================================

    def load_sequence(self, sequence_path: Path):
        """
        Load every feature vector from a sequence.
        """

        feature_files = sorted(

            sequence_path.glob("*.npy")

        )

        features = []

        for file in feature_files:

            vector = np.load(file)

            features.append(vector)

        if len(features) == 0:

            return None

        return np.vstack(features)

    # =====================================================
    # Mean Pooling
    # =====================================================

    def mean_pool(self, feature_matrix):

        return np.mean(
            feature_matrix,
            axis=0
        )

    # =====================================================
    # Standard Deviation Pooling
    # =====================================================

    def std_pool(self, feature_matrix):

        return np.std(
            feature_matrix,
            axis=0
        )

    # =====================================================
    # Max Pooling
    # =====================================================

    def max_pool(self, feature_matrix):

        return np.max(
            feature_matrix,
            axis=0
        )
        # =====================================================
    # Aggregate Sequence
    # =====================================================

    def aggregate_sequence(self, feature_matrix):
        """
        Create one sequence feature vector by concatenating:
        Mean + Std + Max
        """

        mean_features = self.mean_pool(feature_matrix)
        std_features = self.std_pool(feature_matrix)
        max_features = self.max_pool(feature_matrix)

        aggregated = np.concatenate(
            [
                mean_features,
                std_features,
                max_features
            ]
        )

        return aggregated.astype(np.float32)

    # =====================================================
    # Output Path
    # =====================================================

    def get_output_path(self, sequence_path: Path):
        """
        Preserve folder structure.

        Example:
        datasets/thermal/features/train/video1
                ↓
        datasets/thermal/sequence_features/train/video1.npy
        """

        relative_path = sequence_path.relative_to(
            self.input_directory
        )

        output_path = (
            self.output_directory /
            relative_path
        ).with_suffix(".npy")

        create_directory(output_path.parent)

        return output_path

    # =====================================================
    # Process One Sequence
    # =====================================================

    def process_sequence(self, sequence_path: Path):

        try:

            feature_matrix = self.load_sequence(sequence_path)

            if feature_matrix is None:

                return False

            aggregated_vector = self.aggregate_sequence(
                feature_matrix
            )

            output_path = self.get_output_path(
                sequence_path
            )

            np.save(
                output_path,
                aggregated_vector
            )

            return True

        except Exception as error:

            self.logger.error(
                f"{sequence_path} -> {error}"
            )

            return False

    # =====================================================
    # Run
    # =====================================================

    def run(self):

        sequences = self.discover_sequences()

        processed = 0
        success = 0
        failed = 0

        self.logger.info("")
        self.logger.info("=" * 55)
        self.logger.info("Starting Sequence Aggregation")
        self.logger.info("=" * 55)

        for sequence in tqdm(
            sequences,
            desc="Aggregating Sequences",
            unit="sequence"
        ):

            processed += 1

            if self.process_sequence(sequence):

                success += 1

            else:

                failed += 1

        self.logger.info("")
        self.logger.info("=" * 55)
        self.logger.info("Sequence Aggregation Completed")
        self.logger.info("=" * 55)
        self.logger.info(f"Total Sequences : {processed}")
        self.logger.info(f"Successful      : {success}")
        self.logger.info(f"Failed          : {failed}")
        self.logger.info("=" * 55)

        return {
            "processed": processed,
            "success": success,
            "failed": failed
        }


# =========================================================
# Main
# =========================================================

if __name__ == "__main__":

    aggregator = SequenceAggregator()

    statistics = aggregator.run()

    print("\nAggregation Summary")
    print("-" * 30)
    print(f"Processed : {statistics['processed']}")
    print(f"Successful: {statistics['success']}")
    print(f"Failed    : {statistics['failed']}")