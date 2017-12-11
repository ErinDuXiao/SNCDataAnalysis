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

// define namespace
if (app === undefined) {
    var app = {
        charts:{
            playerSelectionChart: undefined,
            weaponUsageChart: undefined,
        },
        cashedPlayData: {
            sessionInfoArray: undefined,
            primaryFireInfoArray: undefined,
            secondaryFireInfoArray: undefined,
            deathInfoArray: undefined,
            boostInfoArray: undefined,
            playerPosInfoArray: undefined,
            playerSelectionInfoArray: undefined
        }
    }
}

class App {

    constructor() {
        this.heatmap = new HeatmapHelper();
        this.getData();
      	this.setupHandler();
    }

    update() {
        this.getData();
    }

    getData() {
        this.loadPrimaryFireInfo();
        this.loadSecondaryInfo();
        this.loadDeathInfo();
        this.loadBoostInfo();
        this.loadPlayerPosition();
        this.loadPlayerSelection();
    }

    postGetData() {
        // check if all data ready
        if (app.cashedPlayData.primaryFireInfoArray
          && app.cashedPlayData.secondaryFireInfoArray
          && app.cashedPlayData.deathInfoArray
          && app.cashedPlayData.boostInfoArray
          && app.cashedPlayData.playerPosInfoArray
          && app.cashedPlayData.playerSelectionInfoArray) {
              $(".loading-message").hide();
        }
    }

    drawHeatMap(data) {
        if (!data) return;

        data.forEach(
            (e) => {
                this.heatmap.storeData(e, 5880, -8670, 18.0833);
            }
        );

        this.heatmap.drawStoredData();
    }

    setupHandler() {

        $("#line-chart-filter").on('click', (event) => {
            app.charts.playerHeightChart.sessionKey = $("#line-chart-filter option:selected").val();
            app.charts.playerHeightChart.render();
        });

        $("#eventSelectButton").on('click',(event) => {
            let selectedVal = $("#eventInfoComboBox option:selected").val();
            this.heatmap.clear();
            switch(selectedVal) {
                case "primary":
                    this.drawHeatMap(app.cashedPlayData.primaryFireInfoArray);
                    break;

                case "secondary":
                    this.drawHeatMap(app.cashedPlayData.secondaryFireInfoArray);
                    break;

                case "death":
                    this.drawHeatMap(app.cashedPlayData.deathInfoArray);
                    break;

                case "boost":
                    this.drawHeatMap(app.cashedPlayData.boostInfoArray);
                    break;

                case "pos":
                    this.drawHeatMap(app.cashedPlayData.playerPosInfoArray);
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
                      	.append(`<option value="${e.sessionKey}">${e.sessionKey}</option>`);

                        $("#line-chart-filter")
                        .append(`<option value="${e.sessionKey}">${e.sessionKey}</option>`);
                    }
                );
                $(".heatmap-options").show();
                this.postGetData();

            });
    }

    loadPrimaryFireInfo() {
        let request = {
            cmd: 'load_primary_fire_info',
            // sessionKey: $("#sessionKeyComboBox option:selected").val()
            sessionKey: ""
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                app.cashedPlayData.primaryFireInfoArray = result.data;
                $("#eventInfoComboBox .primary").show();

                if (app.cashedPlayData.secondaryFireInfoArray) {
                    app.charts.weaponUsageChart.render();
                }

                this.postGetData();

            });
    }

    loadSecondaryInfo() {

        let request = {
            cmd: 'load_secondary_fire_info',
            // sessionKey: $("#sessionKeyComboBox option:selected").val()
            sessionKey: ""
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                app.cashedPlayData.secondaryFireInfoArray = result.data;

                $("#eventInfoComboBox .secondary").show();

                if (app.cashedPlayData.primaryFireInfoArray) {
                    app.charts.weaponUsageChart.render();
                }

                this.postGetData();

            });
    }


    loadBoostInfo() {

        let request = {
            cmd: 'load_boost_info',
            // sessionKey: $("#sessionKeyComboBox option:selected").val()
            sessionKey: ""
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                app.cashedPlayData.boostInfoArray = result.data;

                $("#eventInfoComboBox .boost").show();

                this.postGetData();
            });
    }


    loadDeathInfo() {

        let request = {
            cmd: 'load_death_info',
            // sessionKey: $("#sessionKeyComboBox option:selected").val()
            sessionKey: ""
          };

        // post to the server
        $.post('/', $.param(request))
            .then ((result) => {
                if(!result || result.returnCode != 0)
                  return;

                app.cashedPlayData.deathInfoArray = result.data;

                $("#eventInfoComboBox .death").show();

                this.postGetData();
            });
    }

    loadPlayerPosition() {

        let request = {
        		cmd: 'load_player_pos',
            // sessionKey: $("#sessionKeyComboBox option:selected").val()
            sessionKey: ""
          };

          // post to the server
          $.post('/', $.param(request))
              .then ((result) => {
                  if(!result || result.returnCode != 0)
                    return;

                  app.cashedPlayData.playerPosInfoArray = result.data;

                  $("#eventInfoComboBox .pos").show();
                  app.charts.playerHeightChart.render();
                  this.postGetData();
              });
    }


    loadPlayerSelection() {

        let request = {
        		cmd: 'load_all_player_selection',
          };

          // post to the server
          $.post('/', $.param(request))
              .then ((result) => {
                  if(!result || result.returnCode != 0)
                    return;

                  app.cashedPlayData.playerSelectionInfoArray = result.data;
                  app.charts.playerSelectionChart.render();

                  this.postGetData();

              });
    }

    run() {
        this.loadAllSession();

        // self = this;
        // let frame = function( timestamp ) {
        //
        //    self.update();
        //    if (app.charts && app.charts.length) {
        //
        //
        //       app.charts.forEach((e) => {
        //           e.run()
        //       });
        //    }
        //
        //    window.requestAnimationFrame( frame );
        // };
        //
        // // This is the simplest game loop possible.
        // window.requestAnimationFrame( frame );
    }

}

$(document).ready( (event) => {
    let app = new App();
    app.run();
});
