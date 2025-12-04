from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.medication import MedicationCreate, MedicationUpdate, MedicationResponse
from app.crud import medication as crud

router = APIRouter(prefix="/api/medications", tags=["medications"])

@router.get("/", response_model=List[MedicationResponse])
def get_all_medications(db: Session = Depends(get_db)):
    """Get all medications"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[MedicationResponse])
def get_medications_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get medications by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/pet/{pet_id}/active", response_model=List[MedicationResponse])
def get_active_medications_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get active medications by pet ID"""
    return crud.get_active_by_pet_id(db, pet_id)

@router.get("/{medication_id}", response_model=MedicationResponse)
def get_medication(medication_id: int, db: Session = Depends(get_db)):
    """Get medication by ID"""
    medication = crud.get_by_id(db, medication_id)
    if not medication:
        raise HTTPException(status_code=404, detail=f"Medication with id {medication_id} not found")
    return medication

@router.post("/", response_model=MedicationResponse, status_code=201)
def create_medication(medication: MedicationCreate, db: Session = Depends(get_db)):
    """Create a new medication"""
    return crud.create(db, medication)

@router.put("/{medication_id}", response_model=MedicationResponse)
def update_medication(medication_id: int, medication: MedicationUpdate, db: Session = Depends(get_db)):
    """Update medication by ID"""
    updated_medication = crud.update(db, medication_id, medication)
    if not updated_medication:
        raise HTTPException(status_code=404, detail=f"Medication with id {medication_id} not found")
    return updated_medication

@router.delete("/{medication_id}", status_code=204)
def delete_medication(medication_id: int, db: Session = Depends(get_db)):
    """Delete medication by ID"""
    deleted_medication = crud.delete(db, medication_id)
    if not deleted_medication:
        raise HTTPException(status_code=404, detail=f"Medication with id {medication_id} not found")
