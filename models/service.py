#!/usr/bin/python3
"""defines the various services rendered by the service providers"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Service(BaseModel, Base):
    """This defines the service objects"""
    __tablename__ = 'services'
    name = Column(String(128), nullable=False)
    owner_id = Column(String(60), ForeignKey('users.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


