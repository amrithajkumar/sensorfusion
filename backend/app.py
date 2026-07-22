from fastapi import FastAPI
from api.routes import router

app = FastAPI(
    title="Quantum Sensor Fusion API",
    version="1.0",
    description="Backend API for Drone Detection"
)

app.include_router(router)