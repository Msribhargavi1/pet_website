from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.family_member import FamilyMemberCreate, FamilyMemberUpdate, FamilyMemberResponse
from app.crud import family_member as crud

router = APIRouter(prefix="/api/family-members", tags=["family-members"])

@router.get("/", response_model=List[FamilyMemberResponse])
def get_all_family_members(db: Session = Depends(get_db)):
    """Get all family members"""
    return crud.get_all(db)

@router.get("/admins", response_model=List[FamilyMemberResponse])
def get_admin_members(db: Session = Depends(get_db)):
    """Get all admin family members"""
    return crud.get_admins(db)

@router.get("/{member_id}", response_model=FamilyMemberResponse)
def get_family_member(member_id: int, db: Session = Depends(get_db)):
    """Get family member by ID"""
    member = crud.get_by_id(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail=f"Family member with id {member_id} not found")
    return member

@router.post("/", response_model=FamilyMemberResponse, status_code=201)
def create_family_member(member: FamilyMemberCreate, db: Session = Depends(get_db)):
    """Create a new family member"""
    # Check if email already exists
    existing = crud.get_by_email(db, member.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create(db, member)

@router.put("/{member_id}", response_model=FamilyMemberResponse)
def update_family_member(member_id: int, member: FamilyMemberUpdate, db: Session = Depends(get_db)):
    """Update family member by ID"""
    updated_member = crud.update(db, member_id, member)
    if not updated_member:
        raise HTTPException(status_code=404, detail=f"Family member with id {member_id} not found")
    return updated_member

@router.delete("/{member_id}", status_code=204)
def delete_family_member(member_id: int, db: Session = Depends(get_db)):
    """Delete family member by ID"""
    deleted_member = crud.delete(db, member_id)
    if not deleted_member:
        raise HTTPException(status_code=404, detail=f"Family member with id {member_id} not found")
