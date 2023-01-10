#!/usr/bin/python3

from models import storage
from api.blueprint import app_views
from flask import abort, request, jsonify
from models.user import User
from werkzeug.utils import secure_filename


@app_views.route('/users', strict_slashes=False)
def get_all_users():
    """This returns a list of all the user objects in storage"""
    user_list = []
    for key, obj in storage.all(User).items():
        user_list.append(obj.to_dict())

    return jsonify(user_list)

@app_views.route('/users/<user_id>', strict_slashes=False)
def get_user(user_id):
    """This returns a user based on id"""
    search_key = 'User.' + user_id
    for key, obj in storage.all(User).items():
        if key == search_key:
            return jsonify(obj.to_dict())
    abort(404, "No User Found")

@app_views.route('/stats/users', strict_slashes=False)
def type_count():
    """This returns the count of all user-types in storage"""
    objs = storage.all(User)
    stats = {"agent": 0, "vendor": 0, "sp": 0}
    for key, obj in objs.items():
        if obj.user_type == 'vendor':
            stats['vendor'] += 1
        elif obj.user_type == 'agent':
            stats['agent'] += 1
        elif obj.user_type == 'sp':
            stats['sp'] += 1
    return jsonify(stats)

@app_views.route('upload-profile-img', strict_slashes=False, methods=['POST'])
def add_dp():
    """This adds a profile image for a user"""
    allowed_extensions = set(['png', 'jpg', 'jpeg'])

    def allow_file(filename):
        """This checks if the file extension is allowed"""
        if '.' in filename and filename.split('.')[-1].lower() in allowed_extensions:
            return True
        else:
            return False

    if 'files[]' not in request.files:
        resp = jsonify({'message': "No file path in the request"})
        resp.status_code = 400
        return resp

    files = request.files.getlist('files[]')[0]
    if files and allow_file(files.filename):
        filename = secure_filename(files.filename)
        files.save(os.path.join(app_config['UPLOAD_FOLDER'], filename))
        resp = jsonify({"message": "Images successfully uploaded"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Not a valid file"})
        resp.status_code = 400
        return resp

@app_views.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
    """This creates a new user and stores it"""
    if not request.json:
        abort(400, "Not a valid Json")
    if "email" not in request.json:
        abort(401, "Request must include email")
    if "password" not in request.json:
        abort(405, "Request must include password")
    user_dict = request.get_json()
    if user_dict['email'][-4:] != '.com':
        abort(403, "Please enter a valid email")
    if len(user_dict['password']) < 4:
        abort(405, "Include a password please")
    if len(user_dict['email']) < 5:
        abort(401, "Include an email please")
    for key, obj in storage.all(User).items():
        if user_dict['email'] == obj.email:
            abort(404, "Email already exists")
    model = User(**user_dict)
    model.save()
    return jsonify(model.to_dict()), 200

@app_views.route('/users/login', strict_slashes=False, methods=['POST'])
def user_login():
    """This return the user id based on their email and password"""
    if not request.json:
        abort(400, "Not a valid Json")
    if "email" not in request.json:
        abort(400, "Request must include email")
    if "password" not in request.json:
        abort(400, "Request must include password")

    user_dict = request.get_json()
    
    for key, obj in storage.all(User).items():
        if obj.email.lower() == user_dict['email'].lower():
            if obj.password == user_dict['password']:
                return jsonify(obj.to_dict(1))
    abort(404, "User not found")

@app_views.route('/users/<user_id>', strict_slashes=False, methods=['PUT'])
def update_user(user_id):
    """This updates the attributes of a user"""
    if not request.json:
        abort(400, "Not a valid Json")
    new_dict = request.get_json()
    search_key = 'User.' + user_id
    obj = storage.all(User)[search_key]
    if obj is None:
        abort(404, "No user found")
    for key, val in new_dict.items():
        if key not in ('id', 'created_at', 'updated_at'):
            setattr(obj, key, val)
            storage.save()
    return jsonify(obj.to_dict())


@app_views.route('/users/<user_id>', strict_slashes=False, methods=['DELETE'])
def delete_user(user_id):
    """This deletes a user from storage"""
    search_key = 'User.' + user_id
    obj = storage.all(User)[search_key]
    if obj is None:
        abort(404, "User not found")
    obj.delete()
    storage.save()
    return {}
