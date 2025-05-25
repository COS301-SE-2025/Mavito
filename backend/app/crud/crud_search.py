"""
Module: crud_search

This module provides functions to load, filter, and sort multilingual terminology data
from a JSON dataset file. It defines two key functions:
- load_terms(): loads raw data and converts it into Term model objects.
- search_terms(): applies search queries, filters, and sorting to the loaded terms.

Note:
- Currently uses placeholder language and part_of_speech.
- Assigns random UUIDs on load, as the JSON data lacks unique identifiers.
"""

import json
from uuid import uuid4
from pathlib import Path
from typing import List, Optional
from app.schemas.term import Term

DATA_FILE = (
    Path(__file__).resolve().parents[2]
    / "../Mock_Data"
    / "multilingual_statistical_terminology_clean.json"
)


async def load_terms() -> List[Term]:
    """
    Load terms from the multilingual statistical terminology JSON file.

    Returns:
        List[Term]: A list of Term model objects populated from the JSON data.

    Note:
        Each term is assigned a random UUID as its ID, since the source data lacks unique identifiers.
        The language and part_of_speech fields are currently set as placeholders.
    """
    with open(DATA_FILE) as f:
        raw_data = json.load(f)
    terms = []
    for item in raw_data:
        terms.append(
            Term(
                id=uuid4(),
                term=item.get("eng term"),
                definition=item.get("eng definition "),
                language="English",  # Placeholder
                domain=item.get("category", "General"),
                part_of_speech="noun",  # Placeholder
                translations=[],
                example="",
                related_terms=[],
                upvotes=0,
                downvotes=0,
                comments=[],
            )
        )
    return terms


async def search_terms(
    query: str,
    language: Optional[str] = None,
    domain: Optional[str] = None,
    part_of_speech: Optional[str] = None,
    sort_by: str = "name",
) -> List[Term]:
    """
    Search terms matching a query string, with optional filtering and sorting.

    Args:
        query (str): The search query to match against the term name.
        language (str, optional): Language filter (case-insensitive).
        domain (str, optional): Domain filter (case-insensitive).
        part_of_speech (str, optional): Part of speech filter (case-insensitive).
        sort_by (str): Sorting criteria; either 'name' (alphabetical) or 'popularity' (upvotes - downvotes).

    Returns:
        List[Term]: A list of Term objects matching the query and filters, sorted accordingly.
    """
    terms = await load_terms()

    # Filter by query in term name
    filtered = [t for t in terms if query.lower() in t.term.lower()]

    # Apply optional filters
    if language:
        filtered = [t for t in filtered if t.language.lower() == language.lower()]
    if domain:
        filtered = [t for t in filtered if t.domain.lower() == domain.lower()]
    if part_of_speech:
        filtered = [
            t for t in filtered if t.part_of_speech.lower() == part_of_speech.lower()
        ]

    # Sort results
    if sort_by == "name":
        filtered.sort(key=lambda t: t.term.lower())
    elif sort_by == "popularity":
        filtered.sort(key=lambda t: t.upvotes - t.downvotes, reverse=True)

    return filtered
