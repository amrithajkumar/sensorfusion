from pydantic import BaseModel


class PredictionRequest(BaseModel):
    sensor_type: str
    filename: str