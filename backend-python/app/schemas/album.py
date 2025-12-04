from pydantic import BaseModel
from datetime import date
from typing import Optional

class AlbumBase(BaseModel):
    pet_id: int
    image_path: str
    year: int
    upload_date: Optional[date] = None
    caption: Optional[str] = None
    location: Optional[str] = None
    media_type: Optional[str] = None
    category: Optional[str] = None

class AlbumCreate(AlbumBase):
    pass

class AlbumUpdate(BaseModel):
    pet_id: Optional[int] = None
    image_path: Optional[str] = None
    year: Optional[int] = None
    upload_date: Optional[date] = None
    caption: Optional[str] = None
    location: Optional[str] = None
    media_type: Optional[str] = None
    category: Optional[str] = None

class AlbumResponse(AlbumBase):
    id: int
    
    class Config:
        from_attributes = True
