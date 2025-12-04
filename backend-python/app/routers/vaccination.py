from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.vaccination import VaccinationCreate, VaccinationUpdate, VaccinationResponse
from app.crud import vaccination as crud

router = APIRouter(prefix="/api/vaccinations", tags=["vaccinations"])

@router.get("/", response_model=List[VaccinationResponse])
def get_all_vaccinations(db: Session = Depends(get_db)):
    """Get all vaccinations"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[VaccinationResponse])
def get_vaccinations_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get vaccinations by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/{vaccination_id}", response_model=VaccinationResponse)
def get_vaccination(vaccination_id: int, db: Session = Depends(get_db)):
    """Get vaccination by ID"""
    vaccination = crud.get_by_id(db, vaccination_id)
    if not vaccination:
        raise HTTPException(status_code=404, detail=f"Vaccination with id {vaccination_id} not found")
    return vaccination

@router.post("/", response_model=VaccinationResponse, status_code=201)
def create_vaccination(vaccination: VaccinationCreate, db: Session = Depends(get_db)):
    """Create a new vaccination"""
    return crud.create(db, vaccination)

@router.put("/{vaccination_id}", response_model=VaccinationResponse)
def update_vaccination(vaccination_id: int, vaccination: VaccinationUpdate, db: Session = Depends(get_db)):
    """Update vaccination by ID"""
    updated_vaccination = crud.update(db, vaccination_id, vaccination)
    if not updated_vaccination:
        raise HTTPException(status_code=404, detail=f"Vaccination with id {vaccination_id} not found")
    return updated_vaccination

@router.delete("/{vaccination_id}", status_code=204)
def delete_vaccination(vaccination_id: int, db: Session = Depends(get_db)):
    """Delete vaccination by ID"""
    deleted_vaccination = crud.delete(db, vaccination_id)
    if not deleted_vaccination:
        raise HTTPException(status_code=404, detail=f"Vaccination with id {vaccination_id} not found")
