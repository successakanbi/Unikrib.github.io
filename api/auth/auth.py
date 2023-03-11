#!/usr/bin/python3
"""This sets up the base authentication class"""
from flask import request
from typing import List


class Auth():
    """class definition"""
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """checks if path requires authentication
        """
        if path and path[-1] != '/':
            path += '/'
        if path is None or excluded_paths is None:
            return True
        if excluded_paths == []:
            return True
        if path not in excluded_paths:
            return True
        return False

    def authorization_header(self, request=None) -> str:
        """returns the authorization header in the request
        """
        if request is None:
            return None
        if not request.headers.get('Authorization'):
            return None
        return request.headers.get('Authorization')

    def current_user(self, request=None):
        """ Returns the current user
        """
        pass