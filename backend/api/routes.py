import os
from fastapi import APIRouter, UploadFile, File

from services.inference import InferenceService
from schemas.response import PredictionResponse, HealthResponse

router = APIRouter()

service = InferenceService()


@router.get("/")
def home():
    return {
        "message": "Quantum Sensor Fusion Backend Running"
    }


@router.get(
    "/health",
    response_model=HealthResponse
)
def health():

    return HealthResponse(
        status="Healthy"
    )


@router.get(
    "/predict",
    response_model=PredictionResponse
)
def predict():

    prediction = service.predict(
    sensor_type="thermal",
    filename="sample.mp4"
)

    return PredictionResponse(**prediction)
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    upload_folder = "uploads"

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "filename": file.filename,
        "status": "uploaded"
    }