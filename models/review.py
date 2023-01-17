#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey

class Review(BaseModel, Base):
    """This defines the reviews class"""
    __tablename__ = 'reviews'
    text = Column(String(2048), nullable=False)
    reviewer = Column(ForeignKey('users.id'), nullable=False)
    reviewee = Column(ForeignKey('users.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
