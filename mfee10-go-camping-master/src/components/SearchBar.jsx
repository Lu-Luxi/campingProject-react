import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

// 圖片
// import indexImg01 from '../img/indexImg01.jpg';
// import indexImg02 from '../img/indexImg02.jpg';
// import indexImg12 from '../img/indexImg12.jpg';
// import indexImg from '../img/indexImg66.png';
// import indexImg from '../img/indexImg00.png';
import indexImg from '../img/indexImgNew.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

import 'bootstrap-daterangepicker/daterangepicker.css'
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

    const inputStyle = {
        width: "66%",
        borderBottomLeftRadius: "40px",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        borderBottomRightRadius: "40px",
    }

    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, searchFilterTag, setSearchResultText } = props;


    return (
        <React.Fragment>
            {/* <!-- 首頁主圖 --> */}
            {/* <img src={indexImg01} alt="" className="w-100 " style={{ paddingTop: 66 }} /> */}
            {/* <img src={indexImg02} alt="" className="w-100 " style={{ paddingTop: 66 }} /> */}
            <img src={indexImg} alt="" className="w-100 h-100" style={{ paddingTop: 66 }} />

            {/* <h3 className="searchBarHome2Text">找營區</h3> */}


            {/* <!-- searchBar區塊 --> */}
            <form className="searchBarHome2 bg-white border" style={inputStyle}>

                {/* <h1 className=" indexInput " >來吧，作伙去露營
                <p className="mt-2" style={{ fontSize: 20 }}>輸入地點、日期，快速為您搜尋合適的露營區</p>
                </h1> */}


                {/* <!-- title --> */}
                {/* <h1 className="mb-5 text-center font-weight-bolder text-white">來吧，作伙去露營</h1> */}
                {/* <p className="text-center text-white mb-2" style={{ fontSize: 16 }}>輸入地點、日期，快速為您搜尋合適的露營區</p> */}

                {/* <!-- searchBar --> */}
                <div className="d-flex justify-content-between " >
                    {/* <!-- input --> */}
                    {/* p-1 */}
                    <div className=" pl-3 d-flex " style={{ width: "90%" }} >

                        <div className=" p-2  pl-4 border-right" style={{ width: "35%", borderRight: "1px solid gray" }}>
                            <p className="mb-1 text-secondary" style={{ fontSize: 16 }}>
                                <label htmlFor="where" className="m-0"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                輸入地區或營區名稱 ...
                                </label>
                            </p>
                            <input
                                type="text"
                                id="where"
                                className="w-100 m-searchInput rounded-left font-weight-bold "
                                placeholder="Hi！想去哪裡？"
                                name="place"
                                value={place}
                                onChange={event => setPlace(event.target.value)}
                                style={{ fontSize: 16 }}
                            />
                        </div>

                        <div className="inputHome p-2 pl-4 border-right" style={{ width: "45%", borderRight: "1px solid gray" }}>
                            <p className=" mb-1 text-secondary " style={{ fontSize: 16 }}>
                                <label htmlFor="chooseDate" className="m-0"><FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
                                選擇入營及離營日期
                                </label>
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
                                    id="chooseDate"
                                    type="text"
                                    className="w-100 m-searchInput font-weight-bold"
                                    name="dates"
                                    style={{ cursor: "pointer" }}
                                />
                            </DateRangePicker>

                        </div>

                        <div className="inputHome p-2 pl-4" style={{ width: "20%" }}>
                            <p className="mb-1 text-secondary " style={{ fontSize: 16 }}>
                                <FontAwesomeIcon icon={faCampground} className="mr-2" />
                                選擇帳數
                            </p>

                            <select
                                name="campAmount"
                                className="w-100 border-0"
                                id="exampleFormControlSelect1"
                                style={{ outline: "none", fontSize: 16, cursor: "pointer" }}
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

                    <Link to={`/search?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}&tags=`} className="searchBarBtn m-searchBtn  text-white ml-2 d-flex justify-content-center align-items-center font-weight-bold my-auto mr-1" style={{ width: "63px", height: "63px", fontSize: 16, letterSpacing: 1 }} onClick={() => setSearchResultText(place)}>
                        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 28 }} />
                        {/* 立即搜尋 */}
                    </Link>
                </div>

            </form>
        </React.Fragment >
    );
}

export default SearchBar;