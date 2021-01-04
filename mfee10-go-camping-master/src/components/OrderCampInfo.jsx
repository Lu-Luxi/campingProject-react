import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import tent2 from '../img/tent-1.jpeg';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';


import { faAngleRight, faCog, faHome, faListAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLine } from '@fortawesome/free-brands-svg-icons';


// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const OrderCampInfo = (props) => {
    const { campOwnerInfo } = props.orderInfo;
    const { paymentInfo } = props;
    console.log(campOwnerInfo);
    return (
        <React.Fragment>
            <div className="row bg-white rounded cardShadow" style={{}}>
                <div className="col-12 pt-4 px-4 ">
                    <h4 className="card-title font-weight-bold ">
                        露營區資訊
                                    </h4>
                    <hr />
                </div>

                <div className="col-5 pr-0 pl-4 pt-1">
                    <img src={paymentInfo.bookingCampAreaImage[0] === undefined ? "" : paymentInfo.bookingCampAreaImage[0].areaPhoto} alt="" className="card-img" style={{ width: "100%", height: 210 }} />
                </div>

                <div className="col-7">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th style={{ width: "25%" }} className="border-top-0 pt-0 px-0">營區名稱</th>
                                <td style={{ width: "75%" }} className="border-top-0 pt-0 px-0">
                                    <span>
                                        {campOwnerInfo[0].campName}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">營區地址</th>
                                <td className="px-0">
                                    <span>
                                        {campOwnerInfo[0].campAddress}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">營區主人</th>
                                <td className="px-0">
                                    <span>
                                        {campOwnerInfo[0].campOwnerName}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">聯絡方式</th>
                                <td className="px-0">
                                    <span>{campOwnerInfo[0].campOwnerPhone}</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="px-0">其他資訊</th>
                                <td className="px-0 pt-0">
                                    <a href="#" className="mr-1">
                                        <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: 30, color: "#4267b2" }} />
                                    </a>
                                    <a href="#" className="mr-1">
                                        <FontAwesomeIcon icon={faLine} style={{ fontSize: 30, color: "#00c300" }} />
                                    </a>
                                    <a href="#" className="mr-1"><i className="fab fa-instagram-square " style={{ fontSize: 30 }}></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </React.Fragment >
    );
}


export default OrderCampInfo;