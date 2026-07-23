"""
===========================================================
Acoustic Feature Extraction

Extracts robust acoustic features using librosa.

Features
--------
1. Zero Crossing Rate
2. RMS Energy
3. Spectral Centroid
4. Spectral Bandwidth
5. Spectral Rolloff
6. Spectral Contrast
7. MFCC (13)
8. Chroma Features
9. Tonnetz

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path

import librosa
import numpy as np

from feature_extraction.base_extractor import BaseFeatureExtractor


class AcousticFeatureExtractor(BaseFeatureExtractor):

    def __init__(self):

        super().__init__(

            input_directory=Path(
                "datasets/acoustic/processed"
            ),

            output_directory=Path(
                "datasets/acoustic/features"
            ),

            file_extensions=(
                ".wav",
                ".mp3",
                ".flac"
            )

        )

    # =====================================================
    # Audio Loader
    # =====================================================

    def load_audio(self, audio_path):

        signal, sample_rate = librosa.load(
            audio_path,
            sr=22050,
            mono=True
        )

        return signal, sample_rate

    # =====================================================
    # Zero Crossing Rate
    # =====================================================

    def zero_crossing_rate(self, signal):

        zcr = librosa.feature.zero_crossing_rate(
            signal
        )

        return np.array([
            np.mean(zcr),
            np.std(zcr)
        ])

    # =====================================================
    # RMS Energy
    # =====================================================

    def rms_energy(self, signal):

        rms = librosa.feature.rms(
            y=signal
        )

        return np.array([
            np.mean(rms),
            np.std(rms)
        ])

    # =====================================================
    # Spectral Centroid
    # =====================================================

    def spectral_centroid(
        self,
        signal,
        sample_rate
    ):

        centroid = librosa.feature.spectral_centroid(

            y=signal,
            sr=sample_rate

        )

        return np.array([
            np.mean(centroid),
            np.std(centroid)
        ])

    # =====================================================
    # Spectral Bandwidth
    # =====================================================

    def spectral_bandwidth(
        self,
        signal,
        sample_rate
    ):

        bandwidth = librosa.feature.spectral_bandwidth(

            y=signal,
            sr=sample_rate

        )

        return np.array([
            np.mean(bandwidth),
            np.std(bandwidth)
        ])

    # =====================================================
    # Spectral Rolloff
    # =====================================================

    def spectral_rolloff(
        self,
        signal,
        sample_rate
    ):

        rolloff = librosa.feature.spectral_rolloff(

            y=signal,
            sr=sample_rate

        )

        return np.array([
            np.mean(rolloff),
            np.std(rolloff)
        ])
        # =====================================================
    # Spectral Contrast
    # =====================================================

    def spectral_contrast(
        self,
        signal,
        sample_rate
    ):

        contrast = librosa.feature.spectral_contrast(

            y=signal,
            sr=sample_rate

        )

        return np.concatenate(
            [
                np.mean(contrast, axis=1),
                np.std(contrast, axis=1)
            ]
        )

    # =====================================================
    # MFCC
    # =====================================================

    def mfcc(
        self,
        signal,
        sample_rate
    ):

        mfcc = librosa.feature.mfcc(

            y=signal,
            sr=sample_rate,
            n_mfcc=13

        )

        return np.concatenate(
            [
                np.mean(mfcc, axis=1),
                np.std(mfcc, axis=1)
            ]
        )

    # =====================================================
    # Chroma
    # =====================================================

    def chroma(
        self,
        signal,
        sample_rate
    ):

        chroma = librosa.feature.chroma_stft(

            y=signal,
            sr=sample_rate

        )

        return np.concatenate(
            [
                np.mean(chroma, axis=1),
                np.std(chroma, axis=1)
            ]
        )

    # =====================================================
    # Tonnetz
    # =====================================================

    def tonnetz(
        self,
        signal,
        sample_rate
    ):

        harmonic = librosa.effects.harmonic(signal)

        tonnetz = librosa.feature.tonnetz(

            y=harmonic,
            sr=sample_rate

        )

        return np.concatenate(
            [
                np.mean(tonnetz, axis=1),
                np.std(tonnetz, axis=1)
            ]
        )

    # =====================================================
    # Feature Extraction
    # =====================================================

    def extract_features(self, audio_path):

        signal, sample_rate = self.load_audio(audio_path)

        feature_vector = np.concatenate(

            [

                self.zero_crossing_rate(signal),

                self.rms_energy(signal),

                self.spectral_centroid(
                    signal,
                    sample_rate
                ),

                self.spectral_bandwidth(
                    signal,
                    sample_rate
                ),

                self.spectral_rolloff(
                    signal,
                    sample_rate
                ),

                self.spectral_contrast(
                    signal,
                    sample_rate
                ),

                self.mfcc(
                    signal,
                    sample_rate
                ),

                self.chroma(
                    signal,
                    sample_rate
                ),

                self.tonnetz(
                    signal,
                    sample_rate
                )

            ]

        )

        return feature_vector.astype(np.float32)


# =========================================================
# Main
# =========================================================

if __name__ == "__main__":

    extractor = AcousticFeatureExtractor()

    statistics = extractor.run()

    print("\nExtraction Summary")
    print("-" * 30)
    print(f"Processed : {statistics['processed']}")
    print(f"Successful: {statistics['success']}")
    print(f"Failed    : {statistics['failed']}")