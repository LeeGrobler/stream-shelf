from sqlalchemy import Column, Integer, String
from app.core.database import Base


class File(Base):
  __tablename__ = "media_file"

  id = Column(Integer, primary_key=True, index=True)
  path = Column(String, unique=True, index=True, nullable=False)
  name = Column(String, nullable=False)
  folder_path = Column(String, index=True, nullable=False)
  # ffmpeg-future: duration, width, height, codec, thumb_path, preview_path
