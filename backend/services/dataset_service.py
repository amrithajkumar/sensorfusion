from config import settings


class DatasetService:

    def __init__(self):

        self.thermal_path = settings.THERMAL_DIR / "processed"

        self.acoustic_path = settings.ACOUSTIC_DIR / "processed"

        self.radar_path = settings.RADAR_DIR / "processed"

    def get_sensor_path(self, sensor_type: str):

        sensor_type = sensor_type.lower()

        if sensor_type == "thermal":
            return self.thermal_path

        if sensor_type == "acoustic":
            return self.acoustic_path

        if sensor_type == "radar":
            return self.radar_path

        raise ValueError(
            f"Unknown sensor type: {sensor_type}"
        )

    def get_total_files(self, sensor_type: str):

        path = self.get_sensor_path(sensor_type)

        if not path.exists():
            return 0

        return sum(
            1
            for file in path.rglob("*")
            if file.is_file()
        )

    def get_dataset_summary(self):

        return {
            "thermal": self.get_total_files("thermal"),
            "acoustic": self.get_total_files("acoustic"),
            "radar": self.get_total_files("radar"),
        }