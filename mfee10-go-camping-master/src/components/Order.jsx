import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import OrderInfoList from './OrderInfoList';
import OrderCampInfo from './OrderCampInfo';
import OrderWelcome from './OrderWelcome';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';


import { faAngleRight, faCog, faHome, faListAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

import pay03 from '../img/pay03.svg';


const Order = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <React.Fragment>
            <div className="container" style={{ paddingTop: 40 }}>
                <div className="row mt-5">
                    <div className="col-12 d-flex mb-3">
                        {/* <h2 className="card-title text-center font-weight-bold mb-4 pl-4">
                            完成預定
                        <i className="fas fa-check" style={{ color: "#00c300" }}></i>
                        </h2> */}
                        <img src={pay03} alt="" style={{ width: "710px" }} className="m-auto" />
                    </div>
                    {/* <!-- 左半邊 --> */}
                    <div className="col-8 ">
                        <div className="col mb-2">
                            <OrderWelcome />
                            <OrderCampInfo />
                        </div>
                    </div>

                    {/* <OrderInfoList /> */}
                </div>
            </div>


        </React.Fragment >
    );
}


export default Order;