from sqlalchemy.orm import Session
from app.models.growth_tracking import GrowthTracking
from app.schemas.growth_tracking import GrowthTrackingCreate, GrowthTrackingUpdate
from typing import List, Optional

def get_all(db: Session) -> List[GrowthTracking]:
    return db.query(GrowthTracking).all()

def get_by_id(db: Session, tracking_id: int) -> Optional[GrowthTracking]:
    return db.query(GrowthTracking).filter(GrowthTracking.id == tracking_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[GrowthTracking]:
    return db.query(GrowthTracking).filter(GrowthTracking.pet_id == pet_id).all()

def create(db: Session, tracking: GrowthTrackingCreate) -> GrowthTracking:
    db_tracking = GrowthTracking(**tracking.model_dump())
    db.add(db_tracking)
    db.commit()
    db.refresh(db_tracking)
    return db_tracking

def update(db: Session, tracking_id: int, tracking: GrowthTrackingUpdate) -> Optional[GrowthTracking]:
    db_tracking = get_by_id(db, tracking_id)
    if db_tracking:
        update_data = tracking.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_tracking, key, value)
        db.commit()
        db.refresh(db_tracking)
    return db_tracking

def delete(db: Session, tracking_id: int) -> Optional[GrowthTracking]:
    db_tracking = get_by_id(db, tracking_id)
    if db_tracking:
        db.delete(db_tracking)
        db.commit()
    return db_tracking
