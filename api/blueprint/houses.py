#!/usr/bin/python3

from api.blueprint import app_views
from models.house import House
from flask import abort, jsonify, request

@app_views.route('/houses', strict_slashes=False)
def get_all_houses():
    """This returns a list of all the houses in storage"""
    houses_list = []
    for key, obj in storage.all(House).items():
        houses_list.append(obj.to_dict())

    return jsonify(houses_list)

@app_views.route('/houses/<house_id>', strict_slashes=False)
def get_house(house_id):
    """This return a house of id"""
    search_key = 'House.' + house_id
    for key, obj in storage.all(House).items():
        if key == search_key:
            return jsonify(obj.to_dict())
    abort(404, "House not found")
