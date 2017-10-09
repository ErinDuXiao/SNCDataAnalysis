/**
 * App Singleton MAIN
 *
 * @copyright: octo-pi. All Rights Reserved.
 * @author: octo-pi
 * @version: 1.1.0
 *
 * @summary: Framework Singleton Class
 *
 */
'use strict';

class NameSpace {
    constructor() {
        this.data = new WeakMap();
    }

    members( key, value = undefined ) {
        if (value != undefined) {
            this.data.set( key, value );
        }
        return this.data.get( key );
    }

    static resultFromData( data ) {

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
}

if (app === undefined) {
    var app = {
       'private': new NameSpace(),
       resultFromData: NameSpace.resultFromData
    }
}


class App {

    constructor() {
    	this.setupHandler();
    }
    
    setupHandler() {
        $("#GetSessionInfo").on('click', (event) => {
            event.preventDefault();

            this.loadAllSession();
        });
        
        $("#GetPlayerPosInfo").on('click', (event) => {
            event.preventDefault();

            this.loadPlayerPosition();
        });
    }

    loadAllSession() {
        let request = { cmd: 'load_all_session' }

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                console.log(result);
                
                if(!result || result.returnCode != 0)
                	return;
                
                result.data.forEach(
                    (e) => {
                    	$(".sessionKeyComboBox")
                    	.append(`<option data-levelid="${e.sessionKey}">${e.sessionKey}</option>`);
                    }
                );
            })
    }
    
    loadPlayerPosition() {
    	
        let request = { 
        		cmd: 'load_player_pos',
        		sessionKey: $(".sessionKeyComboBox option:selected").val()
		}

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
//                console.log(result);
                
                if(!result || result.returnCode != 0)
                	return;
                
                result.data.forEach(
                    (e) => {
                    	console.log(e);
                    }
                );
            })
    }
    
    run() {
    	this.loadAllSession();
    }

}

$(document).ready( (event) => {

    let app = new App();
    app.run();
});
