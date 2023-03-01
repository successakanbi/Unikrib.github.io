#!/usr/bin/python3
import sys
from models import fstorage
import json

with open('unikrib.json') as f:
    urls = json.load(f)
for url in urls:
    fstorage.delete(url)
