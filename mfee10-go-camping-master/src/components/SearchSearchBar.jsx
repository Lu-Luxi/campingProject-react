import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

import 'bootstrap-daterangepicker/daterangepicker.css'
import { Link } from 'react-router-dom';

const SearchSearchBar = (props) => {

    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, setSearchResultText, searchFilterTag } = props;


    //按了查詢之後 將目前條件存入data中並進行下一步動作
    // const handleClick = () => {
    //     let data = { place, start, end, campAmount };
    //     alert(data);
    // }

    return (
        <React.Fragment>
            <form action="/action_page.php" className="m-searchBarFixSm bg-white border">

                <div className="d-flex justify-content-between ">
                    {/* <!-- input --> */}
                    <div className="rounded d-flex" style={{ width: "94%", padding: "13px" }}>

                        <div className=" p-0 border-right pl-2 d-flex " style={{ width: "28%" }}>
                            <p className="text-secondary m-auto">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            </p>
                            <input type="text"
                                className="w-100 m-searchInput rounded-left font-weight-bold "
                                placeholder="想去哪裡？"
                                name="place"
                                value={place}
                                onChange={event => setPlace(event.target.value)}
                            />
                        </div>

                        <div className="inputHome p-0 border-right pl-3 d-flex" style={{ width: "59%" }}>
                            <p className="text-secondary m-auto">
                                <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
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
                                    style={{ cursor: "pointer" }}
                                    className="w-100 m-searchInput font-weight-bold "
                                    name="dates"
                                />
                            </DateRangePicker>
                        </div>

                        <div className="inputHome p-0  pl-3 d-flex" style={{ width: "18%" }}>
                            <p className="text-secondary m-auto">
                                <FontAwesomeIcon icon={faCampground} className="mr-1" />
                            </p>
                            <select
                                name="campAmount"
                                className="w-100 border-0"
                                id="exampleFormControlSelect1"
                                style={{ outline: "none", textAlign: "center", cursor: "pointer" }}
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
                    <Link to={{ pathname: "/search", search: `?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}&tags=${searchFilterTag ? searchFilterTag : ''}` }}
                        className=" m-searchBtn text-white mr-2 my-auto d-flex align-items-center justify-content-center"
                        onClick={() => setSearchResultText(place)}>
                        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 25 }} />
                    </Link>
                </div>
            </form>


        </React.Fragment>
    );
}


export default SearchSearchBar;