import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';


import { faCalendarPlus, faCampground } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const IntroduceChoose = (props) => {

    const { introValue, start, setStart, end, setEnd, campAmount, setCampAmount, campId, localeSetting, getDays, searchCampAmount, setSearchCampAmount } = props;

    return (
        <React.Fragment>
            {/* <!-- 日期選擇 --> */}

            <div className="card mt-2">
                {/* <div> */}
                {/* <h3 className="card-title font-weight-bold bg-white px-4 pt-4 pb-0">
                    營區預定
                </h3> */}
                {/* </div> */}
                <div className="card-body" style={{ backgroundColor: "var(--titleColor)" }}>


                    <div className="row">
                        <div className="col-10">
                            <form className="form-inline d-flex align-items-center mb-3">
                                <h3 className="mr-2 mb-0">
                                    <FontAwesomeIcon icon={faCalendarPlus} className="mx-1 pb-1" style={{ fontSize: 25 }} />
                                            選擇日期
                                </h3>
                                <div className="d-flex align-items-center">
                                    <div >
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
                                            <input type="text" className=" form-control searchInput font-weight-bold text-center" name="dates"
                                                style={{ width: 300 }} />
                                        </DateRangePicker>
                                    </div>



                                    <div className="form-group mx-sm-3 w-100">
                                        <h3 className="mr-2 mb-0">
                                            <FontAwesomeIcon icon={faCampground} className="mx-1 pb-1" style={{ fontSize: 22 }} />
                                                    帳數
                                                </h3>

                                        <select
                                            name="campAmount"
                                            className="form-control searchInput text-center "
                                            id="tentNum"
                                            style={{ width: 130 }}
                                            value={searchCampAmount}
                                            onChange={event => { setCampAmount(event.target.value); setSearchCampAmount(event.target.value) }}
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                        {/* <Link to={{ pathname: `/camps/${campId}`, search: `?start=${start}&end=${end}&campAmount=${campAmount}` }}
                                    className="btn m-btnBgColor text-white ml-2" style={{ fontSize: 18 }}>
                                    重新搜尋
                                </Link> */}
                                        {/* <button type="submit" className="btn m-btnBgColor text-white ml-2" style={{ fontSize: 18 }}>重新搜尋</button> */}
                                    </div>
                                </div>
                            </form>



                            {/* <!-- 顯示選擇營區與時間 --> */}
                            {/* style={{ color: "var(--darkColor)" }} */}
                            <h4 className="card-title mb-0 ">
                                在<span className="font-weight-bold" > {introValue.campInfo[0] ? introValue.campInfo[0].campName : null} </span>
                        住<span className="font-weight-bold" > {getDays(start, end)} </span>晚 ：
                        <span className="font-weight-bold" > {start}-{end}</span>
                            </h4>

                            {/* </div> */}
                        </div>



                        <div className="col-2 pt-4">
                            <Link to={{ pathname: `/camps/${campId}`, search: `?start=${start}&end=${end}&campAmount=${campAmount}` }}
                                className="rounded p-3 m-btnBgColor text-white" style={{ fontSize: 20, backgroundColor: "var(--darkColor)", letterSpacing: 1 }}>
                                重新搜尋
                            </Link>
                        </div>
                    </div>


                    {/* </div> */}

                    {/* <h5>&nbsp;<span className="font-weight-bold">2020年10月29日 - 2020年10月31日</span></h5> */}
                    {/* </div> */}
                    {/* </div> */}





                </div>
            </div>


        </React.Fragment >
    );
}


export default IntroduceChoose;