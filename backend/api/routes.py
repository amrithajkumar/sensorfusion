from fastapi import APIRouter, File, UploadFile

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


@router.post("/predict")
async def predict(
    radar_file: UploadFile = File(...),
    thermal_file: UploadFile = File(...),
    acoustic_file: UploadFile = File(...),
):

    logger.info("Multi-sensor prediction request received")

    settings.UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # -----------------------------------------
    # Save uploaded files
    # -----------------------------------------

    radar_path = settings.UPLOAD_DIR / radar_file.filename
    thermal_path = settings.UPLOAD_DIR / thermal_file.filename
    acoustic_path = settings.UPLOAD_DIR / acoustic_file.filename

    with open(radar_path, "wb") as buffer:
        buffer.write(await radar_file.read())

    with open(thermal_path, "wb") as buffer:
        buffer.write(await thermal_file.read())

    with open(acoustic_path, "wb") as buffer:
        buffer.write(await acoustic_file.read())

    logger.info("All sensor files uploaded successfully")

    # -----------------------------------------
    # Run AI Pipeline
    # -----------------------------------------

    prediction = inference_service.predict(
        radar_path,
        thermal_path,
        acoustic_path,
    )

    # -----------------------------------------
    # Save Prediction History
    # -----------------------------------------

    history_service.save_prediction(
        filename=f"{radar_file.filename}, {thermal_file.filename}, {acoustic_file.filename}",
        sensor="Multi-Sensor",
        prediction=prediction["prediction"],
        confidence=prediction["confidence"],
    )

    logger.info("Prediction completed successfully")

    return prediction