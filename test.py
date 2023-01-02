#!/usr/bin/python3

from models.user import User
from models.base_model import BaseModel

if __name__ == '__main__':
    models = User(name="test")
    print(models.to_dict())
    print(models)
