"""
===========================================================
Thermal Frame Extractor + ROI Cropper

Reads:
    • Thermal video (.mp4)
    • MATLAB labels (.mat)

Produces:
    datasets/thermal/processed/<CLASS>/frame_xxxxxx.png

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import cv2
from mcos_decoder import load_groundtruth


class ThermalFrameExtractor:

    def __init__(self):

        self.input_directory = Path("datasets/thermal/raw/Data/Video_IR")
        self.output_directory = Path("datasets/thermal/processed")

        self.output_directory.mkdir(
            parents=True,
            exist_ok=True
        )

    # --------------------------------------------------

    def get_class_name(self, video_name):

        name = video_name.upper()

        if "DRONE" in name:
            return "Drone"

        if "BIRD" in name:
            return "Bird"

        if "HELICOPTER" in name:
            return "Helicopter"

        if "AIRPLANE" in name:
            return "Airplane"

        return "Unknown"

    # --------------------------------------------------

    def crop_roi(self, frame, bbox):
        """
        Crop ROI from the frame using the bounding box.
        """

        if bbox is None:
            return None

        if len(bbox) != 4:
            return None

        x, y, w, h = bbox

        x = int(round(x))
        y = int(round(y))
        w = int(round(w))
        h = int(round(h))

        if w <= 0 or h <= 0:
            return None

        height, width = frame.shape[:2]

        x = max(0, x)
        y = max(0, y)

        x2 = min(width, x + w)
        y2 = min(height, y + h)

        if x2 <= x or y2 <= y:
            return None

        roi = frame[y:y2, x:x2]

        if roi.size == 0:
            return None

        return roi

    # --------------------------------------------------

    def process_video(self, video_path):

        label_path = video_path.with_name(
            video_path.stem + "_LABELS.mat"
        )

        if not label_path.exists():
            print(f"Missing labels : {video_path.name}")
            return

        labels = load_groundtruth(label_path)

        class_name = self.get_class_name(video_path.stem)

        save_directory = self.output_directory / class_name
        save_directory.mkdir(parents=True, exist_ok=True)

        cap = cv2.VideoCapture(str(video_path))

        frame_index = 0
        saved = 0
        skipped = 0

        while True:

            success, frame = cap.read()

            if not success:
                break

            if frame_index >= len(labels):
                break

            bbox = labels[frame_index]

            if bbox is None:
                skipped += 1
                frame_index += 1
                continue

            roi = self.crop_roi(frame, bbox)

            if roi is None:
                skipped += 1
                frame_index += 1
                continue

            roi = cv2.resize(
                roi,
                (224, 224)
            )

            filename = (
                f"{video_path.stem}_"
                f"{frame_index:06d}.png"
            )

            cv2.imwrite(
                str(save_directory / filename),
                roi
            )

            saved += 1
            frame_index += 1

        cap.release()

        print(
            f"{video_path.name:<25} "
            f"Saved: {saved:4d} | "
            f"Skipped: {skipped:4d}"
        )

    # --------------------------------------------------

    def run(self):

        videos = sorted(
            self.input_directory.glob("*.mp4")
        )

        print("=" * 65)
        print("THERMAL FRAME EXTRACTION")
        print("=" * 65)

        print(f"Videos Found : {len(videos)}\n")

        for video in videos:
            self.process_video(video)

        print("\n" + "=" * 65)
        print("THERMAL DATASET CREATED SUCCESSFULLY")
        print("=" * 65)


# --------------------------------------------------

if __name__ == "__main__":

    extractor = ThermalFrameExtractor()
    extractor.run()