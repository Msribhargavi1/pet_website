from sqlalchemy import Column, Integer, String, Date, Text
from app.database import Base

class MedicalHistory(Base):
    __tablename__ = "medical_history"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    year = Column(Integer, nullable=False)
    condition = Column(String, nullable=False)
    treatment = Column(Text)
    visit_date = Column(Date)
    hospital = Column(String)
    veterinarian = Column(String)
    notes = Column(Text)
