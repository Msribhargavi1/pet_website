from sqlalchemy.orm import Session
from app.models.diet_plan import DietPlan
from app.schemas.diet_plan import DietPlanCreate, DietPlanUpdate
from typing import List, Optional

def get_all(db: Session) -> List[DietPlan]:
    return db.query(DietPlan).all()

def get_by_id(db: Session, diet_id: int) -> Optional[DietPlan]:
    return db.query(DietPlan).filter(DietPlan.id == diet_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[DietPlan]:
    return db.query(DietPlan).filter(DietPlan.pet_id == pet_id).all()

def create(db: Session, diet: DietPlanCreate) -> DietPlan:
    db_diet = DietPlan(**diet.model_dump())
    db.add(db_diet)
    db.commit()
    db.refresh(db_diet)
    return db_diet

def update(db: Session, diet_id: int, diet: DietPlanUpdate) -> Optional[DietPlan]:
    db_diet = get_by_id(db, diet_id)
    if db_diet:
        update_data = diet.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_diet, key, value)
        db.commit()
        db.refresh(db_diet)
    return db_diet

def delete(db: Session, diet_id: int) -> Optional[DietPlan]:
    db_diet = get_by_id(db, diet_id)
    if db_diet:
        db.delete(db_diet)
        db.commit()
    return db_diet
