#!/usr/bin/python3
from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)

@app.teardown_appcontext
def teardown_db(exception):
    storage.close()

@app.route('/unikrib', strict_slashes=False)
def entry_point():
    """This is the entry point for the website"""
    cache_id = str(uuid.uuid4())
    return render_template('homepage.html',
                            cache_id=cache_id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)