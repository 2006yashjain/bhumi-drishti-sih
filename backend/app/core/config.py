from pydantic_settings import BaseSettings
from typing import List, Union
import json

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str
    SYNC_DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    CORS_ORIGINS: Union[str, List[str]] = ["*"]

    class Config:
        env_file = ".env"

    @property
    def get_cors_origins(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            try:
                return json.loads(self.CORS_ORIGINS)
            except:
                return [self.CORS_ORIGINS]
        return self.CORS_ORIGINS

settings = Settings()
