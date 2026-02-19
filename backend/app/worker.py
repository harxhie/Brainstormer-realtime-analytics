import time
from app.routes.data_routes import fake_db
from app.services.sentiment_service import predict_sentiment

def start_worker():
    print("🧠 AI Worker Started...")

    while True:
        for item in fake_db:
            if item["sentiment"] == "Pending":
                item["sentiment"] = predict_sentiment(item["text"])
        time.sleep(2)
