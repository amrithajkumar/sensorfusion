from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from backend.logs.logger import logger


def register_exception_handlers(app: FastAPI):

    @app.exception_handler(ValueError)
    async def value_error_handler(
        request: Request,
        exc: ValueError
    ):

        logger.error(f"ValueError: {exc}")

        return JSONResponse(
            status_code=400,
            content={
                "error": "Bad Request",
                "message": str(exc)
            }
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(
        request: Request,
        exc: Exception
    ):

        logger.exception("Unhandled Exception")

        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "message": str(exc)
            }
        )