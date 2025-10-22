from fastapi import FastAPI

app = FastAPI(title="StreamShelf")

@app.get("/")
def read_root():
    return {"message": "Welcome to StreamShelf!"}
