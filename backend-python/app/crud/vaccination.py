from sqlalchemy.orm import Session
from app.models.vaccination import Vaccination
from app.schemas.vaccination import VaccinationCreate, VaccinationUpdate
from typing import List, Optional

def get_all(db: Session) -> List[Vaccination]:
    return db.query(Vaccination).all()

def get_by_id(db: Session, vaccination_id: int) -> Optional[Vaccination]:
    return db.query(Vaccination).filter(Vaccination.id == vaccination_id).first()

def get_by_pet_id(db: Session, pet_id: int) -> List[Vaccination]:
    return db.query(Vaccination).filter(Vaccination.pet_id == pet_id).all()

def create(db: Session, vaccination: VaccinationCreate) -> Vaccination:
    db_vaccination = Vaccination(**vaccination.model_dump())
    db.add(db_vaccination)
    db.commit()
    db.refresh(db_vaccination)
    return db_vaccination

def update(db: Session, vaccination_id: int, vaccination: VaccinationUpdate) -> Optional[Vaccination]:
    db_vaccination = get_by_id(db, vaccination_id)
    if db_vaccination:
        update_data = vaccination.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_vaccination, key, value)
        db.commit()
        db.refresh(db_vaccination)
    return db_vaccination

def delete(db: Session, vaccination_id: int) -> Optional[Vaccination]:
    db_vaccination = get_by_id(db, vaccination_id)
    if db_vaccination:
        db.delete(db_vaccination)
        db.commit()
    return db_vaccination
