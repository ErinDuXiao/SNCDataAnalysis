/**
 * Heatmap drawing helper
 *
 * @copyright: octo-pi. All Rights Reserved.
 * @author: dan
 * @version: 1.1.0
 *
 * @summary: Framework Singleton Class
 *
 */

class HeatmapHelper {

    constructor() {
        this.points = [];
        this.maxData = 0;
        this.sncHeatmap = h337.create({
          container: document.querySelector('.heatmap-map'),
          radius: 20,
          opacity: 0.6,
          maxOpacity: 0.7,
          blur: .75
        });

      	this.setupHandler();
    }

    setupHandler() {
    }

    clear() {
      this.sncHeatmap.setData({data:[]});
    }

    storeData(data, offsetX, offsetY, scale) {
        let val = 1;

        this.points.push({
          x: this.convertPosition(data.posY, offsetY, scale),
          y: this.convertPosition(data.posX, offsetX, scale),
          value: val
        });
    }

    drawStoredData() {
        let data = {
          max: 2,
          min: 0,
          data: this.points
        };
        console.log(data);
        this.sncHeatmap.setData(data);
    }

    // drawData(data, offsetX, offsetY, scale) {
    //     this.points = [];
    //     this.max = 0;
    //     let width = 960;
    //     let height = 728;
    //     let val = 1;
    //
    //     this.max = Math.max(this.max, data);
    //     let point = {
    //       x: this.convertPosition(data.posY, offsetY, scale),
    //       y: this.convertPosition(data.posX, offsetX, scale),
    //       value: val
    //     };
    //     console.log(point);
    //     this.sncHeatmap.addData(point);
    // }

    convertPosition(pos, offset, scale) {
        return Math.floor(Math.abs(pos - offset) / scale);
    }

}
