#!/usr/bin/python3

from api.blueprint import app_views
from flask import jsonify, abort, request
from models import storage
from models.service import Service

@app_views.route('/services', strict_slashes=False)
def all_services():
    """This returns a list of all services in storage"""
    all_serv = []
    for key, obj in storage.all(Service).items():
        all_serv.append(obj.to_dict())    
    return jsonify(all_serv)

@app_views.route('/services/<service_id>', strict_slashes=False)
def get_service(service_id):
    """This returns a service based on id"""
    obj = storage.get('Service', service_id)
    if obj == None:
        abort(404, "service not found")
    return jsonify(obj.to_dict())

@app_views.route('/users/<user_id>/services', strict_slashes=False)
def user_service(user_id):
    """This return the service associated with a user"""
    obj = storage.get('User', user_id)
    if obj == None:
        abort(404, "No user found")
    for key, obj in storage.all(Service).items():
        if obj.owner_id == user_id:
            return jsonify(obj.to_dict())
    return {}

@app_views.route('/service-categories/<cat_id>/services', strict_slashes=False)
def cat_services(cat_id):
    """This returns a list of all services in a category"""
    cat_serv = []
    for key, obj in storage.all(Service).items():
        if obj.category_id == cat_id:
            cat_serv.append(obj.to_dict())
    return jsonify(cat_serv)

@app_views.route('/service-search', strict_slashes=False, methods=['POST'])
def search_services():
    """This searces for services that meet some criteria"""
    if not request.json:
        abort(400, "Not a valid json")

    searchList = []

    search_dict = request.get_json()
    location = search_dict['location']
    category = search_dict['category_id']

    for key, obj in storage.all(Service).items():
        owner = storage.get('User', obj.owner_id)
        if owner.com_res == location or location == 'all':
            if obj.category_id == category:
                searchList.append(obj.to_dict())
    return jsonify(searchList)

@app_views.route('/services', strict_slashes=False, methods=['POST'])
def create_serv():
    """This creates a new service in storage"""
    if not request.json:
        abort(400, "Not a valid JSON")
    request_dict = request.get_json()
    if "category_id" not in request_dict:
        abort(400, "Please include a category_id")
    if "owner_id" not in request_dict:
        abort(400, "Please include an owner_id")
    model = Service(**request_dict)
    model.save()
    return jsonify(model.to_dict())

@app_views.route('/services/<service_id>', strict_slashes=False, methods=['PUT'])
def update_service(service_id):
    """This updates an instance of a service in storage"""
    obj = storage.get('Service', service_id)
    if obj == None:
        abort(404, "No service instance found")
    request_dict = request.get_json()
    for key, val in request_dict.items():
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict())

@app_views.route('/services/<service_id>', strict_slashes=False, methods=['DELETE'])
def delete_service(service_id):
    """This removes a service instance from storage"""
    obj = storage.get('Service', service_id)
    if obj == None:
        abort(404, "No service found")
    obj.delete()
    return '{}'
    