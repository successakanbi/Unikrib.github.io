#!/usr/bin/python3

from models.user import User
from models.base_model import BaseModel
from models import storage

if __name__ == '__main__':
    print(storage.count(User))