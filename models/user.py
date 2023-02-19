#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Float
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
    avatar = Column(String(128), nullable=True, default='images/default-img.webp')
    note = Column(String(1024), nullable=True, default='I provide the best products/services')
    rating = Column(Float, nullable=False, default=0)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
