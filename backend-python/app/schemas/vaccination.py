from pydantic import BaseModel
from datetime import date
from typing import Optional

class VaccinationBase(BaseModel):
    pet_id: int
    name: str
    vaccination_date: Optional[date] = None
    next_due_date: Optional[date] = None
    reminder_method: Optional[str] = None
    veterinarian: Optional[str] = None
    hospital: Optional[str] = None
    notes: Optional[str] = None

class VaccinationCreate(VaccinationBase):
    pass

class VaccinationUpdate(BaseModel):
    pet_id: Optional[int] = None
    name: Optional[str] = None
    vaccination_date: Optional[date] = None
    next_due_date: Optional[date] = None
    reminder_method: Optional[str] = None
    veterinarian: Optional[str] = None
    hospital: Optional[str] = None
    notes: Optional[str] = None

class VaccinationResponse(VaccinationBase):
    id: int
    
    class Config:
        from_attributes = True
