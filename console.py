#!/usr/bin/python3

import cmd
from models import storage
from models.house import House
from models.service import Service
from models.environment import Environment
from models.street import Street
from models.user import User


classes = {
        "House": House,
        "Service": Service,
        "Environment": Environment,
        "Street": Street,
        "User": User}

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
                obj_dict = storage.all(args)
        for key, val in obj_dict.items():
            obj_list.append(val.to_dict())
        print(obj_list)

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
                val = item.split('=')[1]
                class_dict[key] = val
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
        for key, obj in storage.all(line_args[0]).items():
            if key == key_search:
                obj.delete()
                storage.save()
                return {}
        print("* You entered an invalid instance *")
        return False


if __name__ == '__main__':
    Unikrib().cmdloop()
