from fastapi import APIRouter
from app.schemas import MessageCreate
from datetime import datetime


router = APIRouter()

# temporary in-memory storage (we will replace with database later)
fake_db = []

@router.get("/")
def home():
    return {"message": "Backend running 🚀"}

@router.get("/data")
def get_data():
    return fake_db


@router.post("/data")
def create_data(message: MessageCreate):
    new_item = {
        "id": len(fake_db) + 1,
        "text": message.text,
        "timestamp": datetime.now().strftime("%H:%M:%S")
    }
    fake_db.append(new_item)
    return new_item

