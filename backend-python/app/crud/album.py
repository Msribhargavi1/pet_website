from sqlalchemy.orm import Session
from app.models.album import Album
from app.schemas.album import AlbumCreate, AlbumUpdate
from typing import List, Optional

def get_all(db: Session) -> List[Album]:
    return db.query(Album).all()

def get_by_id(db: Session, album_id: int) -> Optional[Album]:
    return db.query(Album).filter(Album.id == album_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[Album]:
    return db.query(Album).filter(Album.pet_id == pet_id).all()

def get_by_pet_id_and_year(db: Session, pet_id: int, year: int) -> List[Album]:
    return db.query(Album).filter(
        Album.pet_id == pet_id,
        Album.year == year
    ).all()

def get_by_year(db: Session, year: int) -> List[Album]:
    return db.query(Album).filter(Album.year == year).all()

def get_by_category(db: Session, category: str) -> List[Album]:
    return db.query(Album).filter(Album.category == category).all()

def get_by_media_type(db: Session, media_type: str) -> List[Album]:
    return db.query(Album).filter(Album.media_type == media_type).all()

def create(db: Session, album: AlbumCreate) -> Album:
    db_album = Album(**album.model_dump())
    db.add(db_album)
    db.commit()
    db.refresh(db_album)
    return db_album

def update(db: Session, album_id: int, album: AlbumUpdate) -> Optional[Album]:
    db_album = get_by_id(db, album_id)
    if db_album:
        update_data = album.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_album, key, value)
        db.commit()
        db.refresh(db_album)
    return db_album

def delete(db: Session, album_id: int) -> Optional[Album]:
    db_album = get_by_id(db, album_id)
    if db_album:
        db.delete(db_album)
        db.commit()
    return db_album
