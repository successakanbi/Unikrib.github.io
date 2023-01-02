#!/usr/bin/python3
"""defines the various services rendered by the service providers"""

from models.base_model import BaseModel


class Service(BaseModel):
    """class definition"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    name = ""
