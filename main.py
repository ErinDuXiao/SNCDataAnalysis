"""
URL Mapping
"""
import os
import sys
import cgi
import webapp2

from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api import users


# Force sys.path to have our own directory first, so we can import from it.
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


from app.views.index  import IndexPage
from app.views.admin import AdminPage
from app.views.error import Error404Page


""" =====================================================================

App Main

This is the entry point for the application.

app.yaml config file will specify this 'main' module variable 'app as the stat point for the application
main.app

Requests to the server are manged by the WSGIApplication object, created with a list of URLs that its aware
of and the coresponding Python classes that handle requests sent to those URLs

"""
app = webapp2.WSGIApplication([
    (r'/',      IndexPage),
    (r'/admin', AdminPage),
    (r'/(.*)',  Error404Page)],
debug=True)
