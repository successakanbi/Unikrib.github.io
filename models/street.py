#!/usr/bin/python3
"""Defines the streets"""

from models.base_models import BaseModel


class Street(BaseModel):
    """class definition"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    name = ""
    env_id = ""
