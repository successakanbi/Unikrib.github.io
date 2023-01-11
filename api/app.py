#!/usr/bin/python3

from flask import Flask, render_template
from api.blueprint import app_views
from models import storage
from flask_cors import CORS

UPLOAD_FOLDER = '/ubuntu/Unikrib.github.io/web_dynamic/static/upload_images'

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_views)
app.secret_key = 'secret_key'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.teardown_appcontext
def close(exception):
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8000, threaded=True)
