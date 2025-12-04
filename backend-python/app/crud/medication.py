from sqlalchemy.orm import Session
from app.models.medication import Medication
from app.schemas.medication import MedicationCreate, MedicationUpdate
from typing import List, Optional

def get_all(db: Session) -> List[Medication]:
    return db.query(Medication).all()

def get_by_id(db: Session, medication_id: int) -> Optional[Medication]:
    return db.query(Medication).filter(Medication.id == medication_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[Medication]:
    return db.query(Medication).filter(Medication.pet_id == pet_id).all()

def get_active_by_pet_id(db: Session, pet_id: int) -> List[Medication]:
    return db.query(Medication).filter(
        Medication.pet_id == pet_id,
        Medication.is_active == True
    ).all()

def create(db: Session, medication: MedicationCreate) -> Medication:
    db_medication = Medication(**medication.model_dump())
    db.add(db_medication)
    db.commit()
    db.refresh(db_medication)
    return db_medication

def update(db: Session, medication_id: int, medication: MedicationUpdate) -> Optional[Medication]:
    db_medication = get_by_id(db, medication_id)
    if db_medication:
        update_data = medication.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_medication, key, value)
        db.commit()
        db.refresh(db_medication)
    return db_medication

def delete(db: Session, medication_id: int) -> Optional[Medication]:
    db_medication = get_by_id(db, medication_id)
    if db_medication:
        db.delete(db_medication)
        db.commit()
    return db_medication
