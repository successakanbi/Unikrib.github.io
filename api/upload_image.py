#!/usr/bin/python3

from imagekitio import ImageKit
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from models import fstorage

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
imagekit = ImageKit(
            public_key='public_YHk4EswEnK3KjAlQgpJBaxbP/FY=',
            private_key='private_1Kni0suJhrnYrDxpJGq34TsY6jY=',
            url_endpoint = 'https://ik.imagekit.io/nzohesnyo',
            )

@app.route('/unikrib/auth-url', strict_slashes=False)
def get_auth():
    """This returns the authentication parameters to a potential client"""
    auth_params = imagekit.get_authentication_parameters()
    return auth_params

@app.route('/unikrib/delete-file', strict_slashes=False, methods=['POST'])
def del_file():
    """This deletes a file from the image database"""
    if not request.json:
        abort(400, "Not a valid json")
    file_url = request.get_json()
    fstorage.new(file_url['url'])
    return "success"
    """for url in file_urls:
        fileId = fstorage.get(url)
        if fileId == None:
            return {}
        else:
            delete = imagekit.delete_file(file_id=fileId)
            fstorage.delete(url)
            return jsonify(delete)"""

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8003)