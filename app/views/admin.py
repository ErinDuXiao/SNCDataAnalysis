"""
Copyright (C) octo-pi All Rights Reserved.

"""
import logging
import json

from app.models.tdata import Sessions
from app.models.tdata import SessionPlayerSelectionInfo
from app.models.tdata import PlayerLocation
from app.models.tdata import PlayerDeath
from app.models.tdata import PrimaryFire
from app.models.tdata import SecondaryFire
from app.models.tdata import PlayerBoost
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

    def do_save_playdata(self, params):

        # initialize the result, set the value to indicate an error
        result = { 'returnCode': -1 }

        # should really check for an existing persona here first
        sessionData = Sessions()

        # Read json
        payload = json.loads(params['data'])
        data = json.loads(payload)['data'];

        # Get player data from self.request
        sessionData.sessionKey = str(data['sessionKey'])
        sessionData.timestamp = str(data['timestamp'])

        try:
            if data['playerInfoArray'] :
                # Store primary fire info
                for p in data['playerInfoArray']:
                    sessionPlayerSelectionInfo = SessionPlayerSelectionInfo()
                    sessionPlayerSelectionInfo.sessionKey = str(data['sessionKey'])
                    sessionPlayerSelectionInfo.playerNumber = int(p['playerNumber'])
                    sessionPlayerSelectionInfo.hovercraftNumber = int(p['hovercraftNumber'])
                    sessionPlayerSelectionInfo.put()

            # if data['primaryFireInfoArray'] :
            #     # Store primary fire info
            #     for p in data['primaryFireInfoArray']:
            #         primaryFireData = PrimaryFire()
            #         primaryFireData.sessionKey = str(data['sessionKey'])
            #         primaryFireData.timestamp = str(p['timestamp'])
            #         primaryFireData.playerNumber = int(p['playerNumber'])
            #         primaryFireData.posX = float(p['x'])
            #         primaryFireData.posY = float(p['y'])
            #         primaryFireData.posZ = float(p['z'])
            #         primaryFireData.put()
            #
            # if data['secondaryFireInfoArray'] :
            #     # Store secondary fire info
            #     for p in data['secondaryFireInfoArray']:
            #         secondaryFireData = SecondaryFire()
            #         secondaryFireData.sessionKey = str(data['sessionKey'])
            #         secondaryFireData.timestamp = str(p['timestamp'])
            #         secondaryFireData.playerNumber = int(p['playerNumber'])
            #         secondaryFireData.posX = float(p['x'])
            #         secondaryFireData.posY = float(p['y'])
            #         secondaryFireData.posZ = float(p['z'])
            #         secondaryFireData.put()

            # if data['playerBoostInfoArray']:
            #     # Store player boost info
            #     for p in data['playerBoostInfoArray']:
            #         playerBoost = PlayerBoost()
            #         playerBoost.sessionKey = str(data['sessionKey'])
            #         playerBoost.timestamp = str(p['timestamp'])
            #         playerBoost.playerNumber = int(p['playerNumber'])
            #         playerBoost.posX = float(p['x'])
            #         playerBoost.posY = float(p['y'])
            #         playerBoost.posZ = float(p['z'])
            #         playerBoost.put()

            if data['playerDeathInfoArray']:
                # Store player death info
                for p in data['playerDeathInfoArray']:
                    playerDeathData = PlayerDeath()
                    playerDeathData.sessionKey = str(data['sessionKey'])
                    playerDeathData.timestamp = str(p['timestamp'])
                    playerDeathData.playerNumber = int(p['playerNumber'])
                    playerDeathData.posX = float(p['x'])
                    playerDeathData.posY = float(p['y'])
                    playerDeathData.posZ = float(p['z'])
                    playerDeathData.put()

            if data['playerPosInfoArray'] :
                # Store player pos info
                for p in data['playerPosInfoArray']:
                    playerLocationData = PlayerLocation()
                    playerLocationData.sessionKey = str(data['sessionKey'])
                    playerLocationData.timestamp = str(p['timestamp'])
                    playerLocationData.playerNumber = int(p['playerNumber'])
                    playerLocationData.posX = float(p['x'])
                    playerLocationData.posY = float(p['y'])
                    playerLocationData.posZ = float(p['z'])
                    playerLocationData.put()


            # try blocks should be limited just to calls that may fail
            sessionDataKey = sessionData.put()

        except ValueError:
            logging.error( 'Attempt to do save session failed' )
            self.send_json( result )

        result['keySafe'] = sessionDataKey.urlsafe();
        result['session'] = sessionData.sessionKey
        result['returnCode'] = 0

        self.send_json( result )
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
