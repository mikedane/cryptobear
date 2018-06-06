import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';
require('chartjs-plugin-annotation');
const Helpers = require("../helpers.js");

function CoinHistoryChart(props){
    const { historyData, classes, selectedChartIndex } = props;
    let volumeColor = 'rgba(224, 224, 224, 0.8)';
    let priceColor = '#2a9d89';
    let chartData = {
        labels: constructLabelsArray(historyData, selectedChartIndex),
        datasets: [
            {
                label: 'Price',
                fill: false,
                lineTension: 0.1,
                backgroundColor: priceColor,
                borderColor: priceColor,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: priceColor,
                pointBackgroundColor: priceColor,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: priceColor,
                pointHoverBorderColor: priceColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: constructPriceArray(historyData),
                yAxisID: 'y-axis-2'
            },
            {
                label: 'Volume ',
                fill: true,
                lineTension: 0.1,
                backgroundColor: volumeColor,
                borderColor: volumeColor,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: volumeColor,
                pointBackgroundColor: volumeColor,
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBackgroundColor: volumeColor,
                pointHoverBorderColor: volumeColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: constructVolumeArray(historyData),
                yAxisID: 'y-axis-1'
            },
        ]};
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            mode: 'label',
            intersect: false,
        },
        annotation: {
            annotations: [
                {
                type: "line",
                mode: "vertical",
                scaleID: "y-axis-1",
                borderColor: "#e76f51",
                }
            ]
        },
        events: ['mousemove'],
        onHover: function(e){
            
        },
        elements: {
            line: {
            fill: false
            }
        },
        scales: {
            xAxes: [
            {
                display: true,
                gridLines: {
                display: false
                },
                id: 'x-axis-1',

                labels: constructLabelsArray(historyData, selectedChartIndex),
            }
            ],
            yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-1',
                gridLines: {
                display: false
                },
                labels: {
                show: true
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-2',
                gridLines: {
                display: false
                },
                labels: {
                show: true
                }
            }
            ]
        }};
    return (
        <div>

            <Line data={chartData} options={chartOptions} height={400} redraw={false} />

        </div>
    );
}    

function constructLabelsArray(coinData, selectedChartIndex){
    let labels = [];
        coinData.map((coin) => {
            let time = Helpers.convertUTCSecondsToDate(coin.time);
            if(selectedChartIndex == 0 || selectedChartIndex == 1){
                labels.push(Helpers.formatDateAsHourOfDay(time));
            } else {
                labels.push(Helpers.formatDateAsDayOfYear(time));
            }

        });
    
    return labels;
}

function constructPriceArray(coinData){
    let data = [];
        coinData.map((coin, index) => {
            data.push(coin.high);
        
        })
    

    return data;
}

function constructVolumeArray(coinData){
    let data = [];
        coinData.map((coin, index) => {
            data.push(Math.round(coin.volumefrom));
        })
    
    return data;
}



const styles = theme => ({
    
});


export default withStyles(styles)(CoinHistoryChart);