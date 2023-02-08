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

@app_views.route('/service-categories/<cat_id>/services', strict_slashes=False)
def cat_services(cat_id):
    """This returns a list of all services in a category"""
    cat_serv = []
    for key, obj in storage.all(Service).items():
        if obj.category_id == cat_id:
            cat_serv.append(obj.to_dict())
    return jsonify(cat_serv)

@app_views.route('/services', strict_slashes=False, methods=['POST'])
def create_serv():
    """This creates a new service in storage"""
    if not request.json:
        abort(400, "Not a valid JSON")
    request_dict = request.get_json()
    if "title" not in request_dict:
        abort(400, "Please include a service name")
    if "owner_id" not in request_dict:
        abort(400, "Please include an owner_id")
    model = Service(**request_dict)
    model.save()
    return jsonify(model.to_dict())

@app_views.route('/services/<service_id>', strict_slashes=False, methods=['DELETE'])
def delete_service(service_id):
    """This removes a service instance from storage"""
    obj = storage.get('Service', service_id)
    if obj == None:
        abort(404, "No service found")
    obj.delete()
    return '{}'
    