#!/usr/bin/python3

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/unikrib')

from api.blueprint.users import *
from api.blueprint.houses import *
from api.blueprint.environments import *
from api.blueprint.streets import *
from api.blueprint.reviews import *
from api.blueprint.products import *
from api.blueprint.categories import *