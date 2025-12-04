from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicalHistoryBase(BaseModel):
    pet_id: int
    year: int
    condition: str
    treatment: Optional[str] = None
    visit_date: Optional[date] = None
    hospital: Optional[str] = None
    veterinarian: Optional[str] = None
    notes: Optional[str] = None

class MedicalHistoryCreate(MedicalHistoryBase):
    pass

class MedicalHistoryUpdate(BaseModel):
    pet_id: Optional[int] = None
    year: Optional[int] = None
    condition: Optional[str] = None
    treatment: Optional[str] = None
    visit_date: Optional[date] = None
    hospital: Optional[str] = None
    veterinarian: Optional[str] = None
    notes: Optional[str] = None

class MedicalHistoryResponse(MedicalHistoryBase):
    id: int
    
    class Config:
        from_attributes = True
