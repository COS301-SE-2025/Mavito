# app/models/language.py
from sqlalchemy import Column, String, Boolean, CHAR
from app.db.base_class import Base

class Language(Base):
    
    # __tablename__ will be 'languages'
    code = Column(CHAR(3), primary_key=True, index=True) # CHAR(3) for codes like 'eng', 'zul'
    name = Column(String(50), nullable=False)
    native_name = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)