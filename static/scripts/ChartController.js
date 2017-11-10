class ChartController {
    constructor(dom, dataSet) {
        this.chart = null;
        this.data = null;
        this.options = null;
        this.chartContainer = dom;
        this.dataSet = dataSet;

        // setup call back to render once the data is loaded
        google.charts.load('current', {'packages':['corechart']});

        google.charts.setOnLoadCallback(() => {this.render()});

    }

    setup() {
        this.data = this.setupData();
        this.options = this.setupOptions();
        this.chart = this.setupChart();
    }

    setupData() {
         throw new Error('Needs to be implemented.');
    }

    setupOptions() {
         throw new Error('Needs to be implemented.');
    }

    setupChart() {
         throw new Error('Needs to be implemented.');
    }

    render() {
        // if dom does not exist, stop drawing
        if (!this.chartContainer)
            return;

        this.setup();

        if (!this.data || !this.options)
            return;

        this.chart.draw(this.data, this.options);
    }

}

class BarChartController extends ChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupChart() {
        return new google.visualization.BarChart(this.chartContainer);
    }

}

class PieChartController extends ChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupChart() {
        return new google.visualization.PieChart(this.chartContainer);
    }

}

class LineChartController extends ChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupChart() {
        return new google.visualization.LineChart(this.chartContainer);
    }

}

class WeaponUsageChartController extends BarChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupData() {
        return google.visualization.arrayToDataTable([
            ['Shooting Weapon', 'Times of use',],
            ['Primary', app.cashedPlayData.primaryFireInfoArray ? app.cashedPlayData.primaryFireInfoArray.length : 0],
            ['Secondary', app.cashedPlayData.secondaryFireInfoArray ? app.cashedPlayData.secondaryFireInfoArray.length : 0]
        ]);
    }

    setupOptions() {
        return {
            title: 'Times of shooting weapon use',
            chartArea: {width: '50%'},
            hAxis: {
              title: 'Total ofimes of use',
              minValue: 0
            },
            vAxis: {
              title: 'Shooting Weapon'
            }
        };
    }
}

class PlayerSelectionChartController extends PieChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupData() {

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');

        let crimzonSparkNum = 0;
        let azulonNum = 0;
        let humanOSNum = 0;

        if(app.cashedPlayData.playerSelectionInfoArray) {
            app.cashedPlayData.playerSelectionInfoArray.forEach((e) => {
                switch (e.hovercraftNumber) {
                    case 0:
                      azulonNum++;
                      break;

                    case 1:
                      crimzonSparkNum++;
                      break;

                    case 3:
                      humanOSNum++;
                      break;

                    default:
                      break;
                }
            });
        };

        data.addRows([
            ['Crimzon Spark', crimzonSparkNum],
            ['Azulon', azulonNum],
            ['Unicorn', humanOSNum],
        ]);

        return data;
    }

    setupOptions() {
        return {
            'title':'Ratio of selected hovercraft',
       };
    }
}

class PlayerHeightChartController extends LineChartController {
    constructor(dom, dataSet) {
        super(dom, dataSet);
    }

    setupData() {
        if(!app.cashedPlayData.playerPosInfoArray || !this.sessionKey) return;

        let data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'p1');
        data.addColumn('number', 'p2');
        data.addColumn('number', 'p3');
        data.addColumn('number', 'p4');

        let rows = [];
        let i = 0;
        let firstTimestamp = app.cashedPlayData.playerPosInfoArray[0].timestamp;
        app.cashedPlayData.playerPosInfoArray.forEach((e)=>{
            if (e.timestamp == firstTimestamp) {
                if (e.sessionKey == this.sessionKey) {

                    switch (e.playerNumber) {
                        case 1:
                          rows.push([++i, e.posZ, 0, 0, 0]);
                          break;

                        case 2:
                          rows.push([++i, 0, e.posZ, 0, 0]);
                          break;

                        case 3:
                          rows.push([++i, 0, 0, e.posZ, 0]);
                          break;

                        case 4:
                          rows.push([++i, 0, 0, 0, e.posZ]);
                          break;

                        default:
                          break;
                    }
                }
            }
        });

        data.addRows(rows);


        return data;
    }

    setupOptions() {
        return {
                    hAxis: {
                      title: 'Time'
                    },
                    vAxis: {
                      title: 'Height'
                    },
                    series: {
                      1: {curveType: 'function'}
                    }
                };
    }
}

// update
$(document).ready(function() {
    app.charts.weaponUsageChart = new WeaponUsageChartController($(".chart.shooting-weapon-times")[0]);
    app.charts.playerSelectionChart = new PlayerSelectionChartController($(".chart.hovercraft-selection")[0]);
    app.charts.playerHeightChart = new PlayerHeightChartController($(".chart.player-hight")[0]);
});
