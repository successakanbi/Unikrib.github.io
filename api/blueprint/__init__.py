#!/usr/bin/python3

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/unikrib')

from api.blueprint.users import *
from api.blueprint.houses import *