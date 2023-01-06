#!/usr/bin/python3

from models.user import User
from models.base_model import BaseModel
from models import storage

if __name__ == '__main__':
    objs = storage.all(User)
    for key, obj in objs.items():
        print(obj.to_dict())
