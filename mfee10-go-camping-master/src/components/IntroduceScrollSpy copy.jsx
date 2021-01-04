import React from 'react';
import Scrollspy from 'react-scrollspy'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';


import { faAngleRight, faCog, faHome, faListAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';


const IntroduceScrollSpy = (props) => {
    return (
        <React.Fragment>
            <Scrollspy id="scroll-spy-wrapper" class="scroll-spy-nav">
                <div className="nav container intro-nav p-3" id="scroll-spy">
                    <div className="nav-item">
                        {/* <!-- href="#camp-overview" --> */}
                        <a id="camp-overview-link" title="nav-item" className="nav-link">概覽</a>
                    </div>
                    <div className="nav-item">
                        {/* <!-- href="#camp-area" --> */}
                        <a id="camp-area-link" title="nav-item" className="nav-link">區域介紹</a>
                    </div>
                    <div className="nav-item ">
                        {/* <!-- href="#camp-review" --> */}
                        <a id="camp-review-link" title="nav-item" className="nav-link">評價</a>
                    </div>
                    <div className="nav-item ">
                        {/* <!-- href="#camp-map" --> */}
                        <a id="camp-map-link" title="nav-item" className="nav-link">地圖</a>
                    </div>
                </div>
            </Scrollspy>
        </React.Fragment >
    );
}


export default IntroduceScrollSpy;