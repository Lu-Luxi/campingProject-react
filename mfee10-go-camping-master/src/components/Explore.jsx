import React from 'react';
import { Link } from 'react-router-dom';

import test01 from '../img/test01.jpg';




const Explore = (props) => {
    const { cityName, campImg, campCount, setPlace, place, start, end, campAmount, cityPhoto, setSearchResultText } = props;
    return (
        <React.Fragment>
            {/* <!-- 第一組card --> */}
            <div className="col m-cardHeight px-2 pt-0" onClick={() => { setPlace(cityName); setSearchResultText(cityName) }}>
                <Link to={{ pathname: "/search", search: `?place=${cityName}&start=${start}&end=${end}&campAmount=${campAmount}` }} className="text-decoration-none" >
                    <div className=" border-0 bg-transparent m-cardHeight ">
                        <div className="m-imgWrap rounded">
                            <img src={cityPhoto} className="img-fluid card-img-top m-cityImg mb-1 rounded p-0 m-0"
                                style={{ maxWidth: '100%' }} alt="Responsive image" />
                        </div>
                        <div className="card-body text-dark m-cardBodyPd">
                            <h5 className="card-title font-weight-bolder">
                                {cityName}
                                <span className="card-text mb-1 m-fontS12">
                                    &nbsp;(<span>{campCount}</span>個營區)
                                </span>
                            </h5>
                        </div>
                    </div>
                </Link>
            </div>
            {/* <!-- 第一組card結束 --> */}
        </React.Fragment>
    );
}


export default Explore;