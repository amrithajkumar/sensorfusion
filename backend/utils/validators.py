from pathlib import Path


THERMAL_EXTENSIONS = {".jpg", ".jpeg", ".png"}
ACOUSTIC_EXTENSIONS = {".wav"}
RADAR_EXTENSIONS = {".npy"}


def validate_file(sensor: str, filename: str):

    extension = Path(filename).suffix.lower()

    if sensor == "thermal":
        allowed = THERMAL_EXTENSIONS

    elif sensor == "acoustic":
        allowed = ACOUSTIC_EXTENSIONS

    elif sensor == "radar":
        allowed = RADAR_EXTENSIONS

    else:
        raise ValueError(f"Unsupported sensor: {sensor}")

    if extension not in allowed:
        raise ValueError(
            f"Invalid file type '{extension}' for {sensor}. "
            f"Allowed: {sorted(allowed)}"
        )