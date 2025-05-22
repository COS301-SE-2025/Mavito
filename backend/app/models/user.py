# app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SaEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func # For server-side default timestamps
from app.db.base_class import Base
import enum # For Python Enum for roles

# Define an Enum for the user roles if you want to use it in Python code as well
class UserRole(str, enum.Enum):
    linguist = "linguist"
    researcher = "researcher"
    contributor = "contributor"
    # admin = "admin" # You might add more roles

class User(Base):
    
    # __tablename__ will be 'users'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False) # Changed from hashed_password to match your SQL

    # Using SQLAlchemy's Enum type for the role
    role = Column(SaEnum(UserRole, name="user_role_enum"), nullable=True) # Allow NULL or set a default if preferred

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    is_verified = Column(Boolean, default=False) # For email verification
    profile_pic_url = Column(String, nullable=True) # TEXT in SQL can be String in SQLAlchemy

    # Security features
    password_reset_token = Column(String(255), nullable=True, index=True)
    verification_token = Column(String(255), nullable=True, index=True) # For email verification
    account_locked = Column(Boolean, default=False)
    is_active = Column(Boolean(), default=True)
    failed_login_attempts = Column(Integer, default=0)
    deleted_at = Column(DateTime(timezone=True), nullable=True) # For soft delete

    # Relationships (we'll define other models like UserLanguage later)
    # proficient_languages = relationship("UserLanguage", back_populates="user")
    # preferences = relationship("UserPreference", uselist=False, back_populates="user")
    # search_history = relationship("UserSearchHistory", back_populates="user")