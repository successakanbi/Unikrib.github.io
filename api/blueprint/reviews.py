#!/usr/bin/python3

from api.blueprint import app_views
from models.review import Review
from models import storage
from flask import jsonify, abort, request

@app_views.route('/reviews', strict_slashes=False)
def get_all_reviews():
    """This returns a list of all the reviews in storage"""
    all_reviews = []
    for key, obj in storage.all(Review).items():
        all_reviews.append(obj.to_dict())

    return jsonify(all_reviews)

@app_views.route('/reviews/<review_id>', strict_slashes=False)
def get_review(review_id):
    """This returns a review based on id"""
    obj = storage.get('Review', review_id)
    if obj == None:
        abort(404, "No review found")
    else:
        return jsonify(obj.to_dict())

@app_views.route('/users/<user_id>/reviews', strict_slashes=False)
def get_user_review(user_id):
    """This returns a list of all the reviews about a user"""
    all_reviews = []
    for key, obj in storage.all(Review).items():
        if obj.reviewee == user_id:
            all_reviews.append(obj.to_dict())

    return jsonify(all_reviews)

@app_views.route('/reviews', strict_slashes=False, methods=['POST'])
def create_review():
    if not request.json:
        abort(400, "Not a valid json")
    review_dict = request.get_json()
    if "text" not in review_dict:
        abort(400, "Please include review text")
    if "reviewer" not in review_dict:
        abort('400, Please include a reviewer')
    if "reviewee" not in review_dict:
        abort(400, "Please include a reviewee")
    if "star" not in review_dict:
        abort(400, "Please include a star rating")

    if len(review_dict['text']) < 2:
        abort(400, "Please include a text")

    model = Review(**review_dict)
    model.save()
    return jsonify(model.to_dict()), 201

@app_views.route('/reviews/<review_id>', strict_slashes=False, methods=['PUT'])
def update_review(review_id):
    """This updates the attributes of a review"""
    if not request.json:
        abort(400, "Not a valid json")
    review_dict = request.get_json()
    obj = storage.get('Review', review_id)
    if obj is None:
        abort(404, "No review found")
    for key, val in review_dict.items():
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict())

@app_views.route('/reviews/<reviews_id>', strict_slashes=False, methods=['DELETE'])
def delete_review(review_id):
    """This destroy a review frm storage based on id"""
    obj = storage.get('Review', review_id)
    if obj is None:
        abort(400, "No review found")
    obj.delete()
    return "{}"
