import React, { useEffect } from 'react';
import Wish from './Wish';

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Wishs = (props) => {
    const { cityList, start, end, campAmount } = props;
    console.log(cityList);
    // console.log(props)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <React.Fragment>
            {/* <!-- 卡片區塊 --> */}
            <div class="container " style={{ paddingTop: "66px" }}>

                {/* <!-- 分類名稱 --> */}
                <div class="row">
                    <div class="col ">
                        <h3 class="font-weight-bolder text-center mt-5 m-letterSpH3 ">
                            心願清單
                        </h3>
                        <div class=" d-flex justify-content-center align-items-center mb-1 mr-2">
                            {/* <!-- 收藏的愛心 --> */}
                            <FontAwesomeIcon icon={faHeart} aria-hidden="true" style={{ color: "var(--heartColor)" }} />
                            &nbsp; 已收藏&nbsp;
                            <span className="font-weight-bolder" style={{ color: "var(--priceColor)" }}>
                                {cityList.lists.length}
                            </span> &nbsp;份清單
                        </div>
                    </div>
                </div>
                {/* <!-- card模板 --> */}
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 d-flex ">
                    {cityList.lists.map((item, index) => (
                        <Link to={`/wish/list?id=${item.cityId}&start=${start}&end=${end}&campAmount=${campAmount}`} key={index}>
                            <Wish
                                cityName={item.cityName}
                                campCount={item.campCount}
                                cityId={item.cityId}
                                cityPhoto={item.cityPhoto}
                            />
                        </Link>
                    ))}

                </div>
                {/* <!-- card模板結束 --> */}
            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment>
    );
}


export default Wishs;