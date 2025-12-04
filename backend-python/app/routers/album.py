from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.album import AlbumCreate, AlbumUpdate, AlbumResponse
from app.crud import album as crud

router = APIRouter(prefix="/api/album", tags=["album"])

@router.get("/", response_model=List[AlbumResponse])
def get_all_album(db: Session = Depends(get_db)):
    """Get all album photos"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[AlbumResponse])
def get_album_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get album by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/pet/{pet_id}/year/{year}", response_model=List[AlbumResponse])
def get_album_by_pet_and_year(pet_id: int, year: int, db: Session = Depends(get_db)):
    """Get album by pet ID and year"""
    return crud.get_by_pet_id_and_year(db, pet_id, year)

@router.get("/{album_id}", response_model=AlbumResponse)
def get_album(album_id: int, db: Session = Depends(get_db)):
    """Get album photo by ID"""
    album = crud.get_by_id(db, album_id)
    if not album:
        raise HTTPException(status_code=404, detail=f"Album with id {album_id} not found")
    return album

@router.post("/", response_model=AlbumResponse, status_code=201)
def create_album(album: AlbumCreate, db: Session = Depends(get_db)):
    """Create a new album photo"""
    return crud.create(db, album)

@router.put("/{album_id}", response_model=AlbumResponse)
def update_album(album_id: int, album: AlbumUpdate, db: Session = Depends(get_db)):
    """Update album photo by ID"""
    updated_album = crud.update(db, album_id, album)
    if not updated_album:
        raise HTTPException(status_code=404, detail=f"Album with id {album_id} not found")
    return updated_album

@router.delete("/{album_id}", status_code=204)
def delete_album(album_id: int, db: Session = Depends(get_db)):
    """Delete album photo by ID"""
    deleted_album = crud.delete(db, album_id)
    if not deleted_album:
        raise HTTPException(status_code=404, detail=f"Album with id {album_id} not found")
