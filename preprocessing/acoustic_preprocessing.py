"""
Acoustic preprocessing module.

This module:
- Finds all WAV audio files
- Converts audio to mono
- Resamples audio to 16 kHz
- Normalizes audio
- Saves cleaned audio while preserving folder structure

Author: Quantum Fusion Team
"""

from pathlib import Path

import librosa
import soundfile as sf
from preprocessing.dataset_loader import DatasetLoader
from utils import create_directory


class AcousticPreprocessor:
    """
    Acoustic preprocessing pipeline.
    """

    def __init__(self):

        self.loader = DatasetLoader()

        self.output_root = (
            Path("datasets")
            / "acoustic"
            / "processed"
        )

        # Configuration
        self.sample_rate = 16000

    def find_audio_files(self):
        """
        Return all WAV files.
        """

        return self.loader.get_acoustic_files()

    def process_audio(self, audio_path: Path):
        """
        Process a single audio file.
        """

        print(f"\nProcessing: {audio_path.name}")

        # Load audio
        audio, sr = librosa.load(
            audio_path,
            sr=self.sample_rate,
            mono=True
        )

        # Normalize audio
        max_value = abs(audio).max()

        if max_value > 0:
            audio = audio / max_value

        # Class name (unknown / yes_drone)
        label = audio_path.parent.name

        output_folder = (
            self.output_root
            / label
        )

        create_directory(output_folder)

        output_path = (
            output_folder
            / audio_path.name
        )

        sf.write(
            output_path,
            audio,
            self.sample_rate
        )

    def process_dataset(self):
        """
        Process the complete dataset.
        """
        audio_files = self.find_audio_files()

        print("=" * 60)
        print("ACOUSTIC PREPROCESSING")
        print("=" * 60)

        print(f"Audio Files Found : {len(audio_files)}\n")

        for index, audio_file in enumerate(audio_files, start=1):

            print(
                f"[{index}/{len(audio_files)}] {audio_file.name}"
            )

            self.process_audio(audio_file)

        print("\nAcoustic preprocessing completed successfully!")

    def run(self):
        """
        Start preprocessing.
        """

        self.process_dataset()


if __name__ == "__main__":

    processor = AcousticPreprocessor()

    processor.run()