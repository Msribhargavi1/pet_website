from sqlalchemy import Column, Integer, String, Date, Text
from app.database import Base

class Vaccination(Base):
    __tablename__ = "vaccinations"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    name = Column(String, nullable=False)
    vaccination_date = Column(Date)
    next_due_date = Column(Date)
    reminder_method = Column(String)
    veterinarian = Column(String)
    hospital = Column(String)
    notes = Column(Text)
