from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker , declarative_base
import os 
from dotenv import load_dotenv

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL")
 
if POSTGRES_URL is None :
    raise ValueError("POSTGRES_URL is not set in the environment")

engine = create_engine(POSTGRES_URL,echo=True)

SessionLocal = sessionmaker(bind=engine , autocommit=False , autoflush=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def createTable():
    Base.metadata.create_all(bind=engine)


# Postgres MODEL FOR URL 
