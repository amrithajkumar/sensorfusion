"""
===========================================================
Radar Point Cloud Feature Extraction

Extracts handcrafted features from radar point clouds.

Input
-----
Nx3 NumPy array

Columns:
X
Y
Z

Features
--------
1. Basic Statistics
2. Spatial Range
3. Distance Statistics
4. Covariance Matrix
5. Bounding Box
6. Density

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import numpy as np

from feature_extraction.base_extractor import BaseFeatureExtractor


class RadarFeatureExtractor(BaseFeatureExtractor):

    def __init__(self):

        super().__init__(

            input_directory=Path(
                "datasets/radar/processed"
            ),

            output_directory=Path(
                "datasets/radar/features"
            ),

            file_extensions=(

                ".npy",

            )

        )

    # =====================================================
    # Load Point Cloud
    # =====================================================

    def load_point_cloud(self, file_path):

        points = np.load(file_path)

        if points.ndim != 2 or points.shape[1] != 3:

            raise ValueError(

                f"Expected Nx3 point cloud, got {points.shape}"

            )

        return points

    # =====================================================
    # Basic Statistics
    # =====================================================

    def basic_statistics(self, points):

        mean = np.mean(points, axis=0)

        std = np.std(points, axis=0)

        minimum = np.min(points, axis=0)

        maximum = np.max(points, axis=0)

        return np.concatenate(

            [

                mean,

                std,

                minimum,

                maximum

            ]

        )

    # =====================================================
    # Spatial Range
    # =====================================================

    def spatial_range(self, points):

        minimum = np.min(points, axis=0)

        maximum = np.max(points, axis=0)

        return maximum - minimum

    # =====================================================
    # Distance Statistics
    # =====================================================

    def distance_statistics(self, points):

        distance = np.linalg.norm(

            points,

            axis=1

        )

        return np.array(

            [

                np.mean(distance),

                np.std(distance),

                np.min(distance),

                np.max(distance)

            ]

        )

    # =====================================================
    # Covariance Features
    # =====================================================

    def covariance_features(self, points):

        covariance = np.cov(

            points.T

        )

        return covariance.flatten()
        # =====================================================
    # Bounding Box Features
    # =====================================================

    def bounding_box_features(self, points):

        minimum = np.min(points, axis=0)

        maximum = np.max(points, axis=0)

        dimensions = maximum - minimum

        volume = np.prod(dimensions)

        return np.concatenate(

            [

                dimensions,

                np.array([volume])

            ]

        )

    # =====================================================
    # Density Feature
    # =====================================================

    def density_feature(self, points):

        minimum = np.min(points, axis=0)

        maximum = np.max(points, axis=0)

        dimensions = maximum - minimum

        volume = np.prod(dimensions)

        if volume <= 1e-8:

            density = 0.0

        else:

            density = len(points) / volume

        return np.array(

            [

                len(points),

                density

            ]

        )

    # =====================================================
    # Extract Features
    # =====================================================

    def extract_features(self, file_path):

        points = self.load_point_cloud(file_path)

        feature_vector = np.concatenate(

            [

                self.basic_statistics(points),

                self.spatial_range(points),

                self.distance_statistics(points),

                self.covariance_features(points),

                self.bounding_box_features(points),

                self.density_feature(points)

            ]

        )

        return feature_vector.astype(np.float32)


# =========================================================
# Main
# =========================================================

if __name__ == "__main__":

    extractor = RadarFeatureExtractor()

    statistics = extractor.run()

    print("\nExtraction Summary")
    print("-" * 30)
    print(f"Processed : {statistics['processed']}")
    print(f"Successful: {statistics['success']}")
    print(f"Failed    : {statistics['failed']}")