import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';

// import '../css/dashboard.css';

import LeftNav from "./d-LeftNav";
import AnalysisMain from "./d-AnalysisMain";
import { useLocation } from "react-router-dom";

const Analysis = (props) => {
    const { campId, localeSetting, transformDate } = props;

    // const [startAnal, setStartAnal] = useState(transformDate(moment().subtract(7, 'day').format('L')));
    // const [endAnal, setEndAnal] = useState(transformDate(moment().format('L')));
    const [startAnal, setStartAnal] = useState(transformDate(moment().subtract(8, 'day').format('L')));
    const [endAnal, setEndAnal] = useState(transformDate(moment().subtract(1, 'day').format('L')));
    const [analysisData, setAnalysisData] = useState({
        areaInfo: [],
        areaOrderedPercentage: [],
    })

    // let location = useLocation();
    // let queryList = decodeURI(location.search).substring(1,).split("&").join('&');
    // console.log(queryList);
    // let queryObj = {};
    // queryList.map((item) => { return queryObj[item.split("=")[0]] = (item.split("=").length === 2) ? item.split("=")[1] : '' })

    // useEffect(() => {
    //     // window.scrollTo(0, 0);

    //     const fetchItems = async () => {
    //         const result = await axios(
    //             `http://localhost:5000/dashboard/api/analysis/${campId}?${queryList}`,
    //         );
    //         // await setSearchValue(result.data);
    //         console.log(result.data);

    //     }
    //     fetchItems();
    // }, [campId, location, queryList]);
    useEffect(() => {
        const selectCanledar = async () => {
            axios.post(`http://localhost:5000/dashboard/api/analysis`, {
                campId: campId,
                start: startAnal,
                end: endAnal
            }).then((response) => {
                // console.log(response);
                setAnalysisData(response.data);
                // setOrderId(response.data);
                // console.log(response.data.dailyOrder);
                // setDailyOrder(response.data.dailyOrder);
                // setAreaCount(response.data.areaCount);
                // console.log(dailyOrder);
                // setMsgReg(response.data);
            });
        };
        selectCanledar();
    }, [campId, endAnal])

    return (

        <div>
            <div className="container">
                <div className="row">
                    <LeftNav />
                    <AnalysisMain
                        campId={campId}
                        localeSetting={localeSetting}
                        startAnal={startAnal}
                        setStartAnal={setStartAnal}
                        endAnal={endAnal}
                        setEndAnal={setEndAnal}
                        analysisData={analysisData}
                    />
                </div>
                {/* row的div */}
            </div>
            {/* container的div */}
        </div>
        // return div end
    );
}

export default Analysis;