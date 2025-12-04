from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    database_url: str = "sqlite:///./petcare.db"
    api_port: int = 8080
    debug: bool = True
    cors_origins: str = "*"
    
    class Config:
        env_file = ".env"

settings = Settings()
