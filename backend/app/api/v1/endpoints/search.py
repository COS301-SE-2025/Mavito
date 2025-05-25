"""
Module: search.py

This module defines the search endpoint for the API v1 router.
It provides an HTTP GET route to search multilingual terms
with optional filters for language, domain, and part of speech,
and supports sorting by name or popularity.

Dependencies:
- FastAPI
- app.schemas.term.Term (Pydantic response model)
- app.crud.crud_search.search_terms (search logic function)
"""

from fastapi import APIRouter, Query
from typing import List, Optional

# from app.api import deps
from app.schemas.term import Term
from app.crud.crud_search import search_terms

router = APIRouter()


@router.get("/", response_model=List[Term])
async def search_endpoint(
    query: str = Query(..., description="Search term (required)"),
    language: Optional[str] = Query(None, description="Language filter"),
    domain: Optional[str] = Query(None, description="Domain filter"),
    part_of_speech: Optional[str] = Query(None, description="Part of speech filter"),
    sort_by: str = Query("name", description="Sort by 'name' or 'popularity'"),
):
    """
    Search endpoint to retrieve multilingual terms.

    Args:
        query (str): The search term (required).
        language (Optional[str]): Filter results by language.
        domain (Optional[str]): Filter results by domain.
        part_of_speech (Optional[str]): Filter results by part of speech.
        sort_by (str): Sorting criterion ('name' or 'popularity'). Defaults to 'name'.

    Returns:
        List[Term]: A list of matching Term objects.
    """
    results = await search_terms(query, language, domain, part_of_speech, sort_by)
    return results
