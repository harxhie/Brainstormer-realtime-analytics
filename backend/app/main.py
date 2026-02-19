from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes.data_routes import router as data_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(data_router, prefix="/api/v1")
