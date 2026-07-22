"""
Thermal preprocessing module.

This module:
- Finds all infrared videos
- Extracts frames
- Resizes frames
- Saves processed images
- Preserves train/val/test structure

Author: Quantum Fusion Team
"""

from pathlib import Path

from dataset_loader import DatasetLoader
from utils import (
    create_directory,
    extract_frames,
    resize_image,
    save_image,
)


class ThermalPreprocessor:
    """
    Thermal video preprocessing pipeline.
    """

    def __init__(self):

        self.loader = DatasetLoader()

        self.output_root = (
            Path("datasets")
            / "thermal"
            / "processed"
        )

        # Configuration
        self.frame_interval = 5
        self.image_width = 224
        self.image_height = 224

    def find_videos(self):
        """
        Return all infrared videos.
        """

        return self.loader.get_thermal_videos()

    def save_frames(self, frames, output_folder: Path):
        """
        Resize and save extracted frames.
        """

        create_directory(output_folder)

        for index, frame in enumerate(frames):

            frame = resize_image(
                frame,
                self.image_width,
                self.image_height
            )

            output_path = (
                output_folder
                / f"frame_{index:04d}.jpg"
            )

            save_image(frame, output_path)

    def process_video(self, video_path: Path):
        """
        Process a single thermal video.
        """

        print(f"\nProcessing: {video_path}")

        frames = extract_frames(
            video_path,
            frame_interval=self.frame_interval
        )

        print(f"Frames Extracted : {len(frames)}")

        # train / val / test
        split = video_path.parent.parent.name

        # sequence folder
        sequence = video_path.parent.name

        output_folder = (
            self.output_root
            / split
            / sequence
        )

        self.save_frames(
            frames,
            output_folder
        )

    def process_dataset(self):
        """
        Process every thermal video.
        """

        videos = self.find_videos()

        print("=" * 60)
        print("THERMAL PREPROCESSING")
        print("=" * 60)

        print(f"Videos Found : {len(videos)}\n")

        for index, video in enumerate(videos, start=1):

            print(f"[{index}/{len(videos)}]")

            self.process_video(video)

        print("\nThermal preprocessing completed successfully!")

    def run(self):
        """
        Start preprocessing.
        """

        self.process_dataset()


if __name__ == "__main__":

    processor = ThermalPreprocessor()

    processor.run()