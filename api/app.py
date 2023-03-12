#!/usr/bin/python3

from flask import Flask, render_template, jsonify, request, abort
from api.blueprint import app_views
from models import storage
from flask_cors import CORS

UPLOAD_FOLDER = '/ubuntu/Unikrib.github.io/web_dynamic/static/upload_images'

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_views)
# app.secret_key = 'secret_key'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

from api.auth.session_auth import SessionAuth
auth = SessionAuth()

@app.errorhandler(401)
def unauthorized_error(error):
    return jsonify({"Error": "Unauthorized"}), 401

@app.errorhandler(403)
def forbidden_error(error):
    return jsonify({"Error": "Forbidden"}), 403

# @app.before_request
# def filter():
    """This authenticates each request before responding"""
    """if auth is None:
        return
    excluded_paths = ['/unikrib/status/', '/unikrib/unauthorized/',
                      '/unikrib/forbidden/', '/unikrib/houses/stats/',
                      '/unikrib/stats/users/', '/unikrib/auth/login/',
                      '/unikrib/environments/', '/unikrib/houses/']
    if auth.require_auth(request.path, excluded_paths) is False:
        return
    if auth.authorization_header(request) is None and auth.session_cookie is None:
        abort(401)
    if auth.current_user(request) is None:
        abort(403)
    request.current_user = auth.current_user(request)"""

@app.teardown_appcontext
def close(exception):
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, threaded=True)
