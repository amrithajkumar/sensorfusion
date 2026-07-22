from pathlib import Path

# Project Root
BASE_DIR = Path(__file__).resolve().parent.parent

# Dataset Paths
THERMAL_DATASET = BASE_DIR / "datasets" / "thermal"
ACOUSTIC_DATASET = BASE_DIR / "datasets" / "acoustic"
RADAR_DATASET = BASE_DIR / "datasets" / "radar"

# Results Directory
RESULTS_DIR = BASE_DIR / "results"

# Model Directory
MODELS_DIR = BASE_DIR / "models"
