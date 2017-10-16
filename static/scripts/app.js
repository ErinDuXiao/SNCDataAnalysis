/**
 * App Singleton MAIN
 *
 * @copyright: octo-pi. All Rights Reserved.
 * @author: erin
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
      this.heatmap = new HeatmapHelper();

    	this.setupHandler();
    }

    setupHandler() {
        $("#GetSessionInfoButton").on('click',(event) => {
            this.loadAllSession();
        });

        $("#sessionKeyComboBox").on('change',(event) => {
            //
        });

        $("#eventInfoComboBox").on('change',(event) => {
            let selectedVal = $("#eventInfoComboBox option:selected").val();
            switch(selectedVal) {
                case "primary":
                    this.loadPrimaryFireInfo();
                    break;

                case "secondary":
                    this.loadSecondaryInfo();
                    break;

                case "death":
                    this.loadDeathInfo();
                    break;

                case "boost":
                    this.loadBoostInfo();
                    break;

                case "pos":
                    this.loadPlayerPosition();
                    break;

                default:
                    break;
            }
        });

    }

    loadAllSession() {
        let request = { cmd: 'load_all_session' };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                console.log(result);

                if(!result || result.returnCode != 0)
                	return;

                result.data.forEach(
                    (e) => {
                    	$("#sessionKeyComboBox")
                    	.append(`<option data-levelid="${e.sessionKey}">${e.sessionKey}</option>`);
                    }
                );
            });
    }

    loadPrimaryFireInfo() {

        let request = {
            cmd: 'load_primary_fire_info',
            sessionKey: $("#sessionKeyComboBox option:selected").val()
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                result.data.forEach(
                    (e) => {
                      this.heatmap.drawData(e, 4200, -7680, 17);
                    }
                );
            });
    }

    loadSecondaryInfo() {

        let request = {
            cmd: 'load_secondary_fire_info',
            sessionKey: $("#sessionKeyComboBox option:selected").val()
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                result.data.forEach(
                    (e) => {
                      this.heatmap.drawData(e, 4200, -7680, 17);
                    }
                );
            });
    }

    loadDeathInfo() {

        let request = {
            cmd: 'load_death_info',
            sessionKey: $("#sessionKeyComboBox option:selected").val()
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                result.data.forEach(
                    (e) => {
                      this.heatmap.drawData(e, 4200, -7680, 17);
                    }
                );
            });
    }

    loadBoostInfo() {

        let request = {
            cmd: 'load_boost_info',
            sessionKey: $("#sessionKeyComboBox option:selected").val()
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                result.data.forEach(
                    (e) => {
                      this.heatmap.drawData(e, 4200, -7680, 17);
                    }
                );
            });
    }

    loadPlayerPosition() {

        let request = {
        		cmd: 'load_player_pos',
        		sessionKey: $("#sessionKeyComboBox option:selected").val()
          };

          // post to the server
          $.post('/', $.param(request))
              .then ((result) => {
                  if(!result || result.returnCode != 0)
                    return;

                  result.data.forEach(
                      (e) => {
                        this.heatmap.drawData(e, 4200, -7680, 17);
                      }
                  );
              });
    }

    run() {
    	   this.loadAllSession();
    }

}

$(document).ready( (event) => {
    let app = new App();
    app.run();
});
