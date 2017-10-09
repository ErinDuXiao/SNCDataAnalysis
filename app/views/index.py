"""
Index Page View Controller
"""
import logging
import json

# this is the parent class of all pages that need to respond to AJAX messages
from app.views.page_controller import PageController

from app.views.sub import SubPage

from app.models.tdata import Sessions
from app.models.tdata import SessionPlayerSelectionInfo
from app.models.tdata import PlayerLocation
from app.models.tdata import PlayerDeath
from app.models.tdata import AttackPrimary
from app.models.tdata import AttackSecondly
from app.models.tdata import AttackMelee

"""
Home Page handler

"""
class IndexPage( PageController ):

    def get(self):

        # use a sub page partial to render some HTML to use within this page. Optional.
        panel = SubPage()
        markup = panel.get_markup()

        tValues = {
            'msg': "This is message from index.py",
            'current_panel': markup
        }

        logging.debug( "rendering main page" )
        self.send_html( '../templates/index.html', tValues )
        return


    def error(self, cmd):
        """
        invalid command handler

        """
        logging.warning('MainPage.post() unrecognized command['+cmd+']')
#         self.send_json( {'returnCode': return_code} )
        return

    def do_load_all_session(self, params):

        # initialize the result, set the value to indicate an error
        result = { 'returnCode': -1 }

        try:
            # Retrieve all Sessions entitites
            sessionDataResultList = Sessions.query()
            
        except ValueError:
            logging.error( 'Attempt to do load all session failed' )
            self.send_json( result )

        dataArray = []
        for sessionData in sessionDataResultList:
            record = {}
            record['sessionKey'] = sessionData.sessionKey
            record['timestamp'] = sessionData.timestamp
            dataArray.append(record)
            
        result['data'] = dataArray

        result['returnCode'] = 0

        self.send_json( result )
        return
    
    def do_load_player_pos(self, params):

        # initialize the result, set the value to indicate an error
        result = { 'returnCode': -1 }

        # read sessionKey
        playerLocation = PlayerLocation()
        playerLocation.sessionKey = str(params['sessionKey'])

        try:
            playerLocationDataResultList = playerLocation.query()
            
        except ValueError:
            logging.error( 'Attempt to do load all session failed' )
            self.send_json( result )

        dataArray = []
        for resultData in playerLocationDataResultList:
            record = {}
            record['sessionKey'] = resultData.sessionKey
            record['timestamp'] = resultData.timestamp
            record['playerNumber'] = resultData.playerNumber
            record['posX'] = resultData.posX
            record['posY'] = resultData.posY
            record['posZ'] = resultData.posZ
            dataArray.append(record)
            
        result['data'] = dataArray

        result['returnCode'] = 0

        self.send_json( result )
        
        return