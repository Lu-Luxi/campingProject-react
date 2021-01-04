import React, { useState } from "react";
import { Radar } from "react-chartjs-2";

const AnalysisCommonRadar = () => {
    // var colorGreen= ' rgba(88, 123, 119,0.7)';
    var colorGreen= ' rgba(1, 64, 64,0.7)';
    var hoverGreen=  ' rgba(238, 128, 129)';
   
    const [radarData, setRadarData] = useState({
        labels: ['交通', '景觀', '設施', '浴廁', '服務'],
        datasets: [{
            label: '評價分數',
            backgroundColor:colorGreen,
            borderColor:colorGreen,
            pointHoverBackgroundColor:hoverGreen,
            pointHoverBorderColor:hoverGreen,
            hoverBackgroundColor:hoverGreen,
            data: [5, 5, 5, 5, 5],
            borderWidth: 1,
           
        }]
    });
    const [radarOptions, setRadarOptions] = useState({
        options: {
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    display: false,  
                    maxTicksLimit: 10
                 },
               
            },
        }
    });
    return (

        <Radar data={radarData} options={radarOptions.options} />

    );


}
export default AnalysisCommonRadar;