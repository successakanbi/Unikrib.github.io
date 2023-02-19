#!/usr/bin/python3

import json

class FileStorage:
    """This defines the filestorage class"""

    __objects = {}
    __filepath = 'unikrib.json'

    def all(self):
        return self.__objects

    def get(self, url):
        try:
            return self.__objects[url[33:]]
        except Exception:
            return None

    def new(self, url, fileId):
        self.__objects[url[33:]] = fileId
        self.save()

    def save(self):
        kv_dict = {}
        for k, v in self.__objects.items():
            kv_dict[k] = v
        
        with open(self.__filepath, 'w', encoding='utf-8') as f:
            json.dump(kv_dict, f)

    def reload(self):
        try:
            with open(self.__filepath) as f:
                all_kv = json.load(f)
        except Exception:
            pass
        else:
            for url, fileId in all_kv.items():
                self.__objects[url] = fileId

    def close(self):
        self.reload()

    def delete(self, url):
        for key, val in self.__objects.items():
            if key == url[33:]:
                del self.__objects[key]
                self.save()
                return "success"
        return "Not found"
        