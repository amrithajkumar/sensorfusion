from pathlib import Path
import numpy as np

from preprocessing.dataset_loader import DatasetLoader
from preprocessing.utils import create_directory


class RadarPreprocessor:
    """
    Radar Point Cloud Preprocessing

    Pipeline
    --------
    1. Load radar point cloud (.npy)
    2. Remove invalid values
    3. Convert float64 -> float32
    4. Normalize point cloud
    5. Save processed point cloud
    """

    def __init__(self):

        self.loader = DatasetLoader()

        # Output directory
        self.output_path = (
            Path("datasets")
            / "radar"
            / "processed"
            / "Mavic2"
        )

        create_directory(self.output_path)

    # ==========================================================
    # Find Radar Files
    # ==========================================================

    def find_radar_files(self):

        radar_files = self.loader.get_radar_files()

        print(f"\nRadar Files Found : {len(radar_files)}")

        return radar_files

    # ==========================================================
    # Normalize Point Cloud
    # ==========================================================

    def normalize_points(self, points):

        if len(points) == 0:
            return points

        # Center around origin
        centroid = np.mean(points, axis=0)
        points = points - centroid

        # Scale into unit sphere
        scale = np.max(np.linalg.norm(points, axis=1))

        if scale > 0:
            points = points / scale

        return points

    # ==========================================================
    # Process Single File
    # ==========================================================

    def process_file(self, file_path):

        try:

            points = np.load(file_path)

            # Remove NaN / Inf
            mask = np.isfinite(points).all(axis=1)
            points = points[mask]

            # Convert datatype
            points = points.astype(np.float32)

            # Normalize
            points = self.normalize_points(points)

            output_file = self.output_path / file_path.name

            np.save(output_file, points)

            print(
                f"Processed: {file_path.name} "
                f"({points.shape[0]} points)"
            )

        except Exception as error:

            print(f"Error processing {file_path.name}")
            print(error)

    # ==========================================================
    # Process Dataset
    # ==========================================================

    def process_dataset(self):

        radar_files = self.find_radar_files()

        print("\nProcessing Radar Dataset...\n")

        for index, file in enumerate(radar_files, start=1):

            self.process_file(file)

            if index % 500 == 0:
                print(f"\nProcessed {index}/{len(radar_files)} files...\n")

    # ==========================================================
    # Run
    # ==========================================================

    def run(self):

        print("\n" + "=" * 60)
        print("RADAR PREPROCESSING")
        print("=" * 60)

        self.process_dataset()

        print("\nRadar preprocessing completed successfully!")
        print("=" * 60)


# ==============================================================
# Main
# ==============================================================

if __name__ == "__main__":

    processor = RadarPreprocessor()
    processor.run()