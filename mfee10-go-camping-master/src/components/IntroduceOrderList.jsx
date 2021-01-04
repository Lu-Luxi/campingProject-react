import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultImg from '../img/tent-1.jpeg';
import LazyLoad from 'react-lazyload';
import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import { Link } from 'react-router-dom';

// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const IntroduceOrderList = (props) => {
    const { areaId, areaName, areaStyle, areaLeft, totalPrice, start, end, campAmount, setCampAmount, getDays, campId, setBrowserLocation, searchCampAmount, areaPhoto } = props;
    // console.log(`campId in orderlist is:${campId}`);
    // areaImage[0].areaPhoto

    // const [areaImg, setAreaImg] = useState(defaultImg);

    // useEffect(() => {
    //     const fetchItems = async () => {
    //         const result = await axios.post(
    //             `http://localhost:5000/camps/api/area/${areaId}`,
    //         );
    //         await setAreaImg(result.data.areaImage[0].areaPhoto);
    //         // console.log(result.data.areaImage[0].areaPhoto);
    //     }
    //     fetchItems();

    // }, [areaId, searchCampAmount]);


    return (
        <React.Fragment>
            {/* <!-- 第一組營區訂購card --> */}
            <div className="card mt-2 border-0 ">
                <div className="row no-gutters">
                    <div className="col-12 col-md-3">
                        {/* <a href="" data-toggle="modal" data-target="#areaModal_1"> */}
                        <LazyLoad height={200}>
                            
                            <img src={areaPhoto === undefined ? "" : areaPhoto} alt="" className="card-img"
                                style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                        </LazyLoad>
                        {/* </a> */}
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="card-body pl-4">
                            <h3 className="card-title mb-0 ">{areaName}</h3>
                            <div className="row no-gutters mt-1">
                                <div className="col-12 col-md-6">
                                    <div className="row no-gutters h-100">

                                        <div className="col-4 col-md-4  d-flex justify-content-center flex-column">
                                            <div className="card-text mb-4">型態：<span>{areaStyle}</span></div>
                                            <div className="card-text">
                                                剩餘：<span className="font-weight-bold" style={{ color: "var(--heartColor)" }}>{areaLeft}</span>
                                                                    &nbsp;帳 </div>
                                        </div>

                                        <div className="col-8 col-md-8 d-flex justify-content-center align-items-center">


                                            <div className="col-12 col-md-12 d-flex  flex-column">
                                                <div className="mb-0 text-left w-75 mt-2 mb-3">選擇數量：</div>
                                                {/* 這裡的數量要小於最大可預定數量 */}
                                                {/* <select className="form-control searchInput text-center w-75" id=""
                                                    style={{ width: 100 }}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select> */}
                                                <select
                                                    name="campAmount"
                                                    className="form-control searchInput text-center w-75"
                                                    id="selectCampAmount"
                                                    style={{ width: 100 }}
                                                    defaultValue={searchCampAmount}
                                                    onChange={event => setCampAmount(event.target.value)}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row no-gutters">

                                        <div className="col-6 col-md-6 d-flex  flex-column">
                                            <div className="mb-0 text-left w-75 my-2">每帳價格：</div>
                                            <p className="card-text  m-priceColor" style={{ fontSize: "2rem", fontWeight: 500 }}>
                                                {totalPrice}元 <span style={{ fontSize: "1rem" }}>/&nbsp;{getDays(start, end)}晚</span>
                                            </p>
                                        </div>

                                        <div className="col-6 col-md-6 d-flex justify-content-center align-items-center ">
                                            <Link
                                                to={{ pathname: `/book`, search: `?id=${campId}&areaid=${areaId}&start=${start}&end=${end}&campAmount=${campAmount}` }}
                                                onClick={() => setBrowserLocation({ pathname: `/book`, search: `?id=${campId}&areaid=${areaId}&start=${start}&end=${end}&campAmount=${campAmount}` })}
                                                className="myBtn rounded p-3 text-white"
                                                style={{ fontSize: 20, backgroundColor: "var(--priceColor)", letterSpacing: 1 }}

                                            >
                                                <span>立即預定</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment >
    );
}


export default IntroduceOrderList;