# 1. Use an official Python runtime as a parent image
FROM python:3.9-slim

# 2. Set environment variables for Python and Uvicorn
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PIP_DEFAULT_TIMEOUT 100

# PORT will be provided by Cloud Run, default to 8080 for local testing with Docker
ENV PORT 8080
# HOST for Uvicorn to bind to all interfaces
ENV HOST 0.0.0.0

# 3. Set the working directory in the container
WORKDIR /app

# 4. Optional: Install system dependencies that might be needed by some Python packages
# Example:
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential libpq-dev \
#  && rm -rf /var/lib/apt/lists/*

# 5. Copy the requirements file into the container
COPY ./requirements.txt /app/requirements.txt

# 6. Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt

# 7. Copy the rest of your application code (the 'app' directory) into the container
COPY ./app /app/app

# 8. Expose the port the app runs on (more for documentation with Docker, Uvicorn binds to $PORT)
EXPOSE ${PORT}

# 9. Command to run the application when the container launches
# Uvicorn will listen on $HOST:$PORT. Cloud Run provides the PORT env var.
# Using exec means uvicorn becomes PID 1 and receives signals correctly from Docker/Cloud Run.
# --workers 1 is a good starting point for Cloud Run, which scales by instance count.
CMD exec uvicorn app.main:app --host ${HOST} --port ${PORT} --workers 1