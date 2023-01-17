#!/usr/bin/python3

import cmd
from models import storage
from models.house import House
from models.service import Service
from models.environment import Environment
from models.street import Street
from models.user import User
from models.review import Review


classes = {
        "House": House,
        "Service": Service,
        "Environment": Environment,
        "Street": Street,
        "User": User,
        "Review": Review}

class Unikrib(cmd.Cmd):
    """This is to enable me manipulate the objects"""
    prompt = "(unikrib) "

    def do_quit(self, args):
        """This quits the console"""
        return True

    def do_all(self, args):
        """This shows a list of all objects in storage
        usage: (unikrib) all <class name>"""
        obj_list = []
        if not args:
            obj_dict = storage.all()
        else:
            line_arg = args.split()
            if line_arg[0] not in classes:
                print("* Class not valid *")
                return False
            else:
                obj_dict = storage.all(line_arg[0])
        for key, val in obj_dict.items():
            obj_list.append(val.to_dict())
        for item in obj_list:
            print(item)

    def do_create(self, args):
        """This create a new object and stores it in storage
        usage: (unikrib) create <class name>"""
        if not args:
            print("* Please enter a class name *")
            return False
        line_args = args.split()
        if line_args[0] not in classes:
            print("* Please enter a valid class name *")
            return False
        class_dict = {}
        for item in line_args[1:]:
            if '=' in item:
                key = item.split('=')[0]
                val = item.split('=')[1].replace('_', ' ')
                class_dict[key] = val
        if line_args[0] == 'House':
            if 'price' not in class_dict:
                print("* Please include a price *")
                return False
            if 'apartment' not in class_dict:
                print("* Please include an apartment type *")
                return False
            if 'owner_id' not in class_dict:
                print("* Please include an owner_id *")
                return False
            if 'street_id' not in class_dict:
                print("* Please include a street_id *")
                return False
        if line_args[0] == 'User':
            if 'first_name' not in class_dict:
                print("* Please include user first_name *")
                return False
            if 'user_type' not in class_dict:
                print("* Please include user_type *")
                return False
            if "email" not in class_dict:
                print("* Please include email *")
                return False
            if "password" not in class_dict:
                print("* Please include password *")
                return False
        if line_args[0] == 'Environment':
            if "name" not in class_dict:
                print("* Please include environment name *")
                return False
        if line_args[0] == "Street":
            if "name" not in class_dict:
                print("* Please include street name *")
                return False
            if "env_id" not in class_dict:
                print("* Please include env_id *")
                return False
        if line_args[0] == 'Service':
            if "name" not in class_dict:
                print("* Please include service name *")
                return False
            if "owner_id" not in class_dict:
                print("* Please include owner_id *")
                return False
        if line_args[0] == 'Review':
            if 'text' not in class_dict:
                print("* Please include a text review *")
                return False
            if 'reviewer' not in class_dict:
                print("* Please include a reviewer *")
                return False
            if 'reviewee' not in class_dict:
                print("* Please include a reviewee *")
                return False
        model = classes[line_args[0]](**class_dict)
        print(model.id)
        model.save()

    def do_destroy(self, args):
        """This destroys an object from storage
        usage: (unikrib) destroy <class name> <class id>"""
        if not args:
            print("* Enter a class name *")
            return False
        line_args = args.split()
        if line_args[0] not in classes:
            print("* Please enter a valid class name *")
            return False
        if len(line_args) < 2:
            print("* Please enter a class id *")
            return False
        key_search = line_args[0] + '.' + line_args[1]
        if key_search in storage.all(line_args[0]):
            obj = storage.all(line_args[0])[key_search]
            obj.delete()
            storage.save()
            return
        else:
            print("* You entered an invalid instance *")
            return False

    def do_update(self, args):
        """This updates an object in storage
        Usage: update <class name> <class id> <key> <value>"""
        if not args:
            print("* Please enter a class name *")
            return False
        line_args = args.split()
        if line_args[0] not in classes:
            print("* You entered an invalid class, please try again *")
            return False
        if len(line_args) < 2:
            print("* Please enter an id *")
            return False
        elif len(line_args) < 3:
            print("* Please enter a key *")
            return False
        elif len(line_args) < 4:
            print("* Please enter a value *")
            return False
        search_key = line_args[0] + '.' + line_args[1]
        k = line_args[2]
        if k != 'password':
            v = line_args[3].replace('_', ' ')
        else:
            v = line_args[3]
        if search_key in storage.all(line_args[0]):
            obj = storage.all()[search_key]
            setattr(obj, k, v)
            obj.save()
        else:
            print("* No instance found *")
            return False

    def do_count(self, args):
        """This prints the count of the available objects"""
        if args:
            line_args = args.split()
            if line_args[0] not in classes:
                print("* Please enter a valid class *")
                return False
            count = storage.count(line_args[0])
            print(count)
        else:
            print(storage.count())

    def do_show(self, args):
        """This prints a specific object based on cls and id
        usage: show <class name> <object id>"""
        if not args:
            print("* Please include a class name *")
            return False
        line_args = args.split()
        if line_args[0] not in classes:
            print("* Please enter a valid class name *")
            return False
        cls = line_args[0]
        cls_id = line_args[1]
        obj = storage.get(cls, cls_id)
        if obj is None:
            print("* No instance found *")
            return False
        else:
            print(obj.to_dict())



if __name__ == '__main__':
    Unikrib().cmdloop()
