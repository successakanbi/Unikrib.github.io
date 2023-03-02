#!/usr/bin/python3

from models import storage
from models.street import Street
from api.blueprint import app_views
from flask import abort, request, jsonify

@app_views.route('/streets', strict_slashes=False)
def all_str():
    """This returns a list of all streets"""
    all_str = []
    for key, obj in storage.all(Street).items():
        all_str.append(obj.to_dict())

    sorted_list = sorted(all_str, key=lambda d: d['name'])
    return jsonify(sorted_list)

@app_views.route('/streets/<str_id>', strict_slashes=False)
def get_str(str_id):
    """This returns a street based on id"""
    obj = storage.get('Street', str_id)
    if obj is None:
        return jsonify("Error, no street found"), 404
    return jsonify(obj.to_dict())

@app_views.route('/environments/<env_id>/streets', strict_slashes=False)
def env_str(env_id):
    """This returns a list of all the streets in an environment"""
    env_str = []
    for key, obj in storage.all(Street).items():
        if obj.env_id == env_id:
            env_str.append(obj.to_dict())
    sorted_list = sorted(env_str, key=lambda d: d['name'])
    return jsonify(sorted_list)
