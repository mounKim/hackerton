from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi_sqlalchemy import db
from pydantic import BaseModel
from models import User

class User(BaseModel):
    name : str
    gender : str
    age : int

HOSTNAME = 'localhost'
PORT = 27017
USERNAME = ''
PASSWORD = ''
DBNAME = ''

app = FastAPI()
MYSQL_URL = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DBNAME}'
app.add_middleware(DBSessionMiddleware, db_url=MYSQL_URL)

@app.post("/")
def now(user: User):
    return user.name

@app.get("/user")
def select_user():
  query = db.session.query(User)
  return query.all()
