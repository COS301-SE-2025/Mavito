# app/api/v1/endpoints/search.py

from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from app.api import deps
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
    current_user=Depends(deps.get_current_active_user)
):
    results = await search_terms(query, language, domain, part_of_speech, sort_by)
    return results

