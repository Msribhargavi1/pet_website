from sqlalchemy.orm import Session
from app.models.pet_info import PetInfo
from app.schemas.pet_info import PetInfoCreate, PetInfoUpdate
from typing import List, Optional

def get_all(db: Session) -> List[PetInfo]:
    return db.query(PetInfo).all()

def get_by_id(db: Session, pet_id: int) -> Optional[PetInfo]:
    return db.query(PetInfo).filter(PetInfo.id == pet_id).first()

def create(db: Session, pet: PetInfoCreate) -> PetInfo:
    db_pet = PetInfo(**pet.model_dump())
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

def update(db: Session, pet_id: int, pet: PetInfoUpdate) -> Optional[PetInfo]:
    db_pet = get_by_id(db, pet_id)
    if db_pet:
        update_data = pet.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_pet, key, value)
        db.commit()
        db.refresh(db_pet)
    return db_pet

def delete(db: Session, pet_id: int) -> Optional[PetInfo]:
    db_pet = get_by_id(db, pet_id)
    if db_pet:
        db.delete(db_pet)
        db.commit()
    return db_pet
