# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.v1.api import api_router_v1
from app.core.config import settings
from app.db.session import engine, AsyncSessionLocal # For DB check and potential table creation
from app.db import base as db_base # Ensures Base knows all models

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def create_db_and_tables_if_sqlite():
    """Creates database and tables if using SQLite and engine is available."""
    if engine and settings.SQLALCHEMY_DATABASE_URL and "sqlite" in settings.SQLALCHEMY_DATABASE_URL:
        logger.info(f"SQLite detected ({settings.SQLALCHEMY_DATABASE_URL.split('@')[-1]}). Attempting to create tables...")
        try:
            async with engine.begin() as conn:
                # await conn.run_sync(db_base.Base.metadata.drop_all) # Use with EXTREME caution
                await conn.run_sync(db_base.Base.metadata.create_all)
            logger.info("SQLite database tables created/verified successfully.")
        except Exception as e:
            logger.error(f"Error creating SQLite database tables: {e}", exc_info=True)
    elif not engine:
        logger.error("Database engine not initialized. Cannot create tables.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version="0.1.0" # Example version
)

# CORS Configuration
# The primary origin for your GitHub Pages site.
github_pages_origin = f"https://{settings.GITHUB_ORGANIZATION}.github.io"

origins = [
    github_pages_origin,
    "http://localhost:3000", # Common for React Create React App dev
    "http://localhost:5173", # Common for React Vite dev
    # Add other specific origins if your team uses different ports/URLs for local frontend dev
]
# Add origins from .env if provided
if settings.BACKEND_CORS_ORIGINS:
    origins.extend(settings.BACKEND_CORS_ORIGINS)

# Ensure unique origins
unique_origins = sorted(list(set(origins)))

app.add_middleware(
    CORSMiddleware,
    allow_origins=unique_origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all standard methods
    allow_headers=["*"], # Allows all headers
)
app.include_router(api_router_v1, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def on_startup():
    logger.info("--- Application Startup ---")
    logger.info(f"Project Name: {settings.PROJECT_NAME}")
    logger.info(f"CORS Allowed Origins: {unique_origins}")

    db_url_to_log = settings.SQLALCHEMY_DATABASE_URL
    if db_url_to_log and "@" in db_url_to_log: # Basic attempt to hide credentials in log
        db_url_to_log = "...@" + db_url_to_log.split('@', 1)[-1]
    logger.info(f"Database URL (potentially masked): {db_url_to_log}")

    if not settings.SECRET_KEY or settings.SECRET_KEY == "!!!CONFIG_ERROR_SECRET_KEY_NOT_SET!!!" or settings.SECRET_KEY == "!!!SET_SECRET_KEY_IN_ENV_FILE_OR_ENVIRONMENT!!!":
         logger.critical("SECURITY WARNING: SECRET_KEY is not set or is using a weak default. This is insecure!")

    # For local development with SQLite, this creates the DB and tables if they don't exist.
    # For Cloud SQL, migrations should be handled separately (e.g., with Alembic).
    await create_db_and_tables_if_sqlite()
    logger.info("--- Application Startup Complete ---")

@app.on_event("shutdown")
async def on_shutdown():
    logger.info("--- Application Shutdown ---")
    if engine:
        await engine.dispose() # Properly close DB connection pool
        logger.info("Database engine disposed.")
    logger.info("--- Application Shutdown Complete ---")

@app.get("/", tags=["Root"])
async def read_root():
    """Returns a welcome message and API documentation link."""
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}!",
        "documentation": "/docs"
    }