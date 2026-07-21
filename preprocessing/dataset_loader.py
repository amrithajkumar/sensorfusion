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
    5. Return radar files.
    """

    def __init__(self, dataset_root="datasets"):

        self.dataset_root = Path(dataset_root)

        self.thermal_path = self.dataset_root / "thermal" / "raw"/ "archive"
        self.acoustic_path = self.dataset_root / "acoustic" / "raw"/ "archive (1)"
        self.radar_path = self.dataset_root / "radar" / "raw"/ "Mavic2"

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

        thermal_files = list(self.thermal_path.rglob("*"))
        acoustic_files = list(self.acoustic_path.rglob("*"))
        radar_files = list(self.radar_path.rglob("*"))

        print("\nDataset Summary")
        print("-" * 45)

        print(f"Thermal files : {len(thermal_files)}")
        print(f"Acoustic files: {len(acoustic_files)}")
        print(f"Radar files   : {len(radar_files)}")

    # ==========================================================
    # Thermal Dataset
    # ==========================================================

    def get_thermal_videos(self):
        """
        Returns all infrared thermal videos.
        """

        videos = sorted(self.thermal_path.rglob("infrared.mp4"))

        return videos

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

        for ext in extensions:
            audio_files.extend(self.acoustic_path.rglob(ext))

        return sorted(audio_files)

    # ==========================================================
    # Radar Dataset
    # ==========================================================

    def get_radar_files(self):
        """
        Returns every radar file.
        """

        radar_files = sorted(self.radar_path.rglob("*"))

        return radar_files


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

    print("\n" + "=" * 45)
    print("DATASET INFORMATION")
    print("=" * 45)

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