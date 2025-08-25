from sqlalchemy import  Column , Integer , String , DateTime
from data.database import Base


class UrlTable(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    originalUrl = Column(String, unique=True , nullable=False)
    shortenCode = Column(String, nullable=True)
    createdAt = Column(DateTime,nullable=True)
    createdBy = Column(String, nullable=False) 
    timesVisited = Column(Integer, default=0)


class UserTable(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    email = Column(String, nullable=True)
    createdAt = Column(DateTime,nullable=True)
    role = Column(String, nullable=True)  



