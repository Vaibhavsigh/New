# Algorithm Service

Python-based algorithm and data processing service using Flask.

## Features

- Flask REST API
- NumPy/Pandas for data processing
- MongoDB integration
- Redis for caching
- Sample algorithm endpoints

## Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
export FLASK_APP=src.app
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000

# Run tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html
```

## Linting and Formatting

```bash
# Format code
black src/

# Lint code
flake8 src/

# Type checking
mypy src/
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/algorithms/process` - Process numerical data
- `GET /api/algorithms/status` - Get service status
