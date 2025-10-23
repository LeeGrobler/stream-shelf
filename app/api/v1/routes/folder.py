from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.folder import Folder
from app.schemas.folder import FolderCreate, FolderRead

router = APIRouter()


@router.get("/", response_model=list[FolderRead])
def list_folders(db: Session = Depends(get_db)):
  return db.query(Folder).all()


@router.post("/", response_model=FolderRead, status_code=201)
def create_folder(payload: FolderCreate, db: Session = Depends(get_db)):
  existing = db.query(Folder).filter(Folder.path == payload.path).first()
  if existing:
    raise HTTPException(status_code=409, detail="Folder already exists")

  folder = Folder(path=payload.path, label=payload.label)
  db.add(folder)
  db.commit()
  db.refresh(folder)
  return folder


@router.delete("/{folder_id}", status_code=204)
def delete_folder(folder_id: int, db: Session = Depends(get_db)):
  folder = db.query(Folder).get(folder_id)
  if not folder:
    raise HTTPException(status_code=404, detail="Folder not found")

  db.delete(folder)
  db.commit()
