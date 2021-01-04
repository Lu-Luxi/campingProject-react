import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';

// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const PaymentWay = (props) => {
    const { start, end, campAmount, campId, areaId } = props;

    const [payMethod, setPayMethod] = useState(1);
    return (
        <React.Fragment>
            <div className="card mt-2 cardShadow border-0 " style={{}}>
                <div className="card-body">
                    <h4 className="card-title font-weight-bold">
                        選擇付款方式
                    </h4>
                    <hr />
                    <div className="row">
                        <div className="col row pr-0">
                            <div className="col-8 d-flex">
                                <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>付款方式</span>
                                {/* <div className="mb-2"></div> */}
                                <select
                                    className="form-control searchInput"
                                    name="payMethod"
                                    id="payMethod"
                                    style={{ width: "230px" }}
                                    onChange={event => setPayMethod(event.target.value)}
                                >
                                    <option value="1">信用卡付款</option>
                                    <option value="2">ATM轉帳</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    {/* <div className="mb-3 mt-3">
                        <a href="./camp_intro.html">
                            <i className="fas fa-angle-double-left"></i>&nbsp;
                                     <span>變更訂購選擇</span>
                        </a>
                    </div> */}
                </div>
            </div>

            {/* 折扣優惠 */}
            <div className="card mt-2 mb-2 cardShadow border-0 " style={{}}>
                <div className="card-body">
                    <h4 className="card-title font-weight-bold">
                        使用折扣
                    </h4>
                    <hr />
                    <div className="row">
                        <div className="col-12  pr-0">
                            <div className="col-8 d-flex align-items-center">
                                <span className="mr-3 ">選擇折扣券</span>
                                {/* <div className="mb-2"></div> */}
                                <select className="form-control searchInput" id="tentNum"
                                    style={{ width: "230px" }}>
                                    <option value="1">無</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="col- p-0 text-white mt-5 d-flex mx-auto" >
                            <a href="order_done.html" className="btn m-btnBgColor text-white " style={{ width: 300 }}>
                                前往付款
                            </a>
                        </div> */}

                    </div>
                    {/* <div className="mb-3 mt-3">
                        <a href="./camp_intro.html">
                            <i className="fas fa-angle-double-left"></i>&nbsp;
                                     <span>變更訂購選擇</span>
                        </a>
                    </div> */}
                </div>
            </div>

            {/* 前往付款 */}
            <div className="card mt-0 mb-2 cardShadow border-0 " style={{}}>
                <div className="card-body m-auto">

                    <div className="col-12 p-0  btn m-btnBgColor text-white mt-1 " >
                        <Link to={{ pathname: `/order-create/credit-card`, search: `?id=${campId}&areaid=${areaId}&start=${start}&end=${end}&campAmount=${campAmount}&payMethod=${payMethod}` }} className="btn m-tagBgColor text-white" style={{ width: 230, fontSize: 18, letterSpacing: 2 }}>
                            前往付款
                        </Link>
                    </div>

                </div>
            </div>

        </React.Fragment >
    );
}


export default PaymentWay;