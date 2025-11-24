from fastapi import FastAPI

from app.core.logging import setup_logging, get_logger
from app.core.database import Base, engine
from app.models import folder as _folder
from app.models import file as _file
from app.api.v1.routes import folder, file
from app.services.folder_watcher import FolderWatcher
from app.core.config import load_config

setup_logging()
logger = get_logger()

app = FastAPI(title="StreamShelf", version="1.0.0")
app.include_router(folder.router, prefix="/api/v1/folder", tags=["folder"])
app.include_router(file.router, prefix="/api/v1/file", tags=["file"])

Base.metadata.create_all(bind=engine)

watcher = None


@app.on_event("startup")
def start_watcher():
  global watcher
  config = load_config()
  folder_path = config.get("default_media_folder", "./media")

  watcher = FolderWatcher(folder_path)
  watcher.start()


@app.on_event("shutdown")
def stop_watcher():
  global watcher
  if watcher:
    watcher.stop()


@app.get("/")
def read_root():
  logger.info("Root endpoint called")
  return {"message": "Welcome to StreamShelf!"}
