#!/usr/bin/python3

from models import storage
from api.blueprint import app_views
from flask import abort, request, jsonify
from models.user import User


@app_views.route('/users', strict_slashes=False)
def get_all_users():
    """This returns a list of all the user objects in storage"""
    user_list = []
    for key, obj in storage.all(User).items():
        user_list.append(obj.to_dict())

    return jsonify(user_list)

@app_views.route('/users/<user_id>', strict_slashes=False)
def get_user(user_id):
    """This returns a user based on id"""
    search_key = 'User.' + user_id
    for key, obj in storage.all(User).items():
        if key == search_key:
            return jsonify(obj.to_dict())
    abort(404, "No User Found")
