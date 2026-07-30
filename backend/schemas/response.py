from typing import Dict
from pydantic import BaseModel


# ======================================================
# Optimization Result
# ======================================================

class OptimizationResult(BaseModel):

    weights: Dict[str, float]

    score: float

    runtime_seconds: float


# ======================================================
# Comparison Result
# ======================================================

class ComparisonResult(BaseModel):

    quantum_improvement_percent: float


# ======================================================
# Prediction Response
# ======================================================

class PredictionResponse(BaseModel):

    # Detection
    prediction: str

    confidence: float

    detected: bool

    # Sensor Outputs
    sensor_probabilities: Dict[str, float]
    sensor_reliability: Dict[str, float]

    # Quantum Optimization
    quantum: OptimizationResult

    # Classical Optimization
    classical: OptimizationResult

    # Comparison
    comparison: ComparisonResult

    # Fusion
    fusion_score: float

    # Mission Status
    mission_status: str

    threat_level: str

    recommended_action: str

    # Runtime
    total_runtime_seconds: float


# ======================================================
# Health Response
# ======================================================

class HealthResponse(BaseModel):

    status: str


# ======================================================
# Feature Response
# ======================================================

class FeatureResponse(BaseModel):

    sensor: str

    features: list[float]