from pathlib import Path


class Settings:

    PROJECT_NAME = "Quantum Sensor Fusion API"

    BASE_DIR = Path(__file__).resolve().parent.parent

    UPLOAD_DIR = BASE_DIR / "uploads"

    DATASET_DIR = BASE_DIR / "datasets"

    THERMAL_DIR = DATASET_DIR / "thermal"

    ACOUSTIC_DIR = DATASET_DIR / "acoustic"

    RADAR_DIR = DATASET_DIR / "radar"


settings = Settings()
