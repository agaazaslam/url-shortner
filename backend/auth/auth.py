from datetime import datetime , timezone , timedelta
from pydantic import BaseModel
from typing import Annotated
from fastapi import APIRouter , Depends , status , HTTPException
from fastapi.security import OAuth2PasswordBearer , OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from data.database import get_db
import jwt
from passlib.context import CryptContext
from data.schemas import User , UserIn
from data.models import UserTable
from typing import List 


ALGORITHM = 'HS256'
SECRET_KEY = 'agaazaslam'
ACCESS_TOKEN_EXPIRES_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauthscheme2 = OAuth2PasswordBearer(tokenUrl="token")

authRouter = APIRouter()


def hash_password(plain_password):
    return  pwd_context.hash(plain_password)


def verify_password(plain_password , hashed_password):
    return  pwd_context.verify(plain_password,hashed_password)  

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

    
def get_user(db, username: str):
    user = db.query(UserTable).filter(UserTable.username==username).first()
    if not user :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user


def authenticate_user(db : Session , username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user  
    

def get_current_user(token:Annotated[str,Depends(oauthscheme2)] , db: Annotated[Session,Depends(get_db)]):
    payload = jwt.decode(token,SECRET_KEY,ALGORITHM)
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    user = get_user(db,username)
    # Converting a ORM Object to pydantic model object 
    user_pydantic = User.model_validate(user,from_attributes=True)
    
    return user_pydantic
    

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    return current_user
    
    
# ROUTES 

@authRouter.post('/signup')
def signup(data:UserIn , db: Annotated[Session,Depends(get_db)]):
    #Convert pydantic model to plain python dictionary 
    dict_data = data.model_dump()
    dict_data.pop("password",None)
    hashed_password = hash_password(data.password)
    dict_data["hashed_password"] = hashed_password
    dict_data["role"] = "user"
    dict_data["createdAt"]=datetime.now()
    insertData = UserTable(**dict_data)
    db.add(insertData)
    db.commit()
    return {"message":"User added To the Table" , "data" : dict_data}


@authRouter.post('/login')
def login_for_access_token(form_data : Annotated[OAuth2PasswordRequestForm , Depends()] , db: Annotated[Session , Depends(get_db)]):

    user = authenticate_user( db ,form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=404)
    expire_delta = timedelta(minutes=30)

    access_token = create_access_token(data={"sub":user.username} , expires_delta=expire_delta)
    return access_token

@authRouter.get('/', response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserTable).all()
    return users 




@authRouter.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user
