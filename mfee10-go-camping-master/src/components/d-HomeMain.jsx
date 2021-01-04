import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../css/base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from "@fortawesome/free-solid-svg-icons";

import HomeAreaStateChart from './d-HomeAreaStateChart';
import HomeMainAreaOder from './d-HomeMainAreaOrder';

// import calendar from '../img/calendar.png';

const HomeMain = (props) => {
    const { campId, dailyData, setDailyData, areaInfo, dailyOrder, setDailyOrder, value, setValue, areaCount, setAreaCount } = props;
    // const [value, setValue] = useState(new Date());
    // const [calendarDate, setCalendarDate] = useState([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]);
    // const [campId, setCampId] = useState(props.campId);
    // console.log(value);
    // console.log(typeof value);

    // useEffect(() => {
    //     selectCanledar();
    // }, [value])


    // const selectCanledar = async () => {
    //     axios.post(`http://localhost:5000/dashboard/api/calendar`, {
    //         campId: campId,
    //         selectedDate: value.getFullYear() + '-' +
    //             ('00' + (value.getMonth() + 1)).slice(-2) + '-' +
    //             ('00' + value.getDate()).slice(-2) + ' ' +
    //             ('00' + value.getHours()).slice(-2) + ':' +
    //             ('00' + value.getMinutes()).slice(-2) + ':' +
    //             ('00' + value.getSeconds()).slice(-2)
    //     }).then((response) => {
    //         // setOrderId(response.data);
    //         console.log(response.data.dailyOrder);
    //         setDailyOrder(response.data.dailyOrder.dailyOrder)
    //         // setMsgReg(response.data);
    //     });
    // };

    // console.log(dailyData);
    // console.log(dailyOrder);
    return (
        <React.Fragment>
            <main class="col-10 mt-4">
                {/* <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon> */}
                {/* <h3 className=" d-inline title-style ml-1 ">營主後台首頁</h3> */}
                {/* 業績報報start */}
                <div className="row ">
                    <div className="col">
                        <div className="card text-center index-info  " style={{ height: 122, fontSize: 20 }}>
                            <div className="card-body ">
                                <p className="card-title ">今日訂單總金額</p>
                                <p className="card-text">$39,800</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center index-info  " style={{ height: 122, fontSize: 20 }}>
                            <div className="card-body ">
                                <p className="card-title ">今日訂單總數</p>
                                <p className="card-text">6筆</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col">
                        <div className="card text-center index-info  " style={{ height: 122, fontSize: 20 }}>
                            <div className="card-body ">
                                <p className="card-title ">評價總分</p>
                                <p className="card-text">5星</p>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* 業績報報end */}

                {/* 首頁統計圖表及行事曆 */}
                <div className="row mt-4">
                    <div className="col-7 pt-2" >
                        <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon>
                        <h3 className="d-inline title-style ml-1 ">區域預定狀況</h3>

                        <h5 className="mt-2 text-right mb-0 font-weight-bold" style={{ color: "var(--priceColor)" }}>
                            日期：{value.getFullYear() + '-' +
                                ('00' + (value.getMonth() + 1)).slice(-2) + '-' +
                                ('00' + value.getDate()).slice(-2)}
                        </h5>

                        <div className="w-100 mx-3 mt-0">
                            <HomeAreaStateChart
                                dailyOrder={dailyOrder}
                                areaInfo={areaInfo}
                                areaCount={areaCount}
                            />
                        </div>

                    </div>


                    {/* 行事曆 */}
                    <div className="col-5 pt-3" >
                        {/* <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon>
                               <h5 className="d-inline ">行事曆</h5> */}
                        <div className="w-100 mt-3 d-flex justify-content-center pt-3">
                            {/* <img className=" " src={calendar} alt="" /> */}
                            <Calendar
                                className="rounded border-0 "
                                tileClassName=""
                                style={{ height: "50%" }}
                                calendarType="US"
                                value={value}
                                onChange={setValue}
                            />
                        </div>
                    </div>

                </div>
                {/* 首頁統計圖表及行事曆end */}



                {/* 今日訂單明細title */}
                <div className=" mt-5">
                    <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon>
                    <h3 className=" d-inline title-style ml-1 mb-5">
                        {/* {value.getFullYear() + '-' +
                        ('00' + (value.getMonth() + 1)).slice(-2) + '-' +
                        ('00' + value.getDate()).slice(-2)}  */}
                        區域訂單明細
                    </h3>


                </div>
                {/* 今日訂單明細title end */}

                {/* 訂單明細table的div */}
                <div className="mt-3">
                    {areaInfo.map((item, index) => {
                        let orders = [];
                        if (!!dailyOrder) {
                            orders = dailyOrder.filter(e => e.AreaId === item.areaId);
                        }
                        return <HomeMainAreaOder
                            key={index}
                            areaName={item.areaName}
                            areaId={item.areaId}
                            orders={orders}
                        />
                    })}




                </div>
                {/* 訂單明細table的div end */}


            </main>
        </React.Fragment >
    );
}

export default HomeMain;