#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """This defines the user class"""
    __tablename__ = 'users'
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(60), nullable=False)
    phone_no = Column(String(60), nullable=True)
    user_type = Column(String(60), nullable=False)
    com_res = Column(String(60), nullable=True)
    services = relationship("Service", backref="service", cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
