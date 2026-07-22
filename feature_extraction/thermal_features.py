"""
===========================================================
Thermal Feature Extractor

This module extracts handcrafted features from thermal
images for the Quantum Sensor Fusion Project.

Extracted Features
------------------
1. Intensity Statistics
2. Histogram Features
3. GLCM Texture Features
4. Local Binary Pattern (LBP)
5. Edge Density
6. Shannon Entropy

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import cv2
import numpy as np

from skimage.feature import (
    graycomatrix,
    graycoprops,
    local_binary_pattern
)

from skimage.measure import shannon_entropy

from feature_extraction.base_extractor import (
    BaseFeatureExtractor
)


class ThermalFeatureExtractor(BaseFeatureExtractor):
    """
    Feature extractor for thermal images.
    """

    def __init__(self):

        super().__init__(
            input_directory=Path("datasets/thermal/processed"),
            output_directory=Path("datasets/thermal/features"),
            file_extensions=(".jpg", ".jpeg", ".png")
        )

    # =====================================================
    # Read Image
    # =====================================================

    def read_image(self, image_path: Path):

        image = cv2.imread(
            str(image_path),
            cv2.IMREAD_GRAYSCALE
        )

        if image is None:
            raise ValueError(
                f"Cannot read image : {image_path}"
            )

        return image

    # =====================================================
    # Intensity Features
    # =====================================================

    def intensity_features(self, image):

        return np.array([

            np.mean(image),

            np.std(image),

            np.min(image),

            np.max(image)

        ])

    # =====================================================
    # Histogram Features
    # =====================================================

    def histogram_features(self, image):

        histogram = cv2.calcHist(

            [image],

            [0],

            None,

            [16],

            [0, 256]

        )

        histogram = cv2.normalize(
            histogram,
            histogram
        )

        return histogram.flatten()

    # =====================================================
    # GLCM Features
    # =====================================================

    def glcm_features(self, image):

        glcm = graycomatrix(

            image,

            distances=[1],

            angles=[0],

            symmetric=True,

            normed=True

        )

        contrast = graycoprops(
            glcm,
            "contrast"
        )[0, 0]

        homogeneity = graycoprops(
            glcm,
            "homogeneity"
        )[0, 0]

        energy = graycoprops(
            glcm,
            "energy"
        )[0, 0]

        correlation = graycoprops(
            glcm,
            "correlation"
        )[0, 0]

        return np.array([

            contrast,

            homogeneity,

            energy,

            correlation

        ])

    # =====================================================
    # LBP Features
    # =====================================================

    def lbp_features(self, image):

        radius = 2

        points = radius * 8

        lbp = local_binary_pattern(

            image,

            points,

            radius,

            method="uniform"

        )

        histogram, _ = np.histogram(

            lbp.ravel(),

            bins=np.arange(0, points + 3),

            range=(0, points + 2)

        )

        histogram = histogram.astype(np.float32)

        histogram /= (

            histogram.sum() + 1e-8

        )

        return histogram

    # =====================================================
    # Edge Density
    # =====================================================

    def edge_density(self, image):

        edges = cv2.Canny(

            image,

            100,

            200

        )

        density = np.sum(

            edges > 0

        ) / edges.size

        return np.array([density])

    # =====================================================
    # Entropy
    # =====================================================

    def entropy_feature(self, image):

        entropy = shannon_entropy(image)

        return np.array([entropy])
        # =====================================================
    # Extract Complete Feature Vector
    # =====================================================

    def extract_features(self, input_file: Path):
        """
        Extract complete feature vector from a thermal image.
        """

        image = self.read_image(input_file)

        intensity = self.intensity_features(image)

        histogram = self.histogram_features(image)

        glcm = self.glcm_features(image)

        lbp = self.lbp_features(image)

        edges = self.edge_density(image)

        entropy = self.entropy_feature(image)

        feature_vector = np.concatenate([

            intensity,

            histogram,

            glcm,

            lbp,

            edges,

            entropy

        ])

        feature_vector = feature_vector.astype(np.float32)

        return feature_vector


# ==========================================================
# Main
# ==========================================================

if __name__ == "__main__":

    extractor = ThermalFeatureExtractor()

    statistics = extractor.run()

    print("\nExtraction Summary")

    print("-------------------------------")

    print(
        f"Processed : {statistics['processed']}"
    )

    print(
        f"Successful: {statistics['success']}"
    )

    print(
        f"Failed    : {statistics['failed']}"
    )