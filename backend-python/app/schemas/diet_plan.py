from pydantic import BaseModel
from typing import Optional

class DietPlanBase(BaseModel):
    pet_id: int
    day_number: int
    meal_type: str
    items: str
    add_ons: Optional[str] = None

class DietPlanCreate(DietPlanBase):
    pass

class DietPlanUpdate(BaseModel):
    pet_id: Optional[int] = None
    day_number: Optional[int] = None
    meal_type: Optional[str] = None
    items: Optional[str] = None
    add_ons: Optional[str] = None

class DietPlanResponse(DietPlanBase):
    id: int
    
    class Config:
        from_attributes = True
