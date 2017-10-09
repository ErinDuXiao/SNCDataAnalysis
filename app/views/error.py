"""
Copyright (C) octo-pi All Rights Reserved. 

"""
import os
import sys
import logging
import webapp2

import json

from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

from app.views.page_controller import PageController
        
""" 
Error Page to display if a specific page that doesn't exist is displayed

"""    
class Error404Page( PageController ):
        
    def get(self):
        tValues = { 'msg' : "Error: Page Not Found" }
        self.send_template( '../templates/404.html', tValues)










