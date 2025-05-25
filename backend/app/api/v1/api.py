
# app/api/v1/api.py
from fastapi import APIRouter
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import auth  # <--- IMPORT your auth router
from app.api.v1.endpoints import search

# from .endpoints import lexicon, comment # You'll import these later when created

api_router_v1 = APIRouter()

# Include the authentication router
api_router_v1.include_router(
    auth.router, prefix="/auth", tags=["Authentication"]
)  # <--- INCLUDE the router

api_router_v1.include_router(search.router, prefix="/search", tags=["Search"])
api_router_v1.include_router(analytics.router) 
# You will include other routers here later:
# api_router_v1.include_router(lexicon.router, prefix="/lexicons", tags=["Lexicons & Entries"])
# api_router_v1.include_router(comment.router, tags=["Comments & Feedback"]) # No prefix needed here based on previous comment router structure
