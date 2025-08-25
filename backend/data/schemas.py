from pydantic import BaseModel , Field, AnyHttpUrl
from datetime import datetime
from typing import Annotated

class UrlCreate(BaseModel):
    originalUrl: AnyHttpUrl
    createdBy: str
    
class UrlUpdate(BaseModel):
    updatedUrl: AnyHttpUrl


class UrlSend(BaseModel):
    id:int
    originalUrl:AnyHttpUrl
    shortenCode:str
    createdAt:datetime
    createdBy : str
    timesVisited:int


class User(BaseModel):
    username:str
    email:str | None
    role:str | None 
    disabled: bool|None = False
    hashed_password:str
    
    class Config:
        orm_mode = True
        

class UserIn(BaseModel):
    username:str
    email:str
    password:str
    
 
class Token(BaseModel):
    access_token:str
    bearer:str
    

     
   