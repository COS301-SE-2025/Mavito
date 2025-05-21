# app/api/v1/api.py
from fastapi import APIRouter

# You will import your specific feature endpoint routers here later
# from .endpoints import auth, lexicon, comment

api_router_v1 = APIRouter()

# And include them like this:
# api_router_v1.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# api_router_v1.include_router(lexicon.router, prefix="/lexicons", tags=["Lexicons"])
# api_router_v1.include_router(comment.router, prefix="/comments", tags=["Comments"])