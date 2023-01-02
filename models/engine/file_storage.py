#!/usr/bin/python3

import json

class FileStorage:
    """This sets up the file storage for the objects"""
    __objects = {}
    __file_path = 'unikrib.json'

    def all(self, cls=None):
        """This lists all the objects in storage"""
        if cls is None:
            return self.__objects
        else:
            obj_dict = {}
            for key, obj in self.__objects.items():
                if obj.__class__ == cls or obj.__class__.__name__ == cls:
                    obj_dict[key] = obj
            return obj_dict

    def new(self, obj):
        """This creates a key for a new object to be saved"""
        key = obj.__class__.__name__ + '.' + obj.id
        self.__objects[key] = obj

    def save(self):
        """This writes the objects to disk"""
        obj_json = {}
        for key, obj in self.__objects.items():
            obj_json[key] = obj.to_dict()
        with open(self.__file_path, 'w', encoding='utf-8') as f:
            json.dump(obj_json, f)


    def reload(self):
        """This loads data from the disk into the __objects"""
        try:
            with open(self.__file_path) as f:
                all_objs = json.load(f)
        except Exception:
            pass
        else:
            from models.house import House
            from models.user import User
            from models.street import Street
            from models.environment import Environment
            from models.service import Service

            classes = {
                    "House": House,
                    "User": User,
                    "Street": Street,
                    "Environment": Environment,
                    "Service": Service}
            for key, obj in all_objs.items():
                self.__objects[key] = classes[obj['__class__']](**obj)


    def delete(self, obj):
        """This removes an obj from storage"""
        search_key = obj.__class__.__name__ + '.' + obj.id
        for key, obj in self.__objects.items():
            if search_key == key:
                del self.__objects[key]
                return

    def close(self):
        self.reload()
