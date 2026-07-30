from pathlib import Path


class Settings:

    PROJECT_NAME = "Quantum Sensor Fusion API"

    BASE_DIR = Path(__file__).resolve().parent.parent

    UPLOAD_DIR = BASE_DIR / "uploads"

    DATASET_DIR = BASE_DIR / "datasets"

    THERMAL_DIR = DATASET_DIR / "thermal"

    ACOUSTIC_DIR = DATASET_DIR / "acoustic"

    RADAR_DIR = DATASET_DIR / "radar"

    OPTIMIZATION_METRICS = {
    "precision": 0.20,
    "recall": 0.20,
    "f1": 0.35,
    "detection_rate": 0.15,
    "false_alarm_rate": -0.10,
}


settings = Settings()
