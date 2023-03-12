#!/usr/bin/python3

from api.blueprint import app_views
from flask import abort, jsonify

@app_views.route('/status', strict_slashes=False)
def status():
    return jsonify({"status": "ok"}), 200


@app_views.route('/unauthorized', strict_slashes=False)
def unauthorized():
    abort(401)

@app_views.route('/forbidden', strict_slashes=False)
def forbidden():
    abort(403)