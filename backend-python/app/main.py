from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.config import settings
from app.routers import (
    pet_info,
    medical_history,
    medication,
    vaccination,
    growth_tracking,
    diet_plan,
    album
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Pet Health Management API",
    description="Backend API for Pet Health Management System - Python/FastAPI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pet_info.router)
app.include_router(medical_history.router)
app.include_router(medication.router)
app.include_router(vaccination.router)
app.include_router(growth_tracking.router)
app.include_router(diet_plan.router)
app.include_router(album.router)

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Pet Health Management API - Python/FastAPI",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "framework": "FastAPI"}
