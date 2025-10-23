from pydantic import BaseModel, Field


class FolderBase(BaseModel):
  path: str = Field(..., min_length=1)
  label: str | None = None


class FolderCreate(FolderBase):
  pass


class FolderRead(FolderBase):
  id: int

  class Config:
    from_attributes = True
