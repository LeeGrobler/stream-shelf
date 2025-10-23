from fastapi import FastAPI

from app.core.logging import setup_logging, get_logger
from app.core.database import Base, engine
from app.models import folder as _folder
from app.models import media_file as _file
from app.api.v1.routes import folder

setup_logging()
logger = get_logger()

app = FastAPI(title="StreamShelf", version="1.0.0")
app.include_router(folder.router, prefix="/api/v1/folder", tags=["folder"])

Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
  logger.info("Root endpoint called")
  return {"message": "Welcome to StreamShelf!"}
