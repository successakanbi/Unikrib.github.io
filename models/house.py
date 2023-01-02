#!/usr/bin/python3
"""This defines the apartment class"""

from models.base_model import BaseModel


class House(BaseModel):
    """Class definition"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    price = 0
    colour = ""
    available = True
    storey = 0
    apartment = ""
    picture = ""
    name = ""
    street_id = ""
    description = ""
    owner_id = ""
