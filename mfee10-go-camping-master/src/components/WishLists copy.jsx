import React, { useEffect, useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css'
import { Link } from 'react-router-dom';

import WishList from './WishList';

const WishLists = (props) => {


    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting } = props;


    // 接收match參數
    // console.log(props.match.params) //cityId
    // 給 Wish List 的資料
    const { wishCamp, wishCampTag, wishCampRanking, campCount } = props.data;

    // const wishCamp = [...data.ＷishCamp]

    // useEffect(() => {
    //     console.log(wishCamp)

    // }, [])
    return (
        <React.Fragment>
            {/* <!-- 卡片區塊 --> */}
            <div class="container" style={{ paddingTop: "66px" }}>


                <p class="mt-5">心願清單&nbsp;/<span>&nbsp;桃園</span></p>

                {/* <!-- 分類名稱 --> */}
                <div class="row">
                    <div class="col ">
                        <h3 class="font-weight-bolder text-center mb-5 m-letterSpH3">桃園</h3>
                    </div>
                </div>

                {/* <!-- searchBar區塊 --> */}
                <form action="/action_page.php" className="m-searchBarWish">

                    <div className="d-flex justify-content-center ">
                        {/* <!-- input --> */}
                        <div className=" bg-white rounded  d-flex " style={{ width: "60%", padding: "16px" }}>

                            <div className="inputHome p-0 border-right pl-3 d-flex " style={{ width: "70%" }}>
                                <p className="text-secondary m-auto">
                                    <FontAwesomeIcon icon={faCalendarPlus} className="mr-1" />
                                </p>
                                {/* daterangepicker */}
                                <DateRangePicker
                                    initialSettings={{
                                        autoApply: true,
                                        maxSpan: { "days": 7 },
                                        locale: localeSetting,
                                        startDate: start,
                                        endDate: end,
                                        minDate: "2000年01月02日",
                                        maxDate: "2020年12月31日"
                                    }}
                                    startDate={start}
                                    endDate={end}
                                    onApply={(e, p) => { setStart(p.startDate.format('LL')); setEnd(p.endDate.format('LL')); }}
                                >
                                    <input
                                        type="text"
                                        className="w-100 m-searchInput font-weight-bold text-center"
                                        name="dates"
                                    />
                                </DateRangePicker>
                            </div>

                            <div className="inputHome p-0  pl-3 d-flex" style={{ width: "30%" }}>
                                <p className="text-secondary m-auto">
                                    <FontAwesomeIcon icon={faCampground} className="mr-1" />
                                </p>
                                <select
                                    name="campAmount"
                                    className="w-100 border-0"
                                    id="exampleFormControlSelect1"
                                    style={{ outline: "none", textAlign: "center" }}
                                    value={campAmount}
                                    onChange={event => setCampAmount(event.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- 按鈕 --> */}
                        {/* <button className="btn m-searchBtn text-white ml-1" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 30 }} />
    </button> */}
                        <Link to={{ pathname: "/search", search: `?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}` }}
                            className="btn m-searchBtn text-white ml-1 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 25 }} className="mr-1" />
                            重新搜尋
                        </Link>
                    </div>
                </form>

                <hr class="mb-3" />
                <p>共有&nbsp;<span class="font-weight-bolder" style={{ color: "var(--darkColor)" }}>
                    {campCount}</span>&nbsp;個行程在您該分類的心願清單</p>
                {/* <!-- 該分類card模板 d-flex justify-content-center--> */}
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">
                    {wishCamp.map((item, index) => {
                        let newRanking = wishCampRanking.filter(e => e.campId === item.campId);
                        let newTag = wishCampTag.filter(e => e.campId === item.campId);
                        return (
                            <WishList
                                key={index}
                                tag={newTag}
                                ranking={newRanking[0].ranking}
                                rankCount={newRanking[0].count}
                                campName={item.campName}
                                cityName={item.cityName}
                                areaPrice={item.areaPrice}
                            />
                        )
                    }
                    )}
                </div>
                {/* <!-- 該分類card模板結束 --> */}

            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment>
    );
}


export default WishLists;