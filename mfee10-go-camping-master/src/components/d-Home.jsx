import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeMain from './d-HomeMain';
import LeftNav from './d-LeftNav';

const Home = (props) => {

    const { campId } = props;

    const [dailyData, setDailyData] = useState({});

    const [areaInfo, setAreaInfo] = useState([]);
    const [dailyOrder, setDailyOrder] = useState([]);
    const [areaCount, setAreaCount] = useState([]);
    //行事曆日期
    const [value, setValue] = useState(new Date());


    useEffect(() => {
        selectCanledar();
    }, [value])

    const selectCanledar = async () => {
        axios.post(`http://localhost:5000/dashboard/api/calendar`, {
            campId: campId,
            selectedDate: value.getFullYear() + '-' +
                ('00' + (value.getMonth() + 1)).slice(-2) + '-' +
                ('00' + value.getDate()).slice(-2) + ' ' +
                ('00' + value.getHours()).slice(-2) + ':' +
                ('00' + value.getMinutes()).slice(-2) + ':' +
                ('00' + value.getSeconds()).slice(-2)
        }).then((response) => {
            // setOrderId(response.data);
            // console.log(response.data.dailyOrder);
            setDailyOrder(response.data.dailyOrder);
            setAreaCount(response.data.areaCount);
            // console.log(dailyOrder);
            // setMsgReg(response.data);
        });
    };

    //一開始進網頁的靜態資料
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                `http://localhost:5000/dashboard/api/calendar/${campId}`,
            );
            await setDailyData(result.data);
            await setDailyOrder(result.data.dailyOrder);
            // console.log(dailyOrder);
            await setAreaInfo(result.data.areaInfo);
            await setAreaCount(result.data.areaCount);
        }
        fetchItems();
    }, [campId])





    //一開始進網頁的靜態資料
    // useEffect(() => {
    //     const fetchItem = async () => {
    //         await axios.get(`http://localhost:5000/dashboard/api/calendar/${campId}`).then((response) => {
    //             // console.log(response.data);
    //             setDailyData(response.data);
    //             setDailyOrder(response.data.dailyOrder);
    //             // console.log(dailyOrder);
    //             setAreaInfo(response.data.areaInfo);
    //             setAreaCount(response.data.areaCount);
    //         })
    //     }
    //     // selectCanledar();
    //     fetchItem();
    // }, [campId, setDailyOrder])




    // console.log(dailyData);
    console.log(areaInfo);
    return (
        <React.Fragment>


            {/* <!-- container start --> */}
            <div className="container-fluid">
                <div className="row">
                    <LeftNav />
                    <HomeMain
                        campId={campId}
                        dailyData={dailyData}
                        setDailyData={setDailyData}
                        areaInfo={areaInfo}
                        dailyOrder={dailyOrder}
                        setDailyOrder={setDailyOrder}
                        areaCount={areaCount}
                        setAreaCount={setAreaCount}
                        value={value}
                        setValue={setValue}
                    />

                </div>
                {/* row div end */}
            </div>
            {/* <!-- container end --> */}
        </React.Fragment>
    );

}

export default Home;