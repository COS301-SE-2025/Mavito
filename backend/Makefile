# Run unit tests
test:
	PYTHONPATH=. pytest

# Check formatting (black)
format:
	black --check .

# Check linting (ruff)
lint:
	ruff check .

# Check type hints (mypy)
typecheck:
	PYTHONPATH=. mypy app

# Run all checks together
check: format lint typecheck test

