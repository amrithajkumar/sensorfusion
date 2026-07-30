"""
===========================================================
Thermal Dataset Validator

Validates the Drone Detection Dataset before preprocessing.

Checks:
1. Dataset folders exist
2. Video files exist
3. Matching label files exist
4. Videos can be opened
5. Dataset statistics

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
import cv2


class ThermalDatasetValidator:

    def __init__(self):

        self.dataset_root = Path("datasets/thermal/raw/Data")

        self.video_ir = self.dataset_root / "Video_IR"
        self.video_v = self.dataset_root / "Video_V"
        self.audio = self.dataset_root / "Audio"

    # --------------------------------------------------

    def validate_folder(self, folder: Path):

        if not folder.exists():
            print(f"[ERROR] Folder not found : {folder}")
            return False

        print(f"[OK] {folder}")

        return True

    # --------------------------------------------------

    def get_video_files(self):

        return sorted(self.video_ir.glob("*.mp4"))

    # --------------------------------------------------

    def check_video(self, video_path: Path):

        cap = cv2.VideoCapture(str(video_path))

        if not cap.isOpened():
            return False

        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        cap.release()

        return frame_count > 0

    # --------------------------------------------------

    def validate(self):

        print("=" * 60)
        print("THERMAL DATASET VALIDATION")
        print("=" * 60)

        if not self.validate_folder(self.video_ir):
            return

        if not self.validate_folder(self.video_v):
            return

        if not self.validate_folder(self.audio):
            return

        videos = self.get_video_files()

        total = len(videos)

        matched = 0
        missing = 0
        corrupted = 0

        drone = 0
        bird = 0
        helicopter = 0
        airplane = 0

        print("\nChecking videos...\n")

        for video in videos:

            label = video.with_name(
                video.stem + "_LABELS.mat"
            )

            if label.exists():
                matched += 1
            else:
                missing += 1

            if not self.check_video(video):
                corrupted += 1

            name = video.stem.upper()

            if "DRONE" in name:
                drone += 1

            elif "BIRD" in name:
                bird += 1

            elif "HELICOPTER" in name:
                helicopter += 1

            elif "AIRPLANE" in name:
                airplane += 1

        print("\n")
        print("=" * 60)
        print("SUMMARY")
        print("=" * 60)

        print(f"Total Videos      : {total}")
        print(f"Matched Labels    : {matched}")
        print(f"Missing Labels    : {missing}")
        print(f"Corrupted Videos  : {corrupted}")

        print()

        print(f"Drone Videos      : {drone}")
        print(f"Bird Videos       : {bird}")
        print(f"Helicopter Videos : {helicopter}")
        print(f"Airplane Videos   : {airplane}")

        print()

        if missing == 0 and corrupted == 0:
            print("DATASET STATUS : READY")
        else:
            print("DATASET STATUS : CHECK REQUIRED")


if __name__ == "__main__":

    validator = ThermalDatasetValidator()

    validator.validate()