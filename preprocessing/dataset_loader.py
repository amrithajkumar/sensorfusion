from pathlib import Path


class DatasetLoader:
    """
    Dataset Loader for the Quantum Sensor Fusion Project.

    Responsibilities:
    -----------------
    1. Verify dataset structure.
    2. Count dataset files.
    3. Return thermal infrared videos.
    4. Return acoustic audio files.
    5. Return radar point cloud files.
    """

    def __init__(self, dataset_root="datasets"):

        self.dataset_root = Path(dataset_root)

        # Thermal Dataset
        self.thermal_path = (
            self.dataset_root /
            "thermal" /
            "raw" /
            "archive"
        )

        # Acoustic Dataset
        self.acoustic_path = (
            self.dataset_root /
            "acoustic" /
            "raw" /
            "archive (1)"
        )

        # Radar Dataset
        self.radar_path = (
            self.dataset_root /
            "radar" /
            "raw" /
            "Mavic2"
        )

    # ==========================================================
    # Verify Dataset Structure
    # ==========================================================

    def verify_structure(self):

        print("\nChecking dataset structure...\n")

        paths = {
            "Thermal": self.thermal_path,
            "Acoustic": self.acoustic_path,
            "Radar": self.radar_path,
        }

        for name, path in paths.items():

            if path.exists():
                print(f"✅ {name} dataset found")
                print(f"   {path}")

            else:
                print(f"❌ {name} dataset NOT found")
                print(f"   Expected: {path}")

    # ==========================================================
    # Dataset Statistics
    # ==========================================================

    def count_files(self):

        thermal_files = [
            file
            for file in self.thermal_path.rglob("*")
            if file.is_file()
        ]

        acoustic_files = [
            file
            for file in self.acoustic_path.rglob("*")
            if file.is_file()
        ]

        radar_files = [
            file
            for file in self.radar_path.rglob("*.npy")
        ]

        print("\n" + "=" * 50)
        print("DATASET SUMMARY")
        print("=" * 50)

        print(f"Thermal Files : {len(thermal_files)}")
        print(f"Acoustic Files: {len(acoustic_files)}")
        print(f"Radar Files   : {len(radar_files)}")

        print("=" * 50)

    # ==========================================================
    # Thermal Dataset
    # ==========================================================

    def get_thermal_videos(self):
        """
        Returns all infrared thermal videos.
        """

        return sorted(
            self.thermal_path.rglob("infrared.mp4")
        )

    # ==========================================================
    # Acoustic Dataset
    # ==========================================================

    def get_acoustic_files(self):
        """
        Returns all supported audio files.
        """

        audio_files = []

        extensions = [
            "*.wav",
            "*.mp3",
            "*.flac"
        ]

        for extension in extensions:
            audio_files.extend(
                self.acoustic_path.rglob(extension)
            )

        return sorted(audio_files)

    # ==========================================================
    # Radar Dataset
    # ==========================================================

    def get_radar_files(self):
        """
        Returns all radar point cloud (.npy) files.
        """

        return sorted(
            self.radar_path.rglob("*.npy")
        )


# ==============================================================
# Testing
# ==============================================================

if __name__ == "__main__":

    loader = DatasetLoader()

    loader.verify_structure()

    loader.count_files()

    thermal_videos = loader.get_thermal_videos()
    acoustic_files = loader.get_acoustic_files()
    radar_files = loader.get_radar_files()

    print("\n" + "=" * 50)
    print("DATASET INFORMATION")
    print("=" * 50)

    print(f"Thermal Videos : {len(thermal_videos)}")
    print(f"Acoustic Files : {len(acoustic_files)}")
    print(f"Radar Files    : {len(radar_files)}")

    if thermal_videos:
        print("\nFirst Thermal Video:")
        print(thermal_videos[0])

    if acoustic_files:
        print("\nFirst Acoustic File:")
        print(acoustic_files[0])

    if radar_files:
        print("\nFirst Radar File:")
        print(radar_files[0])

    print("\nDataset Loader test completed successfully!")