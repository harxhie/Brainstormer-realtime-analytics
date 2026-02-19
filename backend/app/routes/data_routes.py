from fastapi import APIRouter, BackgroundTasks
from app.schemas.data_schema import Message
from app.services.sentiment_service import predict_sentiment
from app.websocket_manager import manager
import asyncio


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
async def create_data(message: Message):
    new_id = len(fake_db) + 1

    new_item = {
        "id": new_id,
        "text": message.text,
        "sentiment": "Pending"
    }

    fake_db.append(new_item)

    # schedule async sentiment worker
    asyncio.create_task(process_sentiment(new_id, message.text))

    return new_item

async def process_sentiment(item_id: int, text: str):
    sentiment = predict_sentiment(text)

    updated_item = None

    for item in fake_db:
        if item["id"] == item_id:
            item["sentiment"] = sentiment
            updated_item = item

    if updated_item:
        await manager.broadcast({
            "type": "sentiment_update",
            "data": updated_item
        })









