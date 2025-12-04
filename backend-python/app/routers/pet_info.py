from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.pet_info import PetInfoCreate, PetInfoUpdate, PetInfoResponse
from app.crud import pet_info as crud

router = APIRouter(prefix="/api/pets", tags=["pets"])

@router.get("/", response_model=List[PetInfoResponse])
def get_all_pets(db: Session = Depends(get_db)):
    """Get all pets"""
    return crud.get_all(db)

@router.get("/{pet_id}", response_model=PetInfoResponse)
def get_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get pet by ID"""
    pet = crud.get_by_id(db, pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail=f"Pet with id {pet_id} not found")
    return pet

@router.post("/", response_model=PetInfoResponse, status_code=201)
def create_pet(pet: PetInfoCreate, db: Session = Depends(get_db)):
    """Create a new pet"""
    return crud.create(db, pet)

@router.put("/{pet_id}", response_model=PetInfoResponse)
def update_pet(pet_id: int, pet: PetInfoUpdate, db: Session = Depends(get_db)):
    """Update pet by ID"""
    updated_pet = crud.update(db, pet_id, pet)
    if not updated_pet:
        raise HTTPException(status_code=404, detail=f"Pet with id {pet_id} not found")
    return updated_pet

@router.delete("/{pet_id}", status_code=204)
def delete_pet(pet_id: int, db: Session = Depends(get_db)):
    """Delete pet by ID"""
    deleted_pet = crud.delete(db, pet_id)
    if not deleted_pet:
        raise HTTPException(status_code=404, detail=f"Pet with id {pet_id} not found")
