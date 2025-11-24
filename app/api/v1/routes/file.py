from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.file import File
from app.schemas.file import FileRead

router = APIRouter()


@router.get("/", response_model=list[FileRead])
def list_files(db: Session = Depends(get_db)):
  return db.query(File).all()


@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: int, db: Session = Depends(get_db)):
  file = db.query(File).get(file_id)
  if not file:
    raise HTTPException(status_code=404, detail="File not found")

  db.delete(file)
  db.commit()
