import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const AnalysisYearSale = () => {
    var  lineColorPink= ' rgba(238, 128, 129,0.8)';
    const [lineData, setLineData] = useState({
        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        datasets: [{
            label: '各月份銷售金額',
            fill: false,
            backgroundColor: lineColorPink,
            borderColor: lineColorPink,
            data: [5000, 1000, 5500, 2200, 10000, 13000, 9000, 1000, 10800, 8259, 999, 35555],
            borderWidth:3,
            lineTension: 0
        }]
    });
    const [lineOptions, setLineOptions] = useState({
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        display: true,
                        position: 'left',
                        ticks: {
                            callback: function(value, index, values) {
                                return value + "元";
                            }
                        },
                        scaleLabel:{
                            display: true,
                            labelString: '銷售金額(元)',
                            fontColor: "#546372"
                        }
                    }   
                ]
            },
        }
    });
    return (

        <Line data={lineData} options={lineOptions.options} />

    );
}


export default AnalysisYearSale;