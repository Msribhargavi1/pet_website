from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.medical_history import MedicalHistoryCreate, MedicalHistoryUpdate, MedicalHistoryResponse
from app.crud import medical_history as crud

router = APIRouter(prefix="/api/medical-history", tags=["medical-history"])

@router.get("/", response_model=List[MedicalHistoryResponse])
def get_all_medical_history(db: Session = Depends(get_db)):
    """Get all medical history records"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[MedicalHistoryResponse])
def get_medical_history_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get medical history by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/{history_id}", response_model=MedicalHistoryResponse)
def get_medical_history(history_id: int, db: Session = Depends(get_db)):
    """Get medical history by ID"""
    history = crud.get_by_id(db, history_id)
    if not history:
        raise HTTPException(status_code=404, detail=f"Medical history with id {history_id} not found")
    return history

@router.post("/", response_model=MedicalHistoryResponse, status_code=201)
def create_medical_history(history: MedicalHistoryCreate, db: Session = Depends(get_db)):
    """Create a new medical history record"""
    return crud.create(db, history)

@router.put("/{history_id}", response_model=MedicalHistoryResponse)
def update_medical_history(history_id: int, history: MedicalHistoryUpdate, db: Session = Depends(get_db)):
    """Update medical history by ID"""
    updated_history = crud.update(db, history_id, history)
    if not updated_history:
        raise HTTPException(status_code=404, detail=f"Medical history with id {history_id} not found")
    return updated_history

@router.delete("/{history_id}", status_code=204)
def delete_medical_history(history_id: int, db: Session = Depends(get_db)):
    """Delete medical history by ID"""
    deleted_history = crud.delete(db, history_id)
    if not deleted_history:
        raise HTTPException(status_code=404, detail=f"Medical history with id {history_id} not found")
