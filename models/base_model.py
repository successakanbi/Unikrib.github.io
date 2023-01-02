#!/usr/bin/python3
"""This defines the base class which other classes inherit from"""

from models import storage
from datetime import datetime
import uuid

time = "%Y-%m-%dT%H:%M:%S.%f"

class BaseModel:
    """class definition"""
    def __init__(self, *args, **kwargs):
        """class initialization"""
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at", None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id", None) is None:
                self.id = str(uuid.uuid4())
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

    def save(self):
        """This save the object to storage"""
        storage.new(self)
        storage.save()

    def delete(self):
        """This removes an object from storage"""
        storage.delete(self)
        storage.save()

