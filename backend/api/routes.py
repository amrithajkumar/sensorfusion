from pathlib import Path

from fastapi import APIRouter, File, UploadFile

from backend.config import settings
from backend.logs.logger import logger
from backend.schemas.response import (
    FeatureResponse,
    HealthResponse,
    PredictionResponse,
)
from backend.services.dataset_service import DatasetService
from backend.services.feature_service import FeatureService
from backend.services.history_service import HistoryService
from backend.services.inference import InferenceService
from backend.utils.validators import validate_file

router = APIRouter()

dataset_service = DatasetService()
feature_service = FeatureService()
inference_service = InferenceService()
history_service = HistoryService()


@router.get("/")
def home():
    return {
        "message": "Quantum Sensor Fusion Backend Running"
    }


@router.get("/health", response_model=HealthResponse)
def health():

    logger.info("Health endpoint accessed")

    return HealthResponse(
        status="healthy"
    )


@router.get("/dataset")
def dataset_summary():

    logger.info("Dataset summary requested")

    return dataset_service.get_dataset_summary()


@router.get("/predict", response_model=PredictionResponse)
def predict():

    logger.info("Prediction endpoint accessed")

    result = inference_service.predict(
        sensor_type="thermal",
        file_path=Path("dummy")
    )

    return PredictionResponse(
        prediction=result["prediction"],
        confidence=result["confidence"],
        detected=result["detected"]
    )


@router.get("/features/{sensor}", response_model=FeatureResponse)
def get_features(sensor: str):

    logger.info(
        f"Feature extraction requested | Sensor={sensor}"
    )

    result = feature_service.extract_features(
        sensor,
        Path("dummy")
    )

    return FeatureResponse(**result)


@router.post("/upload")
async def upload_file(
    sensor: str,
    file: UploadFile = File(...)
):

    logger.info(
        f"Upload received | Sensor={sensor} | File={file.filename}"
    )

    validate_file(
        sensor,
        file.filename
    )

    settings.UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    file_path = settings.UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    logger.info(
        f"File saved at {file_path}"
    )

    prediction = inference_service.predict(
        sensor,
        file_path
    )

    history_service.save_prediction(
        filename=file.filename,
        sensor=sensor,
        prediction=prediction["prediction"],
        confidence=prediction["confidence"]
    )

    logger.info(
        "Prediction completed successfully"
    )

    return {
        "filename": file.filename,
        "status": "uploaded",
        "result": prediction
    }