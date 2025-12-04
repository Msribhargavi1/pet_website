from sqlalchemy import Column, Integer, String, Date, Boolean, Text
from app.database import Base

class Medication(Base):
    __tablename__ = "medications"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    name = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    quantity_remaining = Column(Integer)
    refill_date = Column(Date)
    medication_type = Column(String)
    purpose = Column(String)
    is_active = Column(Boolean, default=True)
    notes = Column(Text)
