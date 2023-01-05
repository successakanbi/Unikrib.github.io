#!/usr/bin/env python3
"""
Database engine
"""

from os import getenv
from sqlalchemy import create_engine, MetaData, and_
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models.user import User
from models.service import Service
from models.house import House
from models.environment import Environment
from models.street import Street

class Storage:
    """
    storage of class instances
    """
    CLASS_DICT = {
        'User': User,
        'Service': Service,
        'House': House,
        'Environment': Environment,
        'Street': Street,
    }

    __engine = None
    __session = None

    def __init__(self):
        """
        initialize the engine
        """
        self.__engine = create_engine(
            'mysql+mysqldb://{}:{}@{}/{}'.format(
                getenv('UNIKRIB_USER'),
                getenv('UNIKRIB_PWD'),
                getenv('UNIKRIB_HOST'),
                getenv('UNIKRIB_DB')))

    def all(self, cls=None):
        """
        returns all objects
        """
        obj_dict = {}
        if cls is not None:
            a_query = self.__session.query(Storage.CLASS_DICT[cls])
            for obj in a_query:
                obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                obj_dict[obj_ref] = obj
        else:
            for cls in Storage.CLASS_DICT.values():
                a_query = self.__session.query(cls)
                for obj in a_query:
                    obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                    obj_dict[obj_ref] = obj

        return obj_dict

    def new(self, obj):
        """
        add object to db
        """
        self.__session.add(obj)

    def save(self):
        """
        commits changes to db session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        deletes obj from db session if obj != None
        """
        if obj:
            self.__session.delete(obj)
            self.save()

    def reload(self):
        """
        creates tables in db and session from engine
        """
        Base.metadata.create_all(self.__engine)
        self.__session = scoped_session(
            sessionmaker(
                bind=self.__engine,
                expire_on_commit=False))

    def close(self):
        """
        calls remove() on session attribute
        """
        self.__session.remove()

    def get(self, cls, id):
        """
        gets one object based on the class and id
        """
        if cls and id:
            obj_str = '{}.{}'.format(cls, id)
            all_obj = self.all(cls)
            return all_obj.get(obj_str)
        return None
    
    
    

    def count(self, cls=None):
        """
        returns count of all objects
        """
        return (len(self.all(cls)))
