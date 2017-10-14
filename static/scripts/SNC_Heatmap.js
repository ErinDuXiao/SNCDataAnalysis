/**
 * Created by dan on 10/13/17.
 */

var sncHeatmap = h337.create({
  container: document.querySelector('.heatmap-map')
});


// TODO test heatmapHelper
var heatmapHelper = {
  SetNewData: function SetNewData(ue4RawData, filter) {
    if(ue4RawData === undefined || filter === undefined)
      return;
    
    sncHeatmap.clearData();
    
    var max = 0;
    var parsedData = (function(){
      var parsedData = [];
    
      for(var i = 0; i < ue4RawData[filter].length; i++) {
        
        parsedData.push({
          x: ue4RawData[filter][i].x,
          y: ue4RawData[filter][i].y,
          value: 1
        });
      }
    
      return parsedData;
    })();
    
    sncHeatmap.setData({
      //TODO Return the data values.
    });
  }
};

// Call heatmapHelper.SetNewData(ue4RawData, filter) when a filter is applied.
// ue4RawData => All the raw data from UE4
// filter => which data will it display

/// EXMAMPLE V




var some_ue4_data = {
 filetype: "SNCGameplayData"
 sessionKey: "aasdfghjkl",
 timestamp : "the time of session start",
 players : [
 { "playerNumber": "1", "hovercraftName": "3"},
 { "playerNumber": "2", "hovercraftName": "1"},
 { "playerNumber": "3", "hovercraftName": "2"},
 ],
 Primary : [
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p1"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "p2"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p3"},
 ],
 Secondly : [
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p1"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "p2"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p3"},
 ],
 Death : [
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p2"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "p3"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p1"},
 ],
 playerPos : [
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p1"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "bbb", "playerNumber": "p2"},
 { "x": "100", "y": "25", "z": "10", "timestamp" : "aaa", "playerNumber": "p3"},
 ]
 };



heatmapHelper.SetNewData(some_ue4_data, 'Death');
 
