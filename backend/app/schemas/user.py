# app/schemas/user.py
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime # For timestamp fields
# Import the UserRole enum from your models if you want to use it here too
from app.models.user import UserRole # Assuming UserRole is defined in app/models/user.py

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: Optional[UserRole] = None # Corresponds to your SQL ENUM/CHECK; make it optional or provide a default
    profile_pic_url: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str # Plain password received from client

# Properties to receive via API on update
class UserUpdate(UserBase):
    email: Optional[EmailStr] = None # Allow email update
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    password: Optional[str] = None # Allow password update
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    profile_pic_url: Optional[str] = None

# Properties stored in DB (never directly exposed if it contains sensitive data)
class UserInDBBase(UserBase):
    id: int
    #is_active: bool # This was in our previous model, your SQL has is_verified and account_locked
    is_verified: bool
    account_locked: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    # Pydantic V2 configuration to allow ORM mode (reading data from SQLAlchemy models)
    model_config = ConfigDict(from_attributes=True)
    # For Pydantic V1, you would use:
    # class Config:
    #     orm_mode = True 

# Additional properties to return to client (this is your main User response model)
class User(UserInDBBase):
    pass # Inherits all from UserInDBBase, effectively making it the response model

# Properties stored in DB, including the hashed password (for internal use by CRUD)
class UserInDB(UserInDBBase):
    password_hash: str # Matches your SQL column name