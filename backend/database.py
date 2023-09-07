from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json

secrets = json.loads(open('./data.json').read())
db = secrets['DB']

db_url = f"mysql+pymysql://{db['user']}]:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

engine = create_engine(
    db_url, encoding='utf-8'
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
