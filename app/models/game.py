"""
VFS Demo App
Copyright (C) 2014-2016 Kibble Games Inc. In cooperation with Vancouver Film School All Rights Reserved. 

"""

from google.appengine.ext import ndb


class GameCategories( ndb.Model ):
    n_id = ndb.IntegerProperty( required = True )
    k_gameKey = ndb.KeyProperty()  # maps a collection of 


class Game( ndb.Model ):
    """
    @usage aGame = Game( n_id = 1, s_title = 'A Great Game' )
    
    #Save and get a URL safe key to return to a client
    k_gameKey = aGame.put()
    s_gameKeyHash = k_gameKey.urlsafe()
        
    # given a URL safe key string, retrieve the original object
    k_gameKey = Key( urlsafe = s_gameKeyHash )
    theGame = k_gameKey.get()
    
    """ 
    n_id = ndb.IntegerProperty( required = True )
    s_title = ndb.StringProperty()

    categories = []

    def populate(self):
        self.categories = GameCategories.query().filter( self.n_id ).fetch()
