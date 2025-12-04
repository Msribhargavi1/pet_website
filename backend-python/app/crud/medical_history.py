from sqlalchemy.orm import Session
from app.models.medical_history import MedicalHistory
from app.schemas.medical_history import MedicalHistoryCreate, MedicalHistoryUpdate
from typing import List, Optional

def get_all(db: Session) -> List[MedicalHistory]:
    return db.query(MedicalHistory).all()

def get_by_id(db: Session, history_id: int) -> Optional[MedicalHistory]:
    return db.query(MedicalHistory).filter(MedicalHistory.id == history_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[MedicalHistory]:
    return db.query(MedicalHistory).filter(MedicalHistory.pet_id == pet_id).all()

def create(db: Session, history: MedicalHistoryCreate) -> MedicalHistory:
    db_history = MedicalHistory(**history.model_dump())
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history

def update(db: Session, history_id: int, history: MedicalHistoryUpdate) -> Optional[MedicalHistory]:
    db_history = get_by_id(db, history_id)
    if db_history:
        update_data = history.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_history, key, value)
        db.commit()
        db.refresh(db_history)
    return db_history

def delete(db: Session, history_id: int) -> Optional[MedicalHistory]:
    db_history = get_by_id(db, history_id)
    if db_history:
        db.delete(db_history)
        db.commit()
    return db_history
