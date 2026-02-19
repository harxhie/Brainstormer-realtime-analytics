from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes.data_routes import router as data_router
import threading
from app.worker import start_worker
from fastapi import WebSocket
from app.websocket_manager import manager



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(data_router, prefix="/api/v1")
threading.Thread(target=start_worker, daemon=True).start()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)


