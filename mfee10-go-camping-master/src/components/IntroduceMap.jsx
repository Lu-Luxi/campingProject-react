import React from 'react';

import mapSvg from '../img/campMap.svg';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceMap = (props) => {


    return (
        <React.Fragment>
            {/* <!-- 營區地圖 --> */}
            <div className="card mt-2 border-0 p-4">
                <h3 className="card-title font-weight-bold mb-4">營區配置圖</h3>
                <img src={mapSvg} className=" card-img" alt="img" height="400px" width="100%" style={{ objectFit: "cover" }} />
            </div>
        </React.Fragment >
    );
}


export default IntroduceMap;