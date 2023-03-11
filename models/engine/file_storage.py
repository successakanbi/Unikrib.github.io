#!/usr/bin/python3

import json

class FileStorage:
    """This defines the filestorage class"""

    __objects = []
    __filepath = 'settings/unikrib.json'

    def all(self):
        """This returns all the instances from storage"""
        return self.__objects

    def new(self, url):
        """This create a new instance"""
        if len(url) > 33:
            self.__objects.append(url[33:])
            self.save()
        else:
            pass

    def save(self):
        """This write all the instances into disk"""
        kv_dict = []
        for url in self.__objects:
            kv_dict.append(url)
        
        with open(self.__filepath, 'w', encoding='utf-8') as f:
            json.dump(kv_dict, f)

    def reload(self):
        """This reloads the objects for consistency"""
        try:
            with open(self.__filepath) as f:
                all_kv = json.load(f)
        except Exception:
            pass
        else:
            for url in all_kv:
                self.__objects.append(url)

    def close(self):
        self.reload()

    def delete(self, url):
        if url in self.__objects:
            self.__objects.remove(url)
            self.save()
            return
        