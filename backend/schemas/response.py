from pydantic import BaseModel


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    detected: bool


class HealthResponse(BaseModel):
    status: str