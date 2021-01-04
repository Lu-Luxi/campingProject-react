import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';

import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Stars from './Stars';


// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const PaymentList = (props) => {

    const { bookingCampInfo, bookingCampRanking, bookingCampAreaInfo, bookingCampAreaImage, start, end, campAmount, getDays } = props;

    return (
        <React.Fragment>
            <div className="col-12 col-md-4">
                <div className="card mb-4 cardShadow border-0 " style={{ height: "585px" }}>
                    <div className="card-body ">
                        {/* <!-- 營區 摘述 --> */}
                        <div className="row">
                            <div className="col">
                                <h5 className="font-weight-bold">{bookingCampInfo[0].campName}</h5>
                                <div className="star-wrapper" style={{ fontSize: "small" }}>
                                    <span className="card-text d-flex align-items-center mb-3">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" style={{ fontSize: 14 }} />
                                        <span style={{ fontSize: 14 }}>{bookingCampInfo[0].cityName}&nbsp;｜</span>
                                        <Stars ranking={bookingCampRanking[0].ranking} fontSize={14} />
                                        <span className="ml-1" style={{ fontSize: 14 }} >{(Math.round(bookingCampRanking[0].ranking * 10) / 10).toFixed(1)}</span>
                                        <span style={{ fontSize: 14 }}>({bookingCampRanking[0].count})</span>
                                    </span>
                                </div>
                                {/* <p className=" my-0 mt-1">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                    <span>{bookingCampInfo[0].campAddress}</span>
                                </p> */}
                                <div>
                                    {/* {console.log(bookingCampAreaImage[0])} */}
                                    <img src={bookingCampAreaImage[0] === undefined ? "" : bookingCampAreaImage[0].areaPhoto} alt="areaPhoto" className="w-100" style={{ height: 200, objectFit: "contain" }} />
                                </div>
                            </div>
                        </div>


                        <hr className="my-2 " />

                        {/* <!-- 入住日期 --> */}
                        <div className="row mt-2">
                            <div className="col-5 col-md-5 pr-0">
                                <div className="text-muted">入營日期</div>
                                <span >{start}</span>
                            </div>
                            <div className="col-5 col-md-5 pr-0">
                                <div className="text-muted">離營日期</div>
                                <span >{end}</span>
                            </div>
                            <div className="col-2 col-md-2" style={{ alignSelf: "center" }}>
                                <div className="text-muted">
                                    <span>{getDays(start, end)}</span>晚
                                        </div>
                            </div>
                        </div>

                        <hr className="my-2" />

                        {/* <!-- 標籤們 --> */}
                        {/* <div className="card-text text-muted mb-1">營區特色</div>
                        {bookingCampTag.map((item, index) => <span key={index} className=" m-tagStyle rounded">{item.tagName}</span>)}
                        <hr className="mt-3 mb-3" /> */}
                        {/* <!-- 訂單資訊 --> */}
                        <div className="row">
                            <div className="col ">

                                <span className="text-muted">選擇區域：</span>{bookingCampAreaInfo[0].areaName}

                            </div>
                        </div>
                        <hr className="mt-3 mb-2" />

                        <div className="text-muted mb-3">付款明細：</div>

                        <div className="row">

                            <div className="col-6">
                                <div className="mb-2"><span>{campAmount}</span>帳<span>{getDays(start, end)}</span>晚</div>
                                <div className="mb-1">折扣金額：</div>
                                {/* <h4 className="font-weight-bold" >應負總額</h4> */}
                                <div className="font-weight-bold" style={{ fontSize: "1.2rem" }}>應付總額：</div>

                            </div>

                            <div className="col-6">
                                <div className="mb-2 text-right"><span>{campAmount}</span>&nbsp;x&nbsp;<span>{bookingCampAreaInfo[0].totalPrice}</span>元</div>
                                <div className="mb-1 text-right"><span>0</span>元</div>
                                <h4 className="font-weight-bold text-right" style={{ color: "var(--priceColor)" }}>{campAmount * bookingCampAreaInfo[0].totalPrice}元</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}


export default PaymentList;