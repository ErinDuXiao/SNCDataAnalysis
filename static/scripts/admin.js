/**
 *  This singleton object controls the template code above
 */
'use strict';

class AdminApp {

    constructor() {
        this.setupHandlers();
    }

    setupHandlers() {

        $("#PutSessionInfo").on('click', (event) => {
            event.preventDefault();
            let payload = {
                          	"sessionKey": "awsedrftgyhu",
                          	"timestamp" : "20171008",
                          	"players": [
                          		{ "playerNumber": "1", "hovercraftNumber": "3"},
                          		{ "playerNumber": "2", "hovercraftNumber": "1"},
                          		{ "playerNumber": "3", "hovercraftNumber": "2"}
                          	]
                          };


            let request = {
        				cmd: 'save_session',
        				data: JSON.stringify(payload)
        		}

            // post to the server
            $.post('/admin', $.param(request))
                .then ((data) => {
                    console.log(data);
            })
        });
        

        $("#PutEventsInfo").on('click', (event) => {
            event.preventDefault();
            let payload = {
            	    sessionKey: "aasdfghjkl",
            	    primary : [
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "1"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "2"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "3"},
            	    ],
            	    secondly : [
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "1"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "2"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "3"},
            	    ],
            	    melee : [
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "1"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "2"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "3"},
            	    ],
            	    death : [
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "2"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "3"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "1"},
            	    ]
            	};

            let request = {
        				cmd: 'save_events',
        				data: JSON.stringify(payload)
        		}

            // post to the server
            $.post('/admin', $.param(request))
                .then ((data) => {
                    console.log(data);
            })
        });
        

        $("#PutPlayerPos").on('click', (event) => {
            event.preventDefault();
            let payload = {
            	    sessionKey: "aasdfghjkl",
            	    playerPos : [
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "1"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "2"},
            	        { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "3"},
            	    ]
            	};


            let request = {
        				cmd: 'save_player_pos',
        				data: JSON.stringify(payload)
        		}

            // post to the server
            $.post('/admin', $.param(request))
                .then ((data) => {
                    console.log(data);
            })
        });

    }

}
var adminApp = new AdminApp();
