import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";


const AnalysisArea = (props) => {

    const { analysisData } = props;

    var barColorBlue = ' rgba(2, 103, 187,0.8)';
    var barColorPink = ' rgba(238, 128, 129,0.8)';
    var barColorOrang = ' rgba(242, 182, 125,0.8)';
    var barColorGreen = ' rgba(1, 129, 138,0.8)';
    var barColorRed = ' rgba(152,29, 35,0.8)';
    var hoverColorBlue = ' rgba(2, 103, 187)';
    var hoverColorPink = ' rgba(238, 128, 129)';
    var hoverColorOrang = ' rgba(242, 182, 125)';
    var hoverColorGreen = ' rgba(1, 129, 138)';
    var hoverColorRed = ' rgba(152,29, 35)';

    const [barData, setBarData] = useState({
        // labels: ['A區', 'B區', 'C區', 'D區', 'E區'],
        datasets: [{
            label: '各區域銷售百分比',
            backgroundColor: [barColorBlue, barColorPink, barColorOrang, barColorGreen, barColorRed],
            hoverBackgroundColor: [hoverColorBlue, hoverColorPink, hoverColorOrang, hoverColorGreen, hoverColorRed],
            // <!-- 各區銷售分析 (區域銷售數量/區域開放數量) -->
            data: [40, 54, 33, 40, 43],
            borderWidth: 3,
            FontSize: 30
            // yAxisID: 'y-axis-1',
        }]
    });

    useEffect(() => {
        let newdata = { ...barData };
        newdata.labels = !!analysisData.areaName > 0 ? analysisData.areaName.map(e => e.areaName) : '';
        newdata.datasets[0].data = !!analysisData.areaOrderedPercentage > 0 ? analysisData.areaOrderedPercentage.map(e => e.orderedPercentage * 100) : '';
        setBarData(newdata);
    }, [analysisData])
    // console.log(analysisData);
    const [barOptions, setBarOptions] = useState({
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
                            min: 0,
                            max: 100,
                            fontSize: 16,
                            fontColor: "black",
                            callback: function (value, index, values) {
                                return value + "%";
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: '銷售百分比(%)',
                            fontColor: "black",
                            fontSize: 18,
                        }
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontSize: 20,
                        fontColor: "var(--darkColor)"
                    }
                }]
            },
        }
    });
    return (<Bar data={barData} options={barOptions.options} />);
}
export default AnalysisArea;