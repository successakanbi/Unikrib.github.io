#!/usr/bin/python3

from models import storage
from models.user import User
from models.house import House 
from models.environment import Environment
from models.street import Street
from models.service import Service
import json


def store_backup():
    """This retrieves all objects from database and stores them in a file
    """
    all_objs = storage.all()
    objs_list = []

    for key, val in all_objs.items():
        objs_list.append(val.to_dict())

    with open('backup.json', 'w', encoding='utf-8') as f:
        json.dump(objs_list, f)


if __name__ == '__main__':
    store_backup()
