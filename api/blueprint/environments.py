#!/usr/bin/python3

from api.blueprint import app_views
from models import storage
from models.environment import Environment
from flask import request, jsonify, abort

@app_views.route('/environments', strict_slashes=False)
def all_env():
    """This returns a list of all environments"""
    all_env = []
    for key, obj in storage.all(Environment).items():
        all_env.append(obj.to_dict())
    sorted_list = sorted(all_env, key=lambda d: d['name'])

    return jsonify(sorted_list)

@app_views.route('/environments/<env_id>', strict_slashes=False)
def get_env(env_id):
    """This returns an environment based on id"""
    obj = storage.get('Environment', env_id)
    if obj is None:
        return jsonify("Environment does not exists"), 404
    return jsonify(obj.to_dict())
