from pydantic import BaseModel


class FileRead(BaseModel):
  id: int
  path: str
  name: str
  folder_path: str

  class Config:
    from_attributes = True
