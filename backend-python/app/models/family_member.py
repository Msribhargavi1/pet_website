from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class FamilyMember(Base):
    __tablename__ = "family_members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String)
    role = Column(String, default="member")  # admin, member, viewer
    is_admin = Column(Boolean, default=False)
    relationship = Column(String)  # owner, family, caretaker
    notes = Column(String)
