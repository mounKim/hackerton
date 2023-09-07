from sqlalchemy import Column, BigInteger, SmallInteger, String, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
  __tablename__ = 'user'

  id = Column(BigInteger, primary_key=True, autoincrement=True)
  name = Column(String, nullable=False)
