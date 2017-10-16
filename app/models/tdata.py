"""
Telemetry data for SNC project
"""

from google.appengine.ext import ndb
# from google.appengine.ext.remote_api.throttle import ENTITIES_FETCHED

# TODO: FIX Timestamp from string to time

class Sessions( ndb.Model ):
    sessionKey = ndb.StringProperty(indexed = True)
    timestamp = ndb.StringProperty()
            
class SessionPlayerSelectionInfo ( ndb.Model ):            
    sessionKey = ndb.StringProperty(indexed = True)
    playerNumber = ndb.IntegerProperty()        
    hovercraftNumber = ndb.IntegerProperty()        
            
class PlayerLocation( ndb.Model ):            
    sessionKey = ndb.StringProperty(indexed = True)
    timestamp = ndb.StringProperty()       
    playerNumber = ndb.IntegerProperty()        
    posX = ndb.FloatProperty()
    posY = ndb.FloatProperty()
    posZ = ndb.FloatProperty()       
            
class PlayerDeath( ndb.Model ):            
    sessionKey = ndb.StringProperty(indexed = True)
    timestamp = ndb.StringProperty()        
    playerNumber = ndb.IntegerProperty()        
    posX = ndb.FloatProperty()
    posY = ndb.FloatProperty()
    posZ = ndb.FloatProperty()      
            
class PrimaryFire( ndb.Model ):            
    sessionKey = ndb.StringProperty(indexed = True)
    timestamp = ndb.StringProperty()
    playerNumber = ndb.IntegerProperty()        
    posX = ndb.FloatProperty()
    posY = ndb.FloatProperty()
    posZ = ndb.FloatProperty()       
            
            
class SecondaryFire( ndb.Model ):            
    sessionKey = ndb.StringProperty(indexed = True)        
    timestamp = ndb.StringProperty()        
    playerNumber = ndb.IntegerProperty()        
    posX = ndb.FloatProperty()
    posY = ndb.FloatProperty()
    posZ = ndb.FloatProperty()     
            
