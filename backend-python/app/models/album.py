from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Album(Base):
    __tablename__ = "album"
    
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, nullable=False, index=True)
    image_path = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    upload_date = Column(Date)
    caption = Column(String)
    location = Column(String)
    media_type = Column(String)
    category = Column(String)
