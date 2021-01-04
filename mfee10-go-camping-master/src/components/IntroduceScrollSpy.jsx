import React from 'react';
import Scrollspy from 'react-scrollspy'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceScrollSpy = (props) => {
    return (
        <React.Fragment>
            <div style={{ marginTop: 66 }} className="m-scrollSpy" >
                <Scrollspy items={['camp-overview-link', 'camp-order', 'camp-review-link', 'camp-map-link']} currentClassName="m-scrollSpyPast" style={{ display: "flex" }} className="px-2 py-2 ml-5"
                    scrolledPastClassName="">
                    <li><a href="#camp-overview-link" className="nav-link font-weight-bold" style={{ fontSize: 18, letterSpacing: 1 }}>概覽</a></li>
                    <li><a href="#camp-order" className="nav-link font-weight-bold" style={{ fontSize: 18, letterSpacing: 1 }}>營區預訂</a></li>
                    <li><a href="#camp-review-link" className="nav-link font-weight-bold" style={{ fontSize: 18, letterSpacing: 1 }}>評價</a></li>
                    <li><a href="#camp-map-link" className="nav-link font-weight-bold" style={{ fontSize: 18, letterSpacing: 1 }}>地圖</a></li>
                </Scrollspy>
            </div >
        </React.Fragment >


    );
}


export default IntroduceScrollSpy;