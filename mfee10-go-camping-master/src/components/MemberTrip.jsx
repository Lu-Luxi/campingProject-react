import { faCalendar, faCalendarAlt, faCampground, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

import camping from '../img/camping.jpg';

const MemberTrip = (props) => {
    const { latestTrip, latestTripRanking, latestTag, start, end, campAmount, photo } = props;
    // console.log(latestTrip.StayDateRange.substring(0, 11))
    return (
        <React.Fragment>
            {/* <!-- 行程card --> */}
            <div className="card mb-3 border-0 cardShadow">

                {/* <!-- 訂單編號 --> */}
                <div className="card-title mb-0 px-3 py-2 d-flex justify-content-between rounded-top" style={{ backgroundColor: "var(--titleColor)" }}>
                    <span className="ml-auto font-weight-bold">訂單編號&nbsp; <span>{latestTrip ? latestTrip.orderId : ''}</span></span>
                </div>

                <hr className="m-0" style={{ color: "black" }} />

                {/* <!-- 行程資訊 --> */}
                <div className="row no-gutters borderTop ">
                    {/* <!-- 露營區圖片 --> */}
                    <div className="col-md-4 pl-3 pt-3 mb-3" style={{ width: "100%" }}>
                        <img src={(photo === undefined || photo[0] === undefined) ? camping : photo[0].campPhoto} className="" alt="cardImg" style={{ objectFit: "cover", width: "100%", height: "100%" }} />                    </div>
                    {/* <!-- 文字說明部分 --> */}
                    <div className="col-md-8">
                        <div className="card-body pl-4 pt-3 ">
                            {/* <!-- 露營區名稱 --> */}
                            <div>
                                <a className="text-decoration-none m-textHov" href="#">
                                    <h5 className="font-weight-bold">{latestTrip ? latestTrip.CampName : ''}</h5>
                                </a>
                            </div>
                            {/* <!-- 行程地點 --> */}
                            <div className="mb-2">
                                <p className="mb-1">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                        &nbsp;行程地點
                                </p>
                                <span className="font-weight-bolder m-RegularColor">
                                    {latestTrip ? latestTrip.CampAddress : '請去選擇一個營區吧！'}
                                </span>
                            </div>
                            {/* <!-- 行程時間 --> */}
                            <div className="mb-2">
                                <p className="mb-1">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                        &nbsp;行程日期
                                </p>
                                <span className="font-weight-bolder m-RegularColor">
                                    {latestTrip ? latestTrip.StayDateRange : '再選擇一個地點 :)'}
                                </span>
                            </div>
                            {/* <!-- 區域名稱及數量 --> */}
                            <div className="mb-1">
                                <p className="mb-0">
                                    <FontAwesomeIcon icon={faCampground} className="mr-1" />
                                        區域/數量
                                </p>
                                <span className="font-weight-bolder m-RegularColor">{latestTrip ? latestTrip.AreaName : '選個露營區'}</span> /
                                    <span className="font-weight-bolder m-RegularColor"> {latestTrip ? latestTrip.ReservedCount : '還有帳篷數量'}</span>
                                <span className="font-weight-bolder m-RegularColor">{latestTrip ? '帳' : ''}</span>
                                {latestTrip ? <Link to={{ pathname: `/camps/${latestTrip.CampId}`, search: `?start=${start}&end=${end}&campAmount=${campAmount}` }} className="float-right rounded py-1 px-2 text-white" style={{ backgroundColor: "var(--priceColor)" }}>
                                    營區詳情
                                </Link> : ''}

                                {/* <span className="float-right rounded p-1  text-white" style={{ backgroundColor: "var(--btnColor)" }}>
                                        
                                    </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- 行程card結束 --> */}
        </React.Fragment>
    );
}

export default MemberTrip;