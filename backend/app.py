from fastapi import FastAPI

from backend.api.routes import router
from backend.config import settings
from backend.exceptions.handlers import register_exception_handlers
from backend.logs.logger import logger

app = FastAPI(
    title=settings.PROJECT_NAME
)

register_exception_handlers(app)

app.include_router(router)

logger.info("Quantum Sensor Fusion Backend Started")