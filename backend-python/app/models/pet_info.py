from sqlalchemy import Column, Integer, String, Date, Text
from app.database import Base

class PetInfo(Base):
    __tablename__ = "pet_info"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    breed = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String)
    color = Column(String)
    microchip_id = Column(String)
    image_path = Column(String)
    notes = Column(Text)
