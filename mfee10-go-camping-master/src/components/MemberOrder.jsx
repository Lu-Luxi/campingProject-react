import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import camping from '../img/camping.jpg';
import Stars from './Stars';
import { faCommentDots, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import MemberOrderDetail from './MemberOrderDetail'
import MemberOrderComment from './MemberOrderComment'
import { Link } from 'react-router-dom';

const MemberOrder = (props) => {

    const { data, orderId, ranking, tag, campId, campName, orderDate, purchaserName, stayDateRange, reservedCount, paymentMethod, paymentAmount, campAddress, campPhone, campOwnerName, cityName, areaName, rankingText, rankCount, status, photo, start, end, campAmount } = props;
    console.log(data)
    let checkinDay = stayDateRange.slice(0, 11);
    let checkoutDay = stayDateRange.slice(14, 25);
    let orderDataSlice = orderDate.slice(0, 10);
    const DateRange = (fromDate, toDate) => {
        let tempFrom = fromDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
        let tempTo = toDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
        let dt1 = new Date(tempFrom);
        let dt2 = new Date(tempTo);
        let totalDays = parseInt(Math.abs(dt1 - dt2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
        return totalDays;
    }
    const totalDays = DateRange(checkinDay, checkoutDay)
    // console.log(totalDays)
    let totalReviews = 200
    // console.log(ranking)
    // console.log(tag)
    console.log(props)

    return (
        <React.Fragment>


            <div class="card mb-3 mt-0" style={{ width: "100%" }}>
                <div className="col text-right py-2 font-weight-bold rounded-top" style={{ backgroundColor: "var(--titleColor)" }} >
                    訂單編號 #{orderId}
                </div>
                {/* <!-- card_title --> */}
                {/* card-img oddCardImg */}
                <div class="row no-gutters">
                    <div class="col-md-4 col-12 pt-3 pb-0 pl-3 w-100">
                        <img src={!!photo[0] ? photo[0].campPhoto : null} class="w-100" alt="oddImage" style={{ objectFit: "contain" }} />
                    </div>

                    <div class="col-md-4 col-12 pt-2">
                        <div class="card-body p-3 overflow-hidden" style={{ padding: 0, height: 150 }}>
                            <Link to={{ pathname: `/camps/${campId}`, search: `?start=2020年12月20日&end=2020年12月21日&campAmount=1` }} className="text-decoration-none m-cardImg" onClick={props.handleClick}>
                                <h5 class="card-title mb-3 font-weight-bold">{campName}</h5>
                            </Link>
                            <p class="card-text mb-1 m-fontS12">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span className="ml-1">地點 {cityName}</span>
                            </p>
                            {/* <!-- 營區分類標籤 --> */}
                            <div class="mb-3">
                                {tag.map((item, index) => <button key={index} type="button" class="btn m-tagStyle ">{item.tagName}</button>)}
                            </div>
                            <div class="m-starHome">
                                <p class="card-text mb-1 m-fontS12">

                                    <Stars ranking={ranking} fontSize={14} />

                                    {/* <FontAwesomeIcon icon={faStar} style={{ fontSize: 14, color: "rgb(238, 199, 73)" }} /> */}
                                    <span className="ml-1">{ranking}</span>
                                    <span>({rankCount})</span>
                                </p>
                            </div>
                        </div>
                    </div>




                    <div className="col-md-4 col-12 p-3 pb-0 overflow-hidden" >
                        <div class=" row" style={{ height: "100%" }}>
                            {/* <div class="col-12 mb-1">
                        訂單編號:#20200822001
                    </div> */}
                            {/* <div className="col-12">
                        訂單資訊
                    </div> */}
                            <div className="col-5">
                                {/* <p class="mb-1 font-weight-bold">&nbsp;</p> */}
                                <p class="mb-2 font-weight-bold">入營日期</p>
                                <p class="mb-2 font-weight-bold">離營日期</p>
                                <p class="mb-2 font-weight-bold">入營天數</p>
                                <p class=" font-weight-bold">區域/帳數</p>
                            </div>
                            <div className="col-7">
                                {/* <p class="mb-2">#20200822002</p> */}
                                <p class="mb-2">{checkinDay}</p>
                                <p class="mb-2">{checkoutDay}</p>
                                <p class="mb-2"><span>{totalDays}</span>天</p>
                                <p class="mb-2"><span>{areaName}</span>/<span>{reservedCount}</span>帳</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 p-0 mb-3" style={{ borderTop: "0px solid var(--titleColor)" }}>
                        <div class="row">
                            <div class="col-md-6 col-12 px-0 pl-3">
                                {(status === "past" && !rankingText) ? <button type="button" id="EvaluationBtn"
                                    class="btn my-2 mx-3 font-weight-bold p-0" data-toggle="modal"
                                    data-target={`#orId${orderId}cm`}
                                    onClick={() => console.log("click")}
                                >
                                    留下寶貴評價
                            <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: 16 }} className="ml-1" />
                                </button> : ''}

                            </div>
                            <div class="col-md-6 col-12 pr-4">
                                <button class="btn  px-5 float-md-right float-right text-white"
                                    type="button" data-toggle="collapse" data-target={`#odr${orderId}`}
                                    aria-expanded="false" aria-controls="collapseExample"
                                    style={{ backgroundColor: "var(--btnColor)" }}>
                                    查&nbsp;看&nbsp;詳&nbsp;情
                        </button>
                            </div>
                        </div>
                    </div>



                    {/* <!-- 下拉區域 --> */}
                    <MemberOrderDetail
                        DropdownId={`odr${orderId}`}
                        campName={campName}
                        orderDate={orderDataSlice}
                        purchaserName={purchaserName}
                        paymentMethod={paymentMethod}
                        paymentAmount={paymentAmount}
                        campAddress={campAddress}
                        campPhone={campPhone}
                        campOwnerName={campOwnerName}
                        areaName={areaName}
                        reservedCount={reservedCount}
                        rankingText={rankingText}
                        checkinDay={checkinDay}
                        checkoutDay={checkoutDay}
                        totalDays={totalDays}
                    />
                    {/* <!-- card_odd_message --> */}
                </div>
            </div>

            {/* Modal */}
            {!!data ? data.pastOrders.map((item, index) => {
                // let ranking = data.orderRanking.filter(e => e.campId === item.CampId);
                // let tag = data.orderCampTag.filter(e => e.campId === item.CampId);
                // console.log(ranking);
                return (
                    <MemberOrderComment
                        key={index}
                        orderId={item.orderId}
                        // ranking={ranking[0] === undefined ? "" : ranking[0].ranking}
                        // rankCount={ranking[0] === undefined ? "" : ranking[0].count}
                        // tag={tag}
                        campId={item.CampId}
                        campName={item.CampName}
                        orderDate={item.OrderDate}
                        purchaserName={item.PurchaserName}
                        stayDateRange={item.StayDateRange}
                        reservedCount={item.ReservedCount}
                        paymentMethod={item.PaymentMethod}
                        paymentAmount={item.PaymentAmount}
                        campAddress={item.CampAddress}
                        campPhone={item.CampPhone}
                        campOwnerName={item.CampOwnerName}
                        cityName={item.cityName}
                        areaName={item.AreaName}
                        rankingText={item.RankingText}
                        status={'future'}
                    />
                )
            }) : null}

        </React.Fragment>
    )
}

export default MemberOrder