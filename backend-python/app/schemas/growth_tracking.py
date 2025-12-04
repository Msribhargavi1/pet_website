from pydantic import BaseModel
from datetime import date
from typing import Optional

class GrowthTrackingBase(BaseModel):
    pet_id: int
    tracking_date: date
    weight: float
    height: float
    age_months: Optional[int] = None
    notes: Optional[str] = None

class GrowthTrackingCreate(GrowthTrackingBase):
    pass

class GrowthTrackingUpdate(BaseModel):
    pet_id: Optional[int] = None
    tracking_date: Optional[date] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    age_months: Optional[int] = None
    notes: Optional[str] = None

class GrowthTrackingResponse(GrowthTrackingBase):
    id: int
    
    class Config:
        from_attributes = True
