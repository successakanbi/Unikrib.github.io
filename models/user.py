#!/usr/bin/python3

from models.base_model import BaseModel


class User(BaseModel):
    """This defines the user class"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    name = ""
    contact_no = 0
    user_type = ""
    stars = 0.0
