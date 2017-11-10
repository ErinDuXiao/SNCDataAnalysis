/**
 *  This singleton object controls the template code above
 */
'use strict';

class SubPanel {

    constructor() {

        $("#sub-submit").on('submit', ( event ) => {
            event.preventDefault();                 
            this.savePlayer();
        });
        
        $("#testGet").on('submit', ( event ) => {
            event.preventDefault();                 
            this.getPlayerInfo();
        });
    }
    
    savePlayer() {
        
        // Post request for data to the server (python code)
        $('#status').html("");  // clear the result
        
        let instr = $("#sub-submit").serialize();
        $.post( '/', instr )
            .then( ( data ) => {
                
                // Data from AppEngine comes back as an object, 
                // from PHP as a JSOn format string.
                // This makes sure that whatever we get it gets 
                // back to us eventually as an object.
                let result = this.resultFromData( data );
                
                if (result.returnCode === 0) {
        
                    // screen element update( obj.playerJSON );
                    this.render( result );
        
                } else if (result.returnCode === -1) {
        
                    window.location = '/';
                    return;
                }
            });
    }
    
    getPlayerInfo() {
        
        $('#status').html("");  // clear the result
        
        let instr = $("#testGet").serialize();
        $.post( '/', instr )
            .then( ( data ) => {
            	
            	console.log(data);
            	
                let result = this.resultFromData( data );
                
                if (result.returnCode === 0) {
        
                    // screen element update( obj.playerJSON );
                    this.render( result );
        
                } else if (result.returnCode === -1) {
        
                    window.location = '/';
                    return;
                }
            });
    }
    
    resultFromData( data ) {

        let result = null; 
        switch (typeof data) {
            case 'string':
                result = $.parseJSON( data );
                break;
                
            case 'object':
                result = data;
                break;
            
            default:
                result = null; 
                break;
        }
        return result;
    }
        
        
    render( data ) {
    
        $("input[name='PlayerName']").val( data.playerName );
        $("input[name='DriverName']").val( data.driverName );
        
        $('#status').html("User " + data.playerName + " logged in as " + data.driverName );
        $('#status').append("<br />");
        $('#status').append("The user key is: " + data.keySafe );
    }
}
var theSubPanelInstance = new SubPanel();
