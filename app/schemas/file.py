from pydantic import BaseModel


class MediaFileRead(BaseModel):
  id: int
  path: str
  name: str
  folder_path: str

  class Config:
    from_attributes = True
