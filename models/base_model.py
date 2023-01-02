#!/usr/bin/python3
"""This defines the base class which other classes inherit from"""

from datetime import datetime
import uuid


class BaseModel:
    """class definition"""
    def __init__(self, *args, **kwargs):
        """class initialization"""
        if kwargs:
            for k, v in kwargs.items():
                if k not in ('created_at', 'updated_at', 'id'):
                    setattr(self, k, v)
            if 'id' not in self.__dict__:
                self.id = str(uuid.uuid4())
            if 'created_at' not in self.__dict__:
                self.created_at = datetime.now()
            if 'updated_at' not in self.__dict__:
                self.updated_at = datetime.now()
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.now()
            self.updated_at = self.created_at

    def to_dict(self):
        """This returns a dict representation of the object"""
        dictionary = self.__dict__.copy()
        if 'created_at' in dictionary:
            dictionary['created_at'] = self.created_at.isoformat()
        if 'updated_at' in dictionary:
            dictionary['updated_at'] = self.updated_at.isoformat()
        dictionary['__class__'] = self.__class__.__name__
        return dictionary

    def __str__(self):
        """Called when print function is used"""
        return "[{}] ({}) {}".format(self.__class__.__name__,
                                     self.id, self.to_dict())
