#!/usr/bin/python3

from models import storage
from models.user import User 
from models.house import House 
from models.street import Street
from models.service import Service
from models.environment import Environment
import json


def retrieve_objs():
    """This retrieves the objects from file storage and stores them into the
    database"""

    obj_keys = {'User': User, 'House': House,
            'Street': Street, 'Service': Service,
            'Environment': Environment}

    with open('backup.json') as f:
        all_obj_dict = json.load(f)

    for item in all_obj_dict:
        model = obj_keys[item['__class__']](**item)
        model.save()
    print("Successfully retrieved!!!")


if __name__ == '__main__':
    retrieve_objs()
