from fastapi import FastAPI

from api.routes import router
from config import settings
from exceptions.handlers import register_exception_handlers
from logs.logger import logger

app = FastAPI(
    title=settings.PROJECT_NAME
)

register_exception_handlers(app)

app.include_router(router)

logger.info("Quantum Sensor Fusion Backend Started")