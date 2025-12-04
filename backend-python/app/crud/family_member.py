from sqlalchemy.orm import Session
from app.models.family_member import FamilyMember
from app.schemas.family_member import FamilyMemberCreate, FamilyMemberUpdate
from typing import List, Optional

def get_all(db: Session) -> List[FamilyMember]:
    return db.query(FamilyMember).all()

def get_by_id(db: Session, member_id: int) -> Optional[FamilyMember]:
    return db.query(FamilyMember).filter(FamilyMember.id == member_id).first()

def get_by_email(db: Session, email: str) -> Optional[FamilyMember]:
    return db.query(FamilyMember).filter(FamilyMember.email == email).first()

def get_admins(db: Session) -> List[FamilyMember]:
    return db.query(FamilyMember).filter(FamilyMember.is_admin == True).all()

def create(db: Session, member: FamilyMemberCreate) -> FamilyMember:
    db_member = FamilyMember(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

def update(db: Session, member_id: int, member: FamilyMemberUpdate) -> Optional[FamilyMember]:
    db_member = get_by_id(db, member_id)
    if db_member:
        update_data = member.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_member, key, value)
        db.commit()
        db.refresh(db_member)
    return db_member

def delete(db: Session, member_id: int) -> Optional[FamilyMember]:
    db_member = get_by_id(db, member_id)
    if db_member:
        db.delete(db_member)
        db.commit()
    return db_member
