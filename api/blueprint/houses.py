#!/usr/bin/python3

from api.blueprint import app_views
from models.house import House
from flask import abort, jsonify, request
from models import storage

@app_views.route('/houses', strict_slashes=False)
def get_all_houses():
    """This returns a list of all the houses in storage"""
    houses_list = []
    for key, obj in storage.all(House).items():
        houses_list.append(obj.to_dict())

    return jsonify(houses_list)

@app_views.route('/houses/<house_id>', strict_slashes=False)
def get_house(house_id):
    """This return a house based on an id"""
    search_key = 'House.' + house_id
    for key, obj in storage.all(House).items():
        if key == search_key:
            return jsonify(obj.to_dict())
    abort(404, "House not found")

@app_views.route('/users/<user_id>/houses', strict_slashes=False)
def get_agent_houses(user_id):
    """This returns a list of all the houses registered under an agent"""
    house_list = []
    for key, obj in storage.all(House).items():
        if obj.owner_id == user_id:
            house_list.append(obj.to_dict())

    return jsonify(house_list)

@app_views.route('/houses/stats', strict_slashes=False)
def get_stat():
    """This returns the number of all the houses in storage"""
    return jsonify(storage.count(House))

@app_views.route('/houses', strict_slashes=False, methods=['POST'])
def create_house():
    """This creates a new house in storage"""
    if not request.json:
        abort(400, "Not a valid json")
    if "owner_id" not in request.json:
        abort(400, "House must have an owner_id")
    if "street_id" not in request.json:
        abort(400, "Request must contain a street_id")
    house_dict = request.get_json()
    model = House(**house_dict)
    storage.new(model)
    storage.save()
    return jsonify(model.to_dict()), 200

@app_views.route('/houses/<house_id>', strict_slashes=False, methods=['PUT'])
def update_house(house_id):
    """This updates the attributes of a house based on id"""
    if not request.json:
        abort(400, "Not a valid json")
    house_dict = request.get_json()
    obj = storage.get('House', house_id)
    if obj is None:
        abort(404, "House not found")
    for key, val in house_dict.items():
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict())

@app_views.route('/houses/<house_dict>', strict_slashes=False, methods=['DELETE'])
def delete_house(house_id):
    """This remove the house instance from storage"""
    if not request.json:
        abort(400, "Not a valid json")
    search_key = 'House.' + house.id
    if search_key not in storage.all(House):
        abort(404, "House instance not found")
    obj = storage.all(House)[search_key]
    obj.delete()
    return {}

@app_views.route('/houses/search', strict_slashes=False, methods=['POST'])
def search_house():
    """This receives a dict and returns houses that match the criteria"""
    if not request.json:
        abort(400, "Not a valid json")
    search_dict = request.get_json()

    streets = search_dict['streets']
    apartment = search_dict['apartment']
    min_price = int(search_dict['min_price'])
    max_price = int(search_dict['max_price'])

    result = []

    for key, obj in storage.all(House).items():
        for street in streets:
            if obj.apartment == apartment and obj.street_id == street['id']:
                if obj.price <= max_price and obj.price >= min_price:
                    result.append(obj.to_dict())
    return jsonify(result)
