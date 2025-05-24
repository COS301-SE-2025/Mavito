from fastapi import APIRouter, Query
import pandas as pd
from collections import Counter
import os

router = APIRouter(prefix="/api/analytics")

#chaches date set
TERM_DATASET = None  


#load marito data from json
async def load_marito_data():
    global TERM_DATASET
    if TERM_DATASET is None:
        dataset_path = os.getenv("multilingual_statistical_terminology_clean.json")  # default to data.json
        TERM_DATASET = pd.read_json(dataset_path)
    return TERM_DATASET


@router.get("/term-frequency")
async def get_term_frequency(
    lang: str = Query("eng", pattern="^(eng|afr|nde|xho|zul|nso|sot|tsn|ssw|ven|tso)$"),
    top_n: int = Query(10, ge=1, le=100)
):
    df = await load_marito_data()

    lang_column = f"{lang}_term"
    terms = df[lang_column].dropna().tolist()
    term_frequency = Counter(terms)

    data = [{"term": term, "frequency": freq} for term, freq in term_frequency.most_common(top_n)]

    return {
        "meta": {
            "language": lang,
            "total_terms": len(terms),
        },
        "data": data
    }
