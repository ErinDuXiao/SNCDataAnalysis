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

from app.views.post_handler import PostHandler


"""
PageController manages JSON translation and message dispatch command handling

All pages with require AJAX handling should subclass this Class

"""


class PageController( PostHandler ):

    CORSAccessAllowed = False

    """
    @function post

    This is the core of responding to AJAX requests.
    The request is expecting a 'action' parameter identifying a command to process (other parameters are considered
    application specific

    If the command is valid (i.e the child class had a defined function 'do_<action>' then a function pointer
    is generated pointing to the 'do_<action>' and its executed.

    The executed command can call either

    """
    def post(self):
        """
        Process the passed instruction and respond

        """
        # Look for the command argument
        if self.request.params.get('cmd') != '':
            cmd = self.request.params['cmd']

        # could use this if you want to stick with the classic 'action' as a
        elif self.request.params.get('action') != '':
            cmd = self.request.params.get('action')

        else:
            # missing argument(s)
            logging.warning('PageController.post() missing command argument.')
            self.send_json_response( {'returnCode': 10} )
            return

        logging.debug('PageController: command['+cmd+'] called.')

        # process the command
        command_handler_name = 'do_' + cmd
        if hasattr(self, command_handler_name):
            command_handler = getattr(self, command_handler_name)
            command_handler( self.request.params )
        else:
            self.error(cmd, 11)

        return
