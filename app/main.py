from fastapi import FastAPI
from app.core.logging import setup_logging, get_logger
from app.core.database import Base, engine

# TODO: bring in routes from api/v1/routes

setup_logging()
logger = get_logger()

app = FastAPI(title="StreamShelf", version="1.0.0")
Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
  logger.info("Root endpoint called")
  return {"message": "Welcome to StreamShelf!"}
