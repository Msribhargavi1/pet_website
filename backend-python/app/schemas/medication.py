from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicationBase(BaseModel):
    pet_id: int
    name: str
    dosage: str
    quantity_remaining: Optional[int] = None
    refill_date: Optional[date] = None
    medication_type: Optional[str] = None
    purpose: Optional[str] = None
    is_active: Optional[bool] = True
    notes: Optional[str] = None

class MedicationCreate(MedicationBase):
    pass

class MedicationUpdate(BaseModel):
    pet_id: Optional[int] = None
    name: Optional[str] = None
    dosage: Optional[str] = None
    quantity_remaining: Optional[int] = None
    refill_date: Optional[date] = None
    medication_type: Optional[str] = None
    purpose: Optional[str] = None
    is_active: Optional[bool] = None
    notes: Optional[str] = None

class MedicationResponse(MedicationBase):
    id: int
    
    class Config:
        from_attributes = True
