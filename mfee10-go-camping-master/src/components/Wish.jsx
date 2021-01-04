import React from 'react';
import test01 from '../img/test01.jpg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Wish = (props) => {

    const { cityName, campCount, cityId, cityPhoto } = props
    // console.log(props)
    return (
        <React.Fragment>
            {/* <!-- 第一組card --> */}
            <div class="col  p-2 mb-1 mt-2">
                <a href="" class="text-decoration-none">
                    <div class=" border-0 bg-transparent m-cardHeight ">
                        <div class="m-imgWrap rounded">
                            <img src={cityPhoto} class="img-fluid card-img-top m-cityImg  rounded p-0 m-0"
                                style={{ maxWidth: "100%" }} alt="Responsive image" />
                        </div>
                        <div class="card-body text-dark m-cardBodyPd bg-white rounded">
                            <h5 class="card-title font-weight-bolder text-center pt-2">
                                {cityName}
                                <p class="card-text m-fontS12 my-1">
                                    (&nbsp;<span className="font-weight-bolder" style={{ color: "var(--priceColor)" }}>
                                        {campCount}
                                    </span>個露營區&nbsp;)
                                </p>
                            </h5>
                        </div>
                    </div>
                </a>
            </div>
            {/* <!-- 第一組card結束 --> */}
        </React.Fragment>
    );
}

export default Wish;