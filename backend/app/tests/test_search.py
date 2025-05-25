"""
Unit test module for the search endpoint.
This test ensures the /api/v1/search route responds correctly and returns a list of terms.
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_search_with_filters():
    """
    Test the /api/v1/search endpoint with query and filters.

    Steps:
    - Sends a GET request to /api/v1/search with query, language, domain, part_of_speech, and sort_by parameters.
    - Asserts that the response status code is 200 (OK).
    - Asserts that the response body is a list.
    - If the list is non-empty, checks that the first item contains a 'term' field.

    This test helps ensure:
    - The search endpoint works without requiring authentication (if unprotected).
    - Filters are accepted and processed.
    - The returned data structure matches expected format.
    """
    response = client.get(
        "/api/v1/search",
        params={
            "query": "grain",
            "language": "English",
            "domain": "Agriculture",
            "part_of_speech": "noun",
            "sort_by": "popularity",
        },
    )
    assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"
    data = response.json()
    assert isinstance(data, list), "Expected response to be a list"
    if data:
        assert "term" in data[0], "Expected each item to contain a 'term' key"
