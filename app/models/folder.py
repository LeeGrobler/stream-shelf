from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Folder(Base):
  __tablename__ = "folder"

  id = Column(Integer, primary_key=True, index=True)
  path = Column(String, unique=True, index=True, nullable=False)
  label = Column(String, nullable=True)
