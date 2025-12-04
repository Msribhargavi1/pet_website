from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.diet_plan import DietPlanCreate, DietPlanUpdate, DietPlanResponse
from app.crud import diet_plan as crud

router = APIRouter(prefix="/api/diet-plan", tags=["diet-plan"])

@router.get("/", response_model=List[DietPlanResponse])
def get_all_diet_plans(db: Session = Depends(get_db)):
    """Get all diet plans"""
    return crud.get_all(db)

@router.get("/pet/{pet_id}", response_model=List[DietPlanResponse])
def get_diet_plan_by_pet(pet_id: int, db: Session = Depends(get_db)):
    """Get diet plan by pet ID"""
    return crud.get_by_pet_id(db, pet_id)

@router.get("/{diet_id}", response_model=DietPlanResponse)
def get_diet_plan(diet_id: int, db: Session = Depends(get_db)):
    """Get diet plan by ID"""
    diet = crud.get_by_id(db, diet_id)
    if not diet:
        raise HTTPException(status_code=404, detail=f"Diet plan with id {diet_id} not found")
    return diet

@router.post("/", response_model=DietPlanResponse, status_code=201)
def create_diet_plan(diet: DietPlanCreate, db: Session = Depends(get_db)):
    """Create a new diet plan"""
    return crud.create(db, diet)

@router.put("/{diet_id}", response_model=DietPlanResponse)
def update_diet_plan(diet_id: int, diet: DietPlanUpdate, db: Session = Depends(get_db)):
    """Update diet plan by ID"""
    updated_diet = crud.update(db, diet_id, diet)
    if not updated_diet:
        raise HTTPException(status_code=404, detail=f"Diet plan with id {diet_id} not found")
    return updated_diet

@router.delete("/{diet_id}", status_code=204)
def delete_diet_plan(diet_id: int, db: Session = Depends(get_db)):
    """Delete diet plan by ID"""
    deleted_diet = crud.delete(db, diet_id)
    if not deleted_diet:
        raise HTTPException(status_code=404, detail=f"Diet plan with id {diet_id} not found")
