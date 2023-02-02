#!/usr/bin/python3\
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey

class Service(BaseModel, Base):
    """This defines the services class"""
    __tablename__ = 'services'
    title = Column(String(128), nullable=False)
    owner_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    description = Column(String(1024), nullable=False)
    image1 = Column(String(128), nullable=True)
    image2 = Column(String(128), nullable=True)
    image3 = Column(String(128), nullable=True)
    image4 = Column(String(128), nullable=True)
    image5 = Column(String(128), nullable=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)