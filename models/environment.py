#!/usr/bin/python3
"""This defines the environment e.g Ekosodin, Bdpa ..."""

from models.base_model import BaseModel


class Environment(BaseModel):
    """Class definition"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    name = ""
