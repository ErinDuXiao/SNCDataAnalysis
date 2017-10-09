class BarChartController extends ChartController {
  constructor() {
    super();
    this.chardata = null;
    this.chartcolumns = null;
    this.m_chartE1 = document.queryselector("aaaaa");

    // setup call back to render once the data is loaded
    google.charts.load('current', {package: ['corechart']});
    google.charts.setOnLoadCallback(() => {this.render()});

    this._getData().then((data)=>{
      // do something
    });
  }

  render() {
    // @see https://developers.google.com/chart/interactive/docs/gallery/piechart

    if (this.m_charData === null)
      return;

    // let

  }

  async _preload(){}

  _getData()  {
    //Pull data from the server
    // if you want to get reject event, use catch instead of then
    // if you want to use async, it is possible to use await a event.
    // ex. let data = await $.post('/', request);
    return new Promise ((resolve, reject) => {
      let request = {smd: 'get_barchart_data'};
      $.post('/', request )
        .then( (data) ) => {
          resolve( data );
        });
      });
  }
}

$(document).ready(function() {
  let barchart = new BarChartController();
});
