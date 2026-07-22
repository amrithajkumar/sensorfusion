"""
Utility functions for preprocessing sensor data.

This module provides reusable helper functions for:
- Directory management
- File discovery
- Video processing
- Image processing

Author: Quantum Fusion Team
"""

from pathlib import Path
from typing import List

import cv2
import numpy as np


def create_directory(directory: Path) -> None:
    """
    Create a directory if it does not already exist.
    """
    directory.mkdir(parents=True, exist_ok=True)


def list_files(folder: Path, extension: str) -> List[Path]:
    """
    Return all files with the given extension.
    """

    return sorted(folder.rglob(f"*{extension}"))


def get_video_info(video_path: Path) -> dict:
    """
    Get basic information about a video.
    """

    capture = cv2.VideoCapture(str(video_path))

    if not capture.isOpened():
        raise FileNotFoundError(f"Unable to open {video_path}")

    fps = capture.get(cv2.CAP_PROP_FPS)
    frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps else 0

    capture.release()

    return {
        "fps": fps,
        "frame_count": frame_count,
        "duration": duration
    }


def extract_frames(video_path: Path, frame_interval: int = 5) -> List[np.ndarray]:
    """
    Extract every Nth frame from a video.
    """

    capture = cv2.VideoCapture(str(video_path))

    if not capture.isOpened():
        raise FileNotFoundError(f"Unable to open {video_path}")

    frames = []
    frame_number = 0

    while True:

        success, frame = capture.read()

        if not success:
            break

        if frame_number % frame_interval == 0:
            frames.append(frame)

        frame_number += 1

    capture.release()

    return frames


def resize_image(image: np.ndarray,
                 width: int = 224,
                 height: int = 224) -> np.ndarray:
    """
    Resize image.
    """

    return cv2.resize(image, (width, height))


def save_image(image: np.ndarray, output_path: Path) -> None:
    """
    Save image to disk.
    """

    cv2.imwrite(str(output_path), image)
if __name__ == "__main__":
    test_folder = Path("test_output")
    create_directory(test_folder)
    print("Directory created successfully!")
    files = list_files(Path("."), ".py")
    print(f"Python files found: {len(files)}")