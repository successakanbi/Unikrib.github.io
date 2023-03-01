#!/usr/bin/python3

from api.blueprint import app_views
from flask import jsonify, abort, request
from models import storage, fstorage
from models.product import Product

@app_views.route('/products', strict_slashes=False)
def all_products():
    """This returns a list of all products in storage"""
    all_prod = []
    for key, obj in storage.all(Product).items():
        all_prod.append(obj.to_dict())    
    return jsonify(all_prod)

@app_views.route('/products/<product_id>', strict_slashes=False)
def get_product(product_id):
    """This returns a product based on id"""
    obj = storage.get('Product', product_id)
    if obj == None:
        abort(404, "Product not found")
    return jsonify(obj.to_dict())

@app_views.route('/categories/<category_id>/products', strict_slashes=False)
def categroy_prod(category_id):
    """This returns a list of all the products in a category"""
    cat_prod = []
    for key, obj in storage.all(Product).items():
        if obj.category_id == category_id:
            cat_prod.append(obj.to_dict())
    sorted_list = sorted(cat_prod, key=lambda d: d['name'])
    return jsonify(sorted_list)

@app_views.route('/users/<user_id>/products', strict_slashes=False)
def user_products(user_id):
    """This returns a list of all the products under a vendor"""
    obj = storage.get('User', user_id)
    if obj == None:
        abort(404, "No user with this id found")
    if obj.user_type != 'vendor':
        abort(400, "User not a vendor")

    user_prod = []
    for key, obj in storage.all(Product).items():
        if obj.owner_id == user_id:
            user_prod.append(obj.to_dict())
    return jsonify(user_prod)

@app_views.route('/products', strict_slashes=False, methods=['POST'])
def create_prod():
    """This creates a new product in storage"""
    if not request.json:
        abort(400, "Not a valid JSON")
    request_dict = request.get_json()
    if "name" not in request_dict:
        abort(400, "Please include a product name")
    if "owner_id" not in request_dict:
        abort(400, "Please include an owner_id")
    if "category_id" not in request_dict:
        abort(400, "Please include a category_id")    
    if "price" not in request_dict:
        abort(400, "Please include the product price")
    model = Product(**request_dict)
    model.save()
    return jsonify(model.to_dict())

@app_views.route('/products/<product_id>', strict_slashes=False, methods=['PUT'])
def update_product(product_id):
    """This updates a product instance"""
    if not request.json:
        abort(400, "Not a valid json")
    obj = storage.get('Product', product_id)
    if obj == None:
        abort(404, "No product found")
    prod_dict = request.get_json()

    for key, val in prod_dict.items():
        if key == "image1" and obj.image1:
            fstorage.new(obj.image1)
        elif key == "image2" and obj.image2:
            fstorage.new(obj.image2)
        elif key == "image3" and obj.image3:
            fstorage.new(obj.image3)
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict())

@app_views.route('/product-search', strict_slashes=False, methods=['POST'])
def search_product():
    """This searches all the products in storage against some criteria"""
    if not request.json:
        abort(400, "Not a valid JSON")

    return_list = []
    result_dict = {}

    searchDict = request.get_json()
    location = searchDict['location']
    category = searchDict['category']
    query = searchDict['query']

    for key, obj in storage.all(Product).items():
        owner = storage.get('User', obj.owner_id)
        if obj.category_id == category:
            if owner.com_res == location or location == 'all':
                search_queries = query.lower().split()
                for word in search_queries:
                    if word in obj.name.lower() or word in obj.features.lower():
                        return_list.append(obj.id)        
    
    count_dict = {}
    for num in return_list:
        count_dict[num] = return_list.count(num)
    all_dict = dict(sorted(count_dict.items(), key=lambda x:x[1], reverse=True))
    new_list = []
    for prodId in all_dict:
        obj = storage.get('Product', prodId)
        new_list.append(obj.to_dict())
    return new_list

@app_views.route('/products/<product_id>', strict_slashes=False, methods=['DELETE'])
def delete_product(product_id):
    """This removes a product instance from storage"""
    obj = storage.get('Product', product_id)
    if obj == None:
        abort(404, "No product found")
    if obj.image1:
        fstorage.new(obj.image1)
    if obj.image2:
        fstorage.new(obj.image2)
    if obj.image3:
        fstorage.new(obj.image3)
    obj.delete()
    return '{}'
    