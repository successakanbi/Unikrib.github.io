#!/usr/bin/python3

from models import storage, fstorage
from api.blueprint import app_views
from flask import abort, request, jsonify
from models.user import User
from werkzeug.utils import secure_filename


@app_views.route('/users', strict_slashes=False)
def get_all_users():
    """This returns a list of all the user objects in storage"""
    user_list = []
    for key, obj in storage.all(User).items():
        user_list.append(obj.to_dict(1))

    return jsonify(user_list)

@app_views.route('/users/<user_id>', strict_slashes=False)
def get_user(user_id):
    """This returns a user based on id"""
    search_key = 'User.' + user_id
    for key, obj in storage.all(User).items():
        if key == search_key:
            return jsonify(obj.to_dict(1))
    return jsonify("No User Found"), 404

@app_views.route('/stats/users', strict_slashes=False)
def type_count():
    """This returns the count of all user-types in storage"""
    objs = storage.all(User)
    stats = {"agent": 0, "vendor": 0, "sp": 0}
    for key, obj in objs.items():
        if obj.user_type == 'vendor':
            stats['vendor'] += 1
        elif obj.user_type == 'agent':
            stats['agent'] += 1
        elif obj.user_type == 'sp':
            stats['sp'] += 1
    return jsonify(stats)

@app_views.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
    """This creates a new user and stores it"""
    if not request.json:
        return jsonify("Not a valid Json"), 400
    if "email" not in request.json:
        return jsonify("Request must include email"), 400
    if "password" not in request.json:
        return jsonify("Request must include password"), 400
    user_dict = request.get_json()
    if user_dict['email'][-4:] != '.com':
        return jsonify("Please enter a valid email"), 400
    if len(user_dict['password']) < 2:
        return jsonify("Please include a password"), 400
    if len(user_dict['email']) < 5:
        return jsonify("Please include an email"), 400
    for key, obj in storage.all(User).items():
        if user_dict['email'].lower() == obj.email.lower():
            return jsonify("Email already exist"), 400
    
    for key, val in user_dict.items():
        user_dict[key] = val.strip()
    model = User(**user_dict)
    model.save()
    return jsonify(model.to_dict(1)), 200

@app_views.route('/users/login', strict_slashes=False, methods=['POST'])
def user_login():
    """This return the user id based on their email and password"""
    if not request.json:
        return jsonify("Not a valid json"), 400
    if "email" not in request.json:
        return jsonify("Include an email please"), 400
    if "password" not in request.json:
        return jsonify("Include a password please"), 400

    user_dict = request.get_json()
    
    if len(user_dict['email']) < 2:
        return jsonify("Please include an email"), 400
    for key, obj in storage.all(User).items():
        if obj.email.lower() == user_dict['email'].lower():
            if obj.password == user_dict['password']:
                return jsonify(obj.to_dict(1))
            else:
                return jsonify("Incorrect password"), 400

    return jsonify("No user with this email found"), 404

@app_views.route('/users/<user_id>', strict_slashes=False, methods=['PUT'])
def update_user(user_id):
    """This updates the attributes of a user"""
    if not request.json:
        return jsonify("Not a valid Json"), 400
    new_dict = request.get_json()
    search_key = 'User.' + user_id
    obj = storage.get('User', user_id)
    if obj is None:
        return jsonify("No user found"), 404
    for key, val in new_dict.items():
        if key == "avatar" and obj.avatar:
            fstorage.new(obj.avatar)
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict(1))


@app_views.route('/users/<user_id>', strict_slashes=False, methods=['DELETE'])
def delete_user(user_id):
    """This deletes a user from storage"""
    search_key = 'User.' + user_id
    obj = storage.all(User)[search_key]
    if obj is None:
        return jsonify("User not found"), 404
    obj.delete()
    storage.save()
    return {}
