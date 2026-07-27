from typing import Optional

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.config import settings
from backend.logs.logger import logger
from backend.schemas.response import HealthResponse
from backend.services.dataset_service import DatasetService
from backend.services.history_service import HistoryService
from backend.services.inference import InferenceService

router = APIRouter()

dataset_service = DatasetService()
inference_service = InferenceService()
history_service = HistoryService()


@router.get("/")
def home():
    return {"message": "Quantum Sensor Fusion Backend Running"}


@router.get("/health", response_model=HealthResponse)
def health():
    logger.info("Health endpoint accessed")

    return HealthResponse(status="healthy")


@router.get("/dataset")
def dataset_summary():
    logger.info("Dataset summary requested")

    return dataset_service.get_dataset_summary()


# ------------------------------
# NEW HISTORY ENDPOINT
# ------------------------------
@router.get("/history")
def get_history():
    logger.info("History requested")

    return history_service.load_predictions()


@router.post("/predict")
async def predict(
    radar_file: Optional[UploadFile] = File(None),
    thermal_file: Optional[UploadFile] = File(None),
    acoustic_file: Optional[UploadFile] = File(None),
):

    logger.info("Prediction request received")

    if not any([radar_file, thermal_file, acoustic_file]):
        raise HTTPException(
            status_code=400,
            detail="Upload at least one sensor file.",
        )

    settings.UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    radar_path = None
    thermal_path = None
    acoustic_path = None

    if radar_file:
        radar_path = settings.UPLOAD_DIR / radar_file.filename

        with open(radar_path, "wb") as buffer:
            buffer.write(await radar_file.read())

    if thermal_file:
        thermal_path = settings.UPLOAD_DIR / thermal_file.filename

        with open(thermal_path, "wb") as buffer:
            buffer.write(await thermal_file.read())

    if acoustic_file:
        acoustic_path = settings.UPLOAD_DIR / acoustic_file.filename

        with open(acoustic_path, "wb") as buffer:
            buffer.write(await acoustic_file.read())

    logger.info("Uploaded sensor files saved successfully")

    prediction = inference_service.predict(
        radar_path,
        thermal_path,
        acoustic_path,
    )

    uploaded_files = []

    if radar_file:
        uploaded_files.append(radar_file.filename)

    if thermal_file:
        uploaded_files.append(thermal_file.filename)

    if acoustic_file:
        uploaded_files.append(acoustic_file.filename)

    history_service.save_prediction(
        filename=", ".join(uploaded_files),
        sensor="Adaptive Multi-Sensor",
        prediction=prediction["prediction"],
        confidence=prediction["confidence"],
    )

    logger.info("Prediction completed successfully")

    return prediction