#!/usr/bin/env python3
"""This sets up session up session authentication
    that lasts for 24hours"""
from api.auth.auth import Auth
from datetime import datetime
import uuid
from models import storage

SESSION_NAME = "_my_session_id"


class SessionAuth(Auth):
    """class definition
    """
    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """This creates a session id for the user
        """
        if user_id is None:
            return None
        if not isinstance(user_id, str):
            return None
        session_id = str(uuid.uuid4())
        self.user_id_by_session_id[session_id] = user_id

        return session_id

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """This retrieves a user_id given the session_id
        """
        if session_id is None:
            return None
        if not isinstance(session_id, str):
            return None

        user_id = self.user_id_by_session_id.get(session_id)
        return user_id

    def session_cookie(self, request=None):
        """This returns the cookie value from each request sent
        """
        if request is None:
            return None
        cookie = request.cookies.get(SESSION_NAME)
        return cookie

    def current_user(self, request=None):
        """This obtains the current user from the request
        """
        session_id = self.session_cookie(request)
        user_id = self.user_id_for_session_id(session_id)
        user = storage.get('User', user_id)
        return user