from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class DietPlan(Base):
    __tablename__ = "diet_plan"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    day_number = Column(Integer, nullable=False)
    meal_type = Column(String, nullable=False)
    items = Column(Text, nullable=False)
    add_ons = Column(Text)
