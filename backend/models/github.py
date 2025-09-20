from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class GitHubProject(BaseModel):
    name: str
    description: Optional[str] = None
    url: str
    stars: int = 0
    language: Optional[str] = None
    topics: List[str] = Field(default_factory=list)
    lastUpdated: datetime
    readme: Optional[str] = None

class GitHubResponse(BaseModel):
    success: bool
    projects: List[GitHubProject]
    message: Optional[str] = None