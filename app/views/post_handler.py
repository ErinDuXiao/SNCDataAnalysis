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

"""
The POST handler is a lower level class that can be subclassed to handle
a single command.  A route can be defined (edge aka '/myapp/my_command' and that
route can be handled by a class derived from this that implements just one
method: do()

A more sophisticated router to a single edge is derived from this in PageController
where individual commands can be defined and accessed via one of the parameters posted
to the page.


"""
class PostHandler( webapp2.RequestHandler ):

    def get(self):
        """
        OVERRIDE me in a subclass to do actual work.

        """
        logging.warning('rendering error page')
        self.send_html( '../templates/404.html' )
        return


    def post(self):
        """
        @function post

        This is the core of responding to AJAX requests.
        The request is expecting a 'cmd' parameter identifying a command to process (other parameters are considered
        application specific

        If the command is valid (i.e the child class had a defined function 'do_<cmd>' then a function pointer
        is generated pointing to the 'do' and its executed.

        The executed command can call either

        """
        # process the command
        self.do()
        return


    def do(self):
        """
        OVERRIDE me in a sub (sub) class to do actual work.

        """
        logging.warning('do command undefined')
        self.send_json( {'returnCode': -1} )
        return


    """
    Helper methods to render templates to either strings or directly back to the calling client

    """
    def render_html(self, htmlTemplate, tValues = []):
        """
        Use the html template provided, substitute template values and then return the
        string generated.

        """
        path = os.path.join( os.path.dirname(__file__), htmlTemplate )
        markup = template.render( path, tValues )
        return markup


    def render_json(self, data):
        """
        Use the Python dictionary provided as data to generate a JSON format string to return.

        """
        jsonMarkup = json.dumps( data )
        return jsonMarkup


    def send_html(self, htmlTemplate, tValues = [] ):
        """
        Create a HTML string using the provided tempalte and template values, then
        immediately send the string to stdout (responding to the client browser).

        Note:  This is typically the last method called when responding to GET requests


        if (self.CORSAccessAllowed):
            self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        """
        self.response.write( self.render_html( htmlTemplate, tValues ) )
        return


    def send_json( self, data ):
        """
        Create a JSON string from the provided python dictionary and immediately
        send the string to stdout (responding to the client browser).

        Note:  This is typically the last method called when responding to POST requests


        if (self.CORSAccessAllowed):
            self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        """
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write( self.render_json( data ) )
        return


    def _send( self, data, asJSON ):


        if (self.CORSAccessAllowed):
            self.response.headers.add_header("Access-Control-Allow-Origin", "*")

        # assumes  data is a rendered template
        responseData = data

        # if its a dictionary, reformat as JSON data
        if (asJSON == True):
            self.response.headers['Content-Type'] = 'application/json'
            responseData = self.render_json( data )

        self.response.write( responseData )
        return

    """
    def options(self):

        if (self.CORSAccessAllowed):
            self.response.headers['Access-Control-Allow-Origin'] = '*'
            self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
            self.response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE'
    """
