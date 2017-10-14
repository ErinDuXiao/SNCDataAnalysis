/**
 * Created by dan on 10/13/17.
 */

var sncHeatmap = h337.create({
  container: document.querySelector('.heatmap-map')
});

//////////////////////
// Temporary Points...
var points = [];
var max = 0;
var width = 960;
var height = 600;
var len = 200;

while (len--) {
  var val = Math.floor(Math.random()*100);
  max = Math.max(max, val);
  var point = {
    x: Math.floor(Math.random()*width),
    y: Math.floor(Math.random()*height),
    value: val
  };
  points.push(point);
}
// Temporary Points ^
/////////////////////

var data = {
  max: max,
  data: points
};

sncHeatmap.setData(data);
