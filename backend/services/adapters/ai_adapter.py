from pathlib import Path


class AIAdapter:
    """
    Adapter between the backend and the AI module.

    Today:
        Uses dummy feature vectors.

    Later:
        Calls the real feature extraction functions.
    """

    def extract_thermal(self, file_path: Path):

        return [
            0.25,
            0.48,
            0.91,
            0.67,
            0.12
        ]

    def extract_acoustic(self, file_path: Path):

        return [
            0.83,
            0.42,
            0.18,
            0.91,
            0.37
        ]

    def extract_radar(self, file_path: Path):

        return [
            0.62,
            0.15,
            0.77,
            0.94,
            0.51
        ]