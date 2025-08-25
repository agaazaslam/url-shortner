from fastapi import APIRouter , status , Depends , HTTPException
from fastapi.responses import RedirectResponse
from typing import List
from typing import Annotated 
from data.database import get_db
from data.schemas import UrlCreate , UrlSend , UrlUpdate
from data.models import UrlTable
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

urlRouter = APIRouter()


# CREATE 

@urlRouter.post('/', status_code=status.HTTP_201_CREATED)
def create_url(url:UrlCreate , db: Session = Depends(get_db)):

    dict_url = url.model_dump(mode='json')
    dict_url["createdAt"] = datetime.now()
    dict_url["shortenCode"] = str(uuid.uuid4())[:4]
    new_url = UrlTable(**dict_url)
    db.add(new_url) 
    db.commit()
    return {"message":"message created Successfully" , "url":dict_url}

# READ 

@urlRouter.get('/', response_model=List[UrlSend])
def get_urls(db: Session = Depends(get_db)):
    urls = db.query(UrlTable).all()
    return urls



@urlRouter.get('/id/{id}', response_model=UrlSend )
def get_url_byId(id: int , db: Annotated[Session, Depends(get_db)]):
    url = db.query(UrlTable).filter(UrlTable.id==id).first()
    if not url:
        raise HTTPException(status_code=404 , detail='Shortened Code not found')
    return url

@urlRouter.get("/{shortenCode}")
def redirect_url(shortenCode:str,db: Annotated[Session, Depends(get_db)]):
    url = db.query(UrlTable).filter(UrlTable.shortenCode == shortenCode).first()
    
    if not url:
        raise HTTPException(status_code=404 , detail='Shortened Code not found')
    url.timesVisited = url.timesVisited + 1 
    originalUrl = url.originalUrl
    db.commit()
    return RedirectResponse(originalUrl)


# UPDATE 

@urlRouter.patch('/{id}', response_model=UrlSend)
def update_note(id: int , urlUpdate: UrlUpdate , db : Annotated[Session , Depends(get_db)]):
    url = db.get(UrlTable,id)
    if not url:
        raise HTTPException(status_code=404 , detail='Shortened Code not found')
    data = urlUpdate.model_dump(mode='json')
    url.originalUrl =  data["updatedUrl"]
    db.commit()
    db.refresh(url)

    return url

# DELETE 

@urlRouter.delete('/{id}' )
def delete_note(id: int ,  db : Annotated[Session , Depends(get_db)]):
    url = db.get(UrlTable,id)
    if not url:
        raise HTTPException(status_code=404 , detail='Shortened Code not found')

    db.delete(url)
    db.commit()

    return {"success":"true", "message": "short url was deleted Successfully " }

