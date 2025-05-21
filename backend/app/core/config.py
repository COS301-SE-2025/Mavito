# app/core/config.py
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)
load_dotenv() # Load .env file into environment variables

class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Mavito API Default")
    API_V1_STR: str = "/api/v1"

    SECRET_KEY: str = os.getenv("SECRET_KEY", "!!!CONFIG_ERROR_SECRET_KEY_NOT_SET!!!")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", str(60 * 24 * 7))) # Default 7 days

    DB_USER: Optional[str] = os.getenv("DB_USER")
    DB_PASSWORD: Optional[str] = os.getenv("DB_PASSWORD")
    DB_NAME: Optional[str] = os.getenv("DB_NAME")
    DB_HOST: Optional[str] = os.getenv("DB_HOST") 
    DB_PORT: Optional[str] = os.getenv("DB_PORT")
    INSTANCE_CONNECTION_NAME: Optional[str] = os.getenv("INSTANCE_CONNECTION_NAME")

    SQLALCHEMY_DATABASE_URL: Optional[str] = None # Will be constructed

    GITHUB_ORGANIZATION: str = os.getenv("GITHUB_ORGANIZATION", "COS301-SE-2025") # Default set

    _raw_backend_cors_origins: str = os.getenv("BACKEND_CORS_ORIGINS", "")
    BACKEND_CORS_ORIGINS: List[str] = [origin.strip() for origin in _raw_backend_cors_origins.split(',') if origin.strip()]

    def __init__(self, **values):
        super().__init__(**values)

        if self.SECRET_KEY == "!!!CONFIG_ERROR_SECRET_KEY_NOT_SET!!!":
            logger.critical("CRITICAL: SECRET_KEY is not set or is using the placeholder. API will not be secure. Please set it in your .env file or environment variables.")

        # Construct SQLALCHEMY_DATABASE_URL based on provided environment variables
        if self.DB_USER and self.DB_PASSWORD and self.DB_NAME:
            if self.INSTANCE_CONNECTION_NAME:
                # Cloud SQL Unix Socket (preferred for Cloud Run or local proxy in socket mode)
                self.SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@/{self.DB_NAME}?host=/cloudsql/{self.INSTANCE_CONNECTION_NAME}"
                logger.info(f"Attempting Cloud SQL connection via Unix socket for instance: {self.INSTANCE_CONNECTION_NAME.split(':')[-1]}")
            elif self.DB_HOST and self.DB_PORT:
                # Cloud SQL/PostgreSQL TCP (for local proxy in TCP mode or other TCP connections)
                self.SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
                logger.info(f"Attempting PostgreSQL connection via TCP to host: {self.DB_HOST}:{self.DB_PORT}")
            else:
                logger.warning("DB_USER, DB_PASSWORD, DB_NAME are set, but neither INSTANCE_CONNECTION_NAME nor DB_HOST/DB_PORT are fully configured for PostgreSQL.")
                self._use_sqlite_fallback()
        else:
            logger.warning("Core PostgreSQL connection details (DB_USER, DB_PASSWORD, DB_NAME) are missing.")
            self._use_sqlite_fallback()

    def _use_sqlite_fallback(self):
        self.SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./local_mavito_fallback.db" # Fallback DB file in project root
        logger.warning(
            f"Falling back to local SQLite for development: {self.SQLALCHEMY_DATABASE_URL}. "
            "This is NOT recommended for production or shared development targeting Cloud SQL."
        )

    class Config:
        case_sensitive = True
        env_file = ".env" 
        env_file_encoding = 'utf-8'
        extra = 'ignore' # Allow .env to have extra vars not defined in Settings

settings = Settings()