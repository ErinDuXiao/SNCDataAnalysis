"""
VFS Demo App
Copyright (C) 2014 Kibble Games Inc. In cooperation with Vancouver Film School All Rights Reserved. 

"""

from google.appengine.ext import ndb


class User( ndb.Model ):
    """
    @desc A user in our system
    
    """
    name = ndb.StringProperty( required = True )
    email = ndb.StringProperty()
    
    """
    Capture the password on registration and use an MD5 hash for a urlsafe string
    to store the hashed value.   This way the user password is never exposed to 
    our software.  We instead store the hash so the user passwd needs to be re-hashed
    on validation before testinag against this.
    
    """
    password_hash = ndb.StringProperty()    
    jid = ndb.StringProperty()
    
    @classmethod
    def query_user( cls, k_ancestor ):
        return cls.query( jid = k_ancestor )

    
    def authenticate(self):
        """
        @desc use this to validate the retrieved user against some popular OAuth
        credentials (Facebook, Google)
        
        """
        return
    
