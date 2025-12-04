from sqlalchemy import Column, Integer, Float, Date, Text
from app.database import Base

class GrowthTracking(Base):
    __tablename__ = "growth_tracking"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    tracking_date = Column(Date, nullable=False)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    age_months = Column(Integer)
    notes = Column(Text)
