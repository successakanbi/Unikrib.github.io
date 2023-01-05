#!/usr/bin/python3

from .engine.file_storage import FileStorage
from .engine.database import Storage

storage = Storage()
storage.reload()
