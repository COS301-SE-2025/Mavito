# app/db/session.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)
engine = None
AsyncSessionLocal = None

if settings.SQLALCHEMY_DATABASE_URL:
    try:
        engine = create_async_engine(
            settings.SQLALCHEMY_DATABASE_URL,
            # echo=True,  # Uncomment for detailed SQL query logging during development
            pool_pre_ping=True # Good practice to ensure connections are live
        )
        AsyncSessionLocal = sessionmaker(
            bind=engine,
            class_=AsyncSession,
            autocommit=False,
            autoflush=False,
            expire_on_commit=False # Important for async programming patterns
        )
        # Avoid logging full URL if it contains password
        db_url_display = str(engine.url).split('@')[-1] if '@' in str(engine.url) else str(engine.url)
        logger.info(f"Database engine initialized successfully for: ...@{db_url_display}")
    except Exception as e:
        db_url_display_err = settings.SQLALCHEMY_DATABASE_URL.split('@')[-1] if '@' in settings.SQLALCHEMY_DATABASE_URL else settings.SQLALCHEMY_DATABASE_URL
        logger.error(f"Failed to initialize database engine with URL ...@{db_url_display_err}: {e}", exc_info=True) # Log full exception
else:
    logger.critical("SQLALCHEMY_DATABASE_URL is not set after config initialization. Database functionality will be unavailable.")


async def get_db(): # type: ignore # For cleaner generator typing
    if AsyncSessionLocal is None:
        logger.error("AsyncSessionLocal is None. Database might not be configured or initialization failed.")
        raise RuntimeError("Database session factory (AsyncSessionLocal) is not available.")

    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()