from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, Field


class Status(str, Enum):
    NEW = "NEW"
    BOUND = "BOUND"


class CreateSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    companyName: str
    physicalAddress: str
    annualRevenue: float
    additionalInfo: Optional[str] = None


class UpdateSubmission(BaseModel):
    id: str
    companyName: Optional[str] = None
    physicalAddress: Optional[str] = None
    annualRevenue: Optional[float] = None
    application: Optional[str] = None
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class Submission(BaseModel):
    id: str
    companyName: str
    physicalAddress: str
    annualRevenue: float
    application: Optional[str] = None
    status: Status = Status.NEW
    createdAt: datetime = datetime.utcnow()
    updatedAt: Optional[datetime] = None
