#!/usr/bin/python3

from flask import Flask, jsonify
from flask_cors import CORS
from models import fstorage
from api.blueprint import app_views


@app_views.route('/auth-url', strict_slashes=False)
def get_auth():
    """This returns the authentication parameters to a potential client"""
    try:
        from imagekitio import ImageKit
    except Exception:
        return jsonify("Could not obtain authentication parameters"), 404
    imagekit = ImageKit(
        public_key='public_YHk4EswEnK3KjAlQgpJBaxbP/FY=',
        private_key='private_1Kni0suJhrnYrDxpJGq34TsY6jY=',
        url_endpoint = 'https://ik.imagekit.io/nzohesnyo',
    )
    auth_params = imagekit.get_authentication_parameters()
    return auth_params