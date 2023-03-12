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
        return jsonify("No review found"), 404
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
    """This creates a new review instance"""
    if not request.json:
        return jsonify("Not a valid json"), 400
    review_dict = request.get_json()
    if "text" not in review_dict:
        return jsonify("Please include review text"), 400
    if "reviewer" not in review_dict:
        return jsonify('Please include a reviewer'), 400
    if "reviewee" not in review_dict:
        return jsonify("Please include a reviewee"), 400
    if "star" not in review_dict:
        return jsonify("Please include a star rating"), 400

    if len(review_dict['text']) < 2:
        return jsonify("Please include a text"), 400

    model = Review(**review_dict)
    model.save()
    return jsonify(model.to_dict()), 201

@app_views.route('/reviews/<review_id>', strict_slashes=False, methods=['PUT'])
def update_review(review_id):
    """This updates the attributes of a review"""
    if not request.json:
        return jsonify("Not a valid json"), 400
    review_dict = request.get_json()
    obj = storage.get('Review', review_id)
    if obj is None:
        return jsonify("No review found"), 404
    for key, val in review_dict.items():
        setattr(obj, key, val)
        obj.save()
    return jsonify(obj.to_dict())

@app_views.route('/reviews/<reviews_id>', strict_slashes=False, methods=['DELETE'])
def delete_review(review_id):
    """This destroy a review frm storage based on id"""
    obj = storage.get('Review', review_id)
    if obj is None:
        return jsonify("No review found"), 404
    obj.delete()
    return "{}"
