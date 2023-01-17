#!/usr/bin/python3

import base64
import os
import sys
from imagekitio import ImageKit
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/unikrib/auth-url', strict_slashes=False)
def get_auth():
    imagekit = ImageKit(
            public_key='public_YHk4EswEnK3KjAlQgpJBaxbP/FY=',
            private_key='private_1Kni0suJhrnYrDxpJGq34TsY6jY=',
            url_endpoint = 'https://ik.imagekit.io/nzohesnyo',
            )

    auth_params = imagekit.get_authentication_parameters()
    return auth_params

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8003)
