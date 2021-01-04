import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import camping from '../img/camping.jpg';
import Stars from './Stars';
import { faCommentDots, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import MemberOrder from './MemberOrder'
import MemberOrderComment from './MemberOrderComment'

const MemberOrderLists = (props) => {
    const { user, start, end, campAmount } = props;
    console.log(user.MemberId)
    const [data, setData] = useState({
        orders: [],
        orderCampTag: [],
        orderRanking: [],
        orderCampPhoto: [],
        pastOrders: [],
        pastOrderCampTag: [],
        pastOrderRanking: [],
        pastOrderCampPhoto: [],
        pastOrderCampRanked: [],
    })
    useEffect(() => {
        const getOrder = () => {
            axios.get(`http://localhost:5000/account/api/order/${user.MemberId}`, {
            }).then((response) => {
                console.log(response.data);
                setData(response.data);
            });
        }
        getOrder();
        console.log(data);
    }, [])

    const dataStructure = {
        "orders": [
            {
                "orderId": 2011291504,
                "OrderDate": "2020-12-01T02:38:14.000Z",
                "PurchaserName": "王小明",
                "StayDateRange": "2020年12月08日 - 2020年12月09日",
                "ReservedCount": 1,
                "PaymentMethod": "刷卡",
                "PaymentAmount": 3000,
                "CampId": 43,
                "CampName": "南庄慢生活露營區",
                "CampAddress": "苗栗縣南庄鄉4鄰72-3號",
                "CampPhone": "0922169700",
                "CampOwnerName": "高耀中",
                "cityName": "苗栗縣",
                "AreaName": "泥土B區"
            }
        ],
        "orderCampTag": [
            {
                "campId": 43,
                "tagName": "雲海"
            },
            {
                "campId": 43,
                "tagName": "螢火蟲"
            }
        ],
        "orderRanking": [
            {
                "campId": 43,
                "ranking": 3.2,
                "count": 8
            }
        ],
        "orderCampPhoto": [
            {
                "campId": 43,
                "campPhoto": "https://picsum.photos/id/237/300/200"
            }
        ],
        "pastOrders": [
            {
                "orderId": 2011291501,
                "OrderDate": "2020-11-28T23:55:03.000Z",
                "PurchaserName": "王小明",
                "StayDateRange": "2020年11月29日 - 2020年11月30日",
                "ReservedCount": 1,
                "PaymentMethod": "刷卡",
                "PaymentAmount": 3000,
                "CampId": 1,
                "CampName": "手信瀑布露營區",
                "CampAddress": "新北市土城區國際路55號",
                "CampPhone": "02-82620506",
                "CampOwnerName": "袁思涵",
                "cityName": "新北市",
                "AreaName": "草皮A區",
                "AreaAvaliableDate": "2020-11-28T16:00:00.000Z"
            },
            {
                "orderId": 2011291502,
                "OrderDate": "2020-12-01T02:12:08.000Z",
                "PurchaserName": "王小明",
                "StayDateRange": "2020年11月25日 - 2020年11月26日",
                "ReservedCount": 4,
                "PaymentMethod": "刷卡",
                "PaymentAmount": 3000,
                "CampId": 1,
                "CampName": "手信瀑布露營區",
                "CampAddress": "新北市土城區國際路55號",
                "CampPhone": "02-82620506",
                "CampOwnerName": "袁思涵",
                "cityName": "新北市",
                "AreaName": "草皮A區",
                "AreaAvaliableDate": "2020-11-24T16:00:00.000Z"
            },
            {
                "orderId": 2011291503,
                "OrderDate": "2020-12-01T02:37:15.000Z",
                "PurchaserName": "王小明",
                "StayDateRange": "2020年12月01日 - 2020年12月02日",
                "ReservedCount": 1,
                "PaymentMethod": "刷卡",
                "PaymentAmount": 3000,
                "CampId": 2,
                "CampName": "黃大目露營區",
                "CampAddress": "桃園市大溪區和平路22號",
                "CampPhone": "03-3871278",
                "CampOwnerName": "王偉娥",
                "cityName": "桃園市",
                "AreaName": "泥土A區",
                "AreaAvaliableDate": "2020-11-30T16:00:00.000Z"
            }
        ],
        "pastOrderCampTag": [
            {
                "campId": 1,
                "tagName": "雲海"
            },
            {
                "campId": 1,
                "tagName": "大草皮"
            },
            {
                "campId": 1,
                "tagName": "螢火蟲"
            }
        ],
        "pastOrderRanking": [
            {
                "campId": 1,
                "ranking": 3.4,
                "count": 6
            }
        ],
        "pastOrderCampPhoto": [
            {
                "campId": 1,
                "campPhoto": "https://picsum.photos/id/128/300/200"
            }
        ],
        "pastOrderCampRanked": [
            {
                "orderId": 2011291503,
                "rankingName": "Liangchun",
                "rankingTime": "2020-12-05T06:05:58.000Z",
                "RankingText": "棒棒"
            },
            {
                "orderId": 2011291501,
                "rankingName": "Liangchun",
                "rankingTime": "2020-12-05T07:54:22.000Z",
                "RankingText": "hello"
            }
        ]
    }
    console.log(data.pastOrderRanking);
    return (
        <React.Fragment>
            {/* <!-- odd_mesaage --> */}
            <div class="col-md-9 col-12">
                {/* <!-- title --> */}
                <div class="rounded-sm mb-2 mt-5">
                    <h3 class="mb-3 font-weight-bold" style={{ letterSpacing: 2, color: "var(--darkColor)" }}>我的訂單</h3>
                </div>
                {/* <!-- nav_title --> */}
                <nav class="mt-2">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-link active font-weight-bold" id="nav-home-tab" data-toggle="tab"
                            href="#nav-after" role="tab" aria-controls="nav-home" aria-selected="true">未來式</a>
                        <a class="nav-link font-weight-bold" id="nav-profile-tab" data-toggle="tab" href="#nav-befor"
                            role="tab" aria-controls="nav-profile" aria-selected="false">過去式</a>
                        <a class="nav-link font-weight-bold" id="nav-contact-tab" data-toggle="tab" href="#nav-cancel"
                            role="tab" aria-controls="nav-contact" aria-selected="false">已取消</a>
                    </div>
                </nav>

                {/* <!-- nav_main --> */}
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="nav-after" role="tabpanel"
                        aria-labelledby="nav-home-tab">

                        {/* <!-- card --> */}

                        {data.orders.map((item, index) => {
                            let ranking = data.orderRanking.filter(e => e.campId === item.CampId);
                            let tag = data.orderCampTag.filter(e => e.campId === item.CampId);
                            let photo = data.orderCampPhoto.filter(e => e.campId === item.CampId);
                            console.log(ranking);
                            return (
                                <MemberOrder
                                    key={index}
                                    orderId={item.orderId}
                                    ranking={ranking[0].ranking}
                                    rankCount={ranking[0].count}
                                    tag={tag}
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
                                    photo={photo}
                                    start={start}
                                    end={end}
                                    campAmount={campAmount}
                                />
                            )
                        })}
                        {/* 未來式不會有Modal */}
                        {/* Modal
                        {data.orders.map((item, index) => {
                            let ranking = data.orderRanking.filter(e => e.campId === item.CampId);
                            let tag = data.orderCampTag.filter(e => e.campId === item.CampId);
                            console.log(ranking);
                            return (
                                <MemberOrderComment
                                    key={index}
                                    orderId={item.orderId}
                                    ranking={ranking[0].ranking}
                                    rankCount={ranking[0].count}
                                    tag={tag}
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
                        })} */}

                    </div>
                    {/* <!-- 過去式頁面 --> */}
                    <div class="tab-pane fade" id="nav-befor" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="tab-pane fade show active" id="nav-after" role="tabpanel"
                            aria-labelledby="nav-home-tab">
                            {/* <!-- card --> */}
                            {data.pastOrders.map((item, index) => {
                                let ranking = data.pastOrderRanking.filter(e => e.campId === item.CampId);
                                let tag = data.pastOrderCampTag.filter(e => e.campId === item.CampId);
                                let photo = data.pastOrderCampPhoto.filter(e => e.campId === item.CampId);
                                let rankedText = !!data.pastOrderCampRanked ? data.pastOrderCampRanked.filter(e => e.orderId === item.orderId) : null;
                                console.log(ranking);
                                return (
                                    <MemberOrder
                                        key={index}
                                        orderId={item.orderId}
                                        ranking={ranking[0].ranking}
                                        rankCount={ranking[0].count}
                                        tag={tag}
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
                                        rankingText={(rankedText == undefined || rankedText[0] === undefined) ? "" : rankedText[0].RankingText}
                                        status={'past'}
                                        photo={photo}
                                        data={data}
                                    />
                                )
                            })}

                            {/* Modal
                        {data.pastOrders.map((item, index) => {
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
                            })} */}
                            {/*  */}
                        </div>
                    </div>
                    {/* <!-- 已取消頁面 --> */}
                    <div class="tab-pane fade" id="nav-cancel" role="tabpanel" aria-labelledby="contact-tab">
                        <div class="tab-pane fade show active" id="nav-after" role="tabpanel"
                            aria-labelledby="nav-home-tab">
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            {/* <MemberOrderComment/> */}
            {/* <!-- Evaluation_modal --> */}
            {/* <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content p-2">
                        <div class=" pb-0 px-3 pt-2">
                            <h3 class="modal-title font-weight-bold" id="staticBackdropLabel">露營評價</h3>
                        </div>

                        <div class="modal-body px-3 pb-0 pt-1">
                            <div class="row">
                                <div class="col-12 d-flex align-items-center">
                                    <label for="firstName" class="font-weight-bold">評價暱稱</label>
                                </div>
                                <div class="col-12 pl-3">
                                    <input type="text" class="form-control " id="firstName" placeholder="留下您的姓名或暱稱" value="" style={{ border: "1.5px solid black" }} />
                                </div>
                            </div>

                            <div class="col-12 d-flex align-items-center px-0 mt-2">
                                <label for="firstName" class="font-weight-bold">營區評價</label>
                            </div>

                            <div class="rating-box rounded px-2 pt-2" style={{ border: "1.5px solid black" }}>
                                <div class="row d-flex justify-content-between ">

                                    <div className="col-6">
                                        <p class="pl-1">浴廁</p>
                                        <div class="rating">
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <p class="pl-1">設施</p>
                                        <div class="rating">
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                        </div>
                                    </div>
                                </div>


                                <div class="row d-flex justify-content-between">
                                    <div className="col-6">
                                        <p class="pl-1">服務</p>
                                        <div class="rating">
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <p class="pl-1">交通</p>
                                        <div class="rating">
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row d-flex justify-content-between">
                                    <div className="col-6">
                                        <p class="pl-1">景觀</p>
                                        <div class="rating">
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                            <span class="fa fa-star-o starhover"></span>
                                        </div>
                                    </div>
                                    <div className="col-6">

                                    </div>
                                </div>
                            </div>


                            <div class="row mt-2 ">
                                <div class="col-12 pb-0">
                                    <form>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" className="font-weight-bold">留下訊息</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" style={{ border: "1.5px solid black" }}></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                        <div class="pt-0 d-flex pr-3">
                            <div className="ml-auto">
                                <button type="button" class="btn text-white mr-1" style={{ backgroundColor: "var(--btnColor)" }}>送出</button>
                                <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </React.Fragment>
    );

}

export default MemberOrderLists;