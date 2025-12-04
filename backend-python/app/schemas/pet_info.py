from pydantic import BaseModel
from datetime import date
from typing import Optional

class PetInfoBase(BaseModel):
    name: str
    breed: str
    date_of_birth: date
    gender: Optional[str] = None
    color: Optional[str] = None
    microchip_id: Optional[str] = None
    image_path: Optional[str] = None
    notes: Optional[str] = None

class PetInfoCreate(PetInfoBase):
    pass

class PetInfoUpdate(BaseModel):
    name: Optional[str] = None
    breed: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    color: Optional[str] = None
    microchip_id: Optional[str] = None
    image_path: Optional[str] = None
    notes: Optional[str] = None

class PetInfoResponse(PetInfoBase):
    id: int
    
    class Config:
        from_attributes = True
