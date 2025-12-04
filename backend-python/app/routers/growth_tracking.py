from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.growth_tracking import GrowthTrackingCreate, GrowthTrackingUpdate, GrowthTrackingResponse
from app.crud import growth_tracking as crud

router = APIRouter(prefix="/api/growth-tracking", tags=["growth-tracking"])

@router.get("/", response_model=List[GrowthTrackingResponse])
def get_all_growth_tracking(db: Session = Depends(get_db)):
    """Get all growth tracking records"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[GrowthTrackingResponse])
def get_growth_tracking_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get growth tracking by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/{tracking_id}", response_model=GrowthTrackingResponse)
def get_growth_tracking(tracking_id: int, db: Session = Depends(get_db)):
    """Get growth tracking by ID"""
    tracking = crud.get_by_id(db, tracking_id)
    if not tracking:
        raise HTTPException(status_code=404, detail=f"Growth tracking with id {tracking_id} not found")
    return tracking

@router.post("/", response_model=GrowthTrackingResponse, status_code=201)
def create_growth_tracking(tracking: GrowthTrackingCreate, db: Session = Depends(get_db)):
    """Create a new growth tracking record"""
    return crud.create(db, tracking)

@router.put("/{tracking_id}", response_model=GrowthTrackingResponse)
def update_growth_tracking(tracking_id: int, tracking: GrowthTrackingUpdate, db: Session = Depends(get_db)):
    """Update growth tracking by ID"""
    updated_tracking = crud.update(db, tracking_id, tracking)
    if not updated_tracking:
        raise HTTPException(status_code=404, detail=f"Growth tracking with id {tracking_id} not found")
    return updated_tracking

@router.delete("/{tracking_id}", status_code=204)
def delete_growth_tracking(tracking_id: int, db: Session = Depends(get_db)):
    """Delete growth tracking by ID"""
    deleted_tracking = crud.delete(db, tracking_id)
    if not deleted_tracking:
        raise HTTPException(status_code=404, detail=f"Growth tracking with id {tracking_id} not found")
