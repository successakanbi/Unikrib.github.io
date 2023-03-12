#!/usr/bin/python3

from models import storage, fstorage
from api.blueprint import app_views
from flask import abort, request, jsonify
from models.user import User
from settings.redactor import Redacter


fields = ["password", "email"]
format = Redacter(fields)
SESSION_NAME = '_my_session_id'
@app_views.route('/users', strict_slashes=False)
def get_all_users():
    """This returns a list of all the user objects in storage"""
    user_list = []
    for key, obj in storage.all(User).items():
        user = format.filter_datum(",", obj.to_dict())
        user_list.append(user)

    return jsonify(user_list)

@app_views.route('/users/<user_id>', strict_slashes=False)
def get_user(user_id):
    """This returns a user based on id"""
    if user_id == "me" and request.current_user is None:
        return jsonify("No user found"), 404
    if user_id == "me" and request.current_user:
        user = format.filter_datum(",", request.current_user.to_dict())
        return jsonify(user)
    else:
        search_key = 'User.' + user_id
        for key, obj in storage.all(User).items():
            if key == search_key:
                user = format.filter_datum(",", obj.to_dict())
                return jsonify(user)
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
    user = format.filter_datum(",", model.to_dict())
    return jsonify(user), 200

@app_views.route('/auth/login', strict_slashes=False, methods=['POST'])
def user_login():
    """This return the user id based on their email and password"""
    if not request.json:
        return jsonify("Not a valid json"), 400
    if "email" not in request.json:
        return jsonify("Include an email please"), 400
    if "password" not in request.json:
        return jsonify("Include a password please"), 400

    user_dict = request.get_json()
    email = request.form.get("email")
    password = request.form.get("password")
    
    if len(user_dict['email']) < 2:
        return jsonify("Please include an email"), 400
    if len(user_dict['password']) < 2:
        return jsonify("Please include a password"), 400
    for key, obj in storage.all(User).items():
        if obj.email.lower() == user_dict['email'].lower():
            if obj.password.strip() == user_dict['password'].strip():
                from api.app import auth
                session_id = auth.create_session(obj.id)
                user = jsonify(format.filter_datum(",", obj.to_dict()))
                user.set_cookie(SESSION_NAME, session_id)
                return user
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
    user = format.filter_datum(",", obj.to_dict())
    return jsonify(user)


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
