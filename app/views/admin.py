"""
Copyright (C) octo-pi All Rights Reserved.

"""
import logging
import json

from app.models.tdata import Sessions
from app.models.tdata import SessionPlayerSelectionInfo
from app.models.tdata import PlayerLocation
from app.models.tdata import PlayerDeath
from app.models.tdata import AttackPrimary
from app.models.tdata import AttackSecondly
from app.models.tdata import AttackMelee

# this is the parent class of all pages that need to respond to AJAX messages
from app.views.page_controller import PageController
from google.appengine.ext.ndb import Key

"""
Admin Page handler

"""
class AdminPage( PageController ):

    # If it was get request, show the admin page
    def get(self):
        
        tValues = {
            'title': "Admin page",
            'msg': "This is a test page to recieve data"
        }
        
        self.send_html( '../templates/admin.html', tValues )
        return

    def do_save_session(self, params):

        # initialize the result, set the value to indicate an error
        result = { 'returnCode': -1 }

        # should really check for an existing persona here first
        sessionData = Sessions()

        # read json
        data = json.loads(params['data'])

        # Get player data from self.request
        sessionData.sessionKey = str(data['sessionKey'])
        sessionData.timestamp = str(data['timestamp'])

        sessionPlayerSelectionInfoDataList = []

        for p in data['players']:
            sessionPlayerSelectionInfoData = SessionPlayerSelectionInfo()
            sessionPlayerSelectionInfoData.sessionKey = str(data['sessionKey'])
            sessionPlayerSelectionInfoData.playerNumber = int(p['playerNumber'])
            sessionPlayerSelectionInfoData.hovercraftNumber = int(p['hovercraftNumber'])
            sessionPlayerSelectionInfoDataList.append(sessionPlayerSelectionInfoData)

        try:
            # try blocks should be limited just to calls that may fail
            sessionDataKey = sessionData.put()
            sessionPlayerSelectionInfoData = sessionPlayerSelectionInfoData.put()

        except ValueError:
            logging.error( 'Attempt to do save session failed' )
            self.send_json( result )

        result['keySafe'] = sessionDataKey.urlsafe();
        result['session'] = sessionData.sessionKey
        result['returnCode'] = 0

        self.send_json( result )
        return
    
    def do_save_player_pos(self, params):

        # initialize the result, set the value to indicate an error
        result = { 'returnCode': -1 }

        # read json
        data = json.loads(params['data'])

        try:
            for p in data['playerPos']:
                playerLocationData = PlayerLocation()
                playerLocationData.sessionKey = str(data['sessionKey'])
                playerLocationData.timestamp = str(p['timestamp'])
                playerLocationData.playerNumber = int(p['playerNumber'])
                playerLocationData.posX = float(p['x'])
                playerLocationData.posY = float(p['y'])
                playerLocationData.posZ = float(p['z'])
                playerLocationData.put()

        except ValueError:
            logging.error( 'Attempt to do save session failed' )
            self.send_json( result )

        result['returnCode'] = 0

        self.send_json( result )
        return
