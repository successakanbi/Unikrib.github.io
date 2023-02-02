#!/usr/bin/python3
"""defines the various services rendered by the service providers"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Product(BaseModel, Base):
    """This defines the service objects"""
    __tablename__ = 'products'
    name = Column(String(128), nullable=False)
    owner_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    price = Column(Integer, nullable=False)
    image1 = Column(String(128), nullable=True)
    image2 = Column(String(128), nullable=True)
    image3 = Column(String(128), nullable=True)
    image4 = Column(String(128), nullable=True)
    image5 = Column(String(128), nullable=True)
    category_id = Column(String(128), ForeignKey('categories.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


