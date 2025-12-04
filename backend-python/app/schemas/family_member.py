from pydantic import BaseModel, EmailStr
from typing import Optional

class FamilyMemberBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: Optional[str] = "member"
    is_admin: Optional[bool] = False
    relationship: Optional[str] = None
    notes: Optional[str] = None

class FamilyMemberCreate(FamilyMemberBase):
    pass

class FamilyMemberUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    is_admin: Optional[bool] = None
    relationship: Optional[str] = None
    notes: Optional[str] = None

class FamilyMemberResponse(FamilyMemberBase):
    id: int
    
    class Config:
        from_attributes = True
