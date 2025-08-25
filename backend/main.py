from fastapi import FastAPI 
from routes.url import urlRouter
from auth.auth import authRouter
from fastapi.middleware.cors import CORSMiddleware
from data.database import createTable
import uuid



app = FastAPI()

origins = ["http://localhost:5173","http://localhost:5174"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # specific origins
    allow_credentials=True,
    allow_methods=["*"],            # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # allow all headers
)

createTable()


@app.get('/')
def welcome():
    return {"message" : "Hello from url-shortner!"}

app.include_router(authRouter,prefix="/v1/auth")
app.include_router(urlRouter,prefix="/v1/urls")