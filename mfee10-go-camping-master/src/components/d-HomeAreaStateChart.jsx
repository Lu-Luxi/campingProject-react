import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";


const IndexAreaStateChart = (props) => {

    const { areaInfo, dailyOrder, areaCount } = props;

    console.log(areaInfo, areaCount);

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

    const [count, setCount] = useState(new Array(areaInfo.length).fill(0));
    // let temp = newAreaCount.map((e,index)=>count[areaInfo.map((e,index)=>{return e.areaId}).indexOf(e)] = areaCount[index].reservedCount);

    const [barData, setBarData] = useState({
        labels: ['A區', 'B區', 'C區', 'D區', 'E區'],
        datasets: [{
            label: '各區域銷售狀況',
            backgroundColor: [barColorBlue, barColorPink, barColorOrang, barColorGreen, barColorRed],
            hoverBackgroundColor: [hoverColorBlue, hoverColorPink, hoverColorOrang, hoverColorGreen, hoverColorRed],
            data: [0, 0, 0, 0, 0],
            borderWidth: 1
        }]
    });

    // useEffect(() => {
    //     let newdata = { ...barData };
    //     newdata.labels = areaInfo.map(e => e.areaName);
    //     newdata.datasets[0].data = areaCount.length === 0 ? [''] : areaCount.map(e => e.reservedCount);
    //     setBarData(newdata);
    // }, [areaCount])
    useEffect(() => {
        let newdata = { ...barData };
        newdata.labels = areaInfo.map(e => e.areaName);
        setCount(areaCount.map((e, index) => { return e.AreaId }).map((e, index) => count[areaInfo.map((e, index) => { return e.areaId }).indexOf(e)] = areaCount[index].reservedCount));
        newdata.datasets[0].data = areaCount.length === 0 ? [''] : count;
        setBarData(newdata);
    }, [areaCount])


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
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return value;
                            },
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                            fontSize: 20,
                            fontColor: "black"
                        },
                        scaleLabel: {
                            display: true,

                            labelString: '區域預約數量(帳)',
                            fontSize: 20,
                            fontColor: "black"
                        },
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontSize: 20,
                        fontColor: "black"
                    }
                }]

            },
        }
    });



    return (

        <Bar data={barData} options={barOptions.options} />

    );
}



export default IndexAreaStateChart;



