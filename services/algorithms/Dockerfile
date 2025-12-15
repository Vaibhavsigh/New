FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY services/algorithms/requirements.txt ./services/algorithms/

# Install Python dependencies
RUN pip install --no-cache-dir -r services/algorithms/requirements.txt

# Copy source
COPY services/algorithms ./services/algorithms

WORKDIR /app/services/algorithms

ENV PYTHONPATH=/app
ENV FLASK_APP=src.app
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "120", "src.app:create_app()"]
