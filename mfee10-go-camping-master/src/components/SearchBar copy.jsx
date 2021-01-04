import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

// 圖片
import indexImg01 from '../img/indexImg01.jpg';
import indexImg02 from '../img/indexImg02.jpg';
import indexImg12 from '../img/indexImg12.jpg';
// import indexImg from '../img/indexImg66.png';
import indexImg from '../img/indexImg00.png';
// import indexImg from '../img/indexImg77.jpg';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

import 'bootstrap-daterangepicker/daterangepicker.css'
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, handleClick } = props;


    return (
        <React.Fragment>
            {/* <!-- 首頁主圖 --> */}
            {/* <img src={indexImg01} alt="" className="w-100 " style={{ paddingTop: 66 }} /> */}
            {/* <img src={indexImg02} alt="" className="w-100 " style={{ paddingTop: 66 }} /> */}
            <img src={indexImg} alt="" className="w-100 h-100" style={{ paddingTop: 66 }} />


            {/* <!-- searchBar區塊 --> */}
            <form className="searchBarHome2 rounded">

                {/* <h1 className=" indexInput " >來吧，作伙去露營
                <p className="mt-2" style={{ fontSize: 20 }}>輸入地點、日期，快速為您搜尋合適的露營區</p>
                </h1> */}


                {/* <!-- title --> */}
                {/* <h1 className="mb-5 text-center font-weight-bolder text-white">來吧，作伙去露營</h1> */}
                {/* <p className="text-center text-white mb-2" style={{ fontSize: 18 }}>輸入地點、日期，快速為您搜尋合適的露營區</p> */}

                {/* <!-- searchBar --> */}
                <div className="d-flex justify-content-between " >
                    {/* <!-- input --> */}
                    {/* p-1 */}
                    <div className=" bg-white rounded p-0 d-flex border insertShadow" style={{ width: "85%" }} >

                        <div className="inputHome p-2  pl-3" style={{ width: "35%", borderRight: "2px solid var(--darkColor)" }}>
                            <p className="mb-1 text-secondary" style={{ fontSize: 18 }}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                輸入地區或營區名稱 ...
                            </p>
                            <input
                                type="text"
                                className="w-100 m-searchInput rounded-left font-weight-bold "
                                placeholder="想去哪裡？"
                                name="place"
                                value={place}
                                onChange={event => setPlace(event.target.value)}
                                style={{ fontSize: 18 }}
                            />
                        </div>

                        <div className="inputHome p-2 pl-4" style={{ width: "45%", borderRight: "2px solid var(--darkColor)" }}>
                            <p className=" mb-1 text-secondary" style={{ fontSize: 18 }}>
                                <FontAwesomeIcon icon={faCalendarPlus} className="mr-1" />
                                選擇入住及離營日期
                            </p>
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
                                    className="w-100 m-searchInput font-weight-bold"
                                    name="dates"
                                />
                            </DateRangePicker>

                        </div>

                        <div className="inputHome p-2 pl-4" style={{ width: "20%" }}>
                            <p className="mb-1 text-secondary" style={{ fontSize: 18 }}>
                                <FontAwesomeIcon icon={faCampground} className="mr-1" />
                                選擇帳數
                            </p>

                            <select
                                name="campAmount"
                                className="w-100 border-0"
                                id="exampleFormControlSelect1"
                                style={{ outline: "none", fontSize: 18 }}
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

                    <Link to={`/search?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}`} className=" m-searchBtn  text-white ml-1 d-flex justify-content-center align-items-center font-weight-bold" style={{ width: "15%", fontSize: 18, letterSpacing: 1 }} >
                        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 25 }} className="mr-1" />
                        立即搜尋
                    </Link>
                </div>

            </form>
        </React.Fragment >
    );
}

export default SearchBar;