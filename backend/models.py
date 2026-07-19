from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base


class Lead(Base):

    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    mobile = Column(String)

    email = Column(String)

    city = Column(String)

    market = Column(String)

    experience = Column(String)

    message = Column(String)

    status = Column(String, default="New")

    created_at = Column(DateTime, default=datetime.utcnow)