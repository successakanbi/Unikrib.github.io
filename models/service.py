#!/usr/bin/python3\
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey

class Service(BaseModel, Base):
    """This defines the services class"""
    __tablename__ = 'services'
    
    category_id = Column(String(60), ForeignKey('service_categories.id'), nullable=False)
    owner_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    description = Column(String(1024), nullable=False)
    image1 = Column(String(128), nullable=True, default='images/handyman.jpeg')
    image2 = Column(String(128), nullable=True, default='images/handyman.jpeg')
    image3 = Column(String(128), nullable=True, default='images/handyman.jpeg')
    image4 = Column(String(128), nullable=True, default='images/handyman.jpeg')
    image5 = Column(String(128), nullable=True, default='images/handyman.jpeg')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)