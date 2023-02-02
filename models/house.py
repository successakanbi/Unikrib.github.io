#!/usr/bin/python3
"""This defines the apartment class"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class House(BaseModel, Base):
    """Class definition"""
    __tablename__ = 'houses'
    price = Column(Integer, nullable=False)
    colour = Column(String(60), nullable=True)
    available = Column(Boolean(60), nullable=True)
    storey = Column(Integer, nullable=False, default=1)
    apartment = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    street_id = Column(ForeignKey('streets.id'))
    description = Column(String(1024), nullable=True)
    running_water = Column(String(3), nullable=True)
    waste_disposal = Column(String(3), nullable=True)
    power_supply = Column(Integer, nullable=True)
    image1 = Column(String(128), nullable=True)
    image2 = Column(String(128), nullable=True)
    image3 = Column(String(128), nullable=True)
    owner_id = Column(ForeignKey('users.id'))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
