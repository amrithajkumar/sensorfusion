"""
===========================================================
Base Feature Extractor

This module provides the common functionality shared by all
feature extraction modules in the Quantum Sensor Fusion Project.

Responsibilities
----------------
1. Discover input files
2. Create output directories
3. Save extracted feature vectors
4. Configure logging
5. Preserve dataset folder structure
6. Process complete datasets
7. Display extraction progress

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
from abc import ABC, abstractmethod
import logging

import numpy as np
from tqdm import tqdm

from preprocessing.utils import create_directory


class BaseFeatureExtractor(ABC):
    """
    Abstract Base Class for all feature extractors.

    Child Classes
    -------------
    - ThermalFeatureExtractor
    - AcousticFeatureExtractor
    - RadarFeatureExtractor

    Child classes only need to implement:

        extract_features(input_file)

    Everything else is handled automatically.
    """

    def __init__(
        self,
        input_directory: Path,
        output_directory: Path,
        file_extensions: tuple,
    ):

        self.input_directory = Path(input_directory)
        self.output_directory = Path(output_directory)
        self.file_extensions = file_extensions

        create_directory(self.output_directory)

        self.logger = self._configure_logger()

    # ==========================================================
    # Logger
    # ==========================================================

    def _configure_logger(self):
        """
        Configure console logger.
        """

        logger = logging.getLogger(self.__class__.__name__)

        if not logger.handlers:

            logger.setLevel(logging.INFO)

            formatter = logging.Formatter(
                "[%(levelname)s] %(message)s"
            )

            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)

            logger.addHandler(console_handler)

        return logger

    # ==========================================================
    # Discover Files
    # ==========================================================

    def discover_files(self):
        """
        Recursively discover all supported files.
        """

        files = []

        for extension in self.file_extensions:
            files.extend(
                self.input_directory.rglob(f"*{extension}")
            )

        files = sorted(files)

        self.logger.info(
            f"Discovered {len(files)} files."
        )

        return files

    # ==========================================================
    # Output Path
    # ==========================================================

    def get_output_path(self, input_file: Path):
        """
        Preserve folder structure while changing extension to .npy
        """

        relative_path = input_file.relative_to(
            self.input_directory
        )

        output_path = (
            self.output_directory /
            relative_path
        ).with_suffix(".npy")

        create_directory(output_path.parent)

        return output_path

    # ==========================================================
    # Save Feature Vector
    # ==========================================================

    def save_features(
        self,
        features: np.ndarray,
        output_path: Path,
    ):
        """
        Save feature vector as NumPy file.
        """

        np.save(output_path, features)

    # ==========================================================
    # Feature Extraction (Abstract)
    # ==========================================================

    @abstractmethod
    def extract_features(self, input_file: Path):
        """
        Extract feature vector from an input file.

        Must be implemented by child classes.
        """
        pass

    # ==========================================================
    # Process Single File
    # ==========================================================

    def process_file(self, input_file: Path):
        """
        Process a single input file.
        """

        try:

            features = self.extract_features(input_file)

            if features is None:

                self.logger.warning(
                    f"Skipping {input_file.name} (No features extracted)"
                )

                return False

            output_path = self.get_output_path(
                input_file
            )

            self.save_features(
                features,
                output_path,
            )

            return True

        except Exception as error:

            self.logger.error(
                f"{input_file.name} : {error}"
            )

            return False

    # ==========================================================
    # Run Complete Dataset
    # ==========================================================

    def run(self):
        """
        Process every supported file inside the dataset.

        Returns
        -------
        dict
            Statistics of extraction process.
        """

        files = self.discover_files()

        if len(files) == 0:

            self.logger.warning(
                "No supported files found."
            )

            return {
                "processed": 0,
                "success": 0,
                "failed": 0,
            }

        success = 0
        failed = 0

        self.logger.info("")
        self.logger.info("=" * 55)
        self.logger.info("Starting Feature Extraction")
        self.logger.info("=" * 55)

        for file in tqdm(
            files,
            desc="Extracting Features",
            unit="file",
        ):

            if self.process_file(file):
                success += 1
            else:
                failed += 1

        self.logger.info("")
        self.logger.info("=" * 55)
        self.logger.info("Feature Extraction Completed")
        self.logger.info("=" * 55)
        self.logger.info(f"Total Files : {len(files)}")
        self.logger.info(f"Successful : {success}")
        self.logger.info(f"Failed     : {failed}")
        self.logger.info("=" * 55)

        return {
            "processed": len(files),
            "success": success,
            "failed": failed,
        }