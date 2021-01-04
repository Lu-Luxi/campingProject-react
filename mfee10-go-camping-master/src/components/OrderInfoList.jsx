import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';



// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const OrderInfoList = (props) => {

    const { start, end, campAmount, purchaserName, purchaserPhone, purchaserEmail, orderInfo } = props;

    // console.log(orderInfo);

    const [orderCampName, setOrderCampName] = useState('九號森林露營區2');
    const [orderAreaName, setOrderAreaName] = useState('BB區');
    const [orderAreaPrice, setOrderAreaPrice] = useState(3500);
    const [orderDayCount, setOrderDayCount] = useState(2);


    useEffect(() => {
        setOrderCampName(orderInfo.campInfo[0].campName);
        setOrderAreaName(orderInfo.areaInfo[0].areaName);
        setOrderAreaPrice(orderInfo.areaInfo[0].totalPrice);
        setOrderDayCount(orderInfo.searchInfo[0].dateCount);
    }, [orderInfo.campInfo, orderInfo.areaInfo, orderInfo.searchInfo]);


    return (
        <React.Fragment>
            {/* <!-- 右半邊 --> */}
            <div className="col-4">
                <div className="col bg-white rounded p-4 card" style={{ height: 547 }}>
                    <h4 className="card-title font-weight-bold">
                        訂單詳情
                    </h4>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th style={{ width: "35%" }} className="px-0">
                                    <div>營區名稱</div>
                                </th>
                                <td style={{ width: "65%" }}>
                                    <div>{orderCampName}</div>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">
                                    <div>入營時間</div>
                                    <div>離營時間</div>
                                    <div>入營天數</div>

                                </th>
                                <td >
                                    <div>{start} </div>
                                    <div>{end} </div>
                                    <div>共<span>{orderDayCount}</span>晚</div>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">區域 / 帳數</th>
                                <td>
                                    <span>{orderAreaName}</span> / <span>{campAmount}帳</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">訂購人姓名</th>
                                <td>
                                    <span>{purchaserName}</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">聯絡資料</th>
                                <td>
                                    <div><span>{purchaserEmail}</span></div>
                                    <div><span>{purchaserPhone}</span></div>
                                </td>
                            </tr>

                            <tr>
                                <th className="px-0">付款方式</th>
                                <td>
                                    <span>信用卡</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">付款金額</th>
                                <td>
                                    <h4 className="font-weight-bold" style={{ color: "var(--priceColor)" }}>{orderAreaPrice * campAmount}元</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </React.Fragment >
    );
}


export default OrderInfoList;