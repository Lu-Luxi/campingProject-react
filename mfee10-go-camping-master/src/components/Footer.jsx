import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faFacebookSquare, faLine, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fas, faHeart, faHome, faCog, faTicketAlt, faSearch, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { far, faUserCircle, faListAlt } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = (props) => {

    return (
        <React.Fragment>
            {/* <!-- footer --> */}
            <footer className="row m-footer mx-0 mt-0">
                <div className="col-6 text-center m-footerText px-5">
                    <h3 className="font-weight-bold mb-3" style={{ letterSpacing: 2 }}>快速連結</h3>
                    <p className="mb-2" style={{ fontSize: 20, letterSpacing: 2 }}>
                        會員中心<br />
                            營區搜尋<br />
                            關於我們<br />
                        <Link to="./dashboard" style={{ color: "white" }}>成為營主</Link>
                    </p>
                </div>
                <div className="col-6 text-center m-footerText px-5 ">
                    <h3 className="font-weight-bold mb-3" style={{ letterSpacing: 2 }}>聯絡我們</h3>
                    <p className="mb-0" style={{ fontSize: 20, letterSpacing: 2 }}>
                        服務時間：週一至週五 10:00-18:30 <br />
                            客服專線：04 - 22594213 <br />
                            E-mail：GOcamping@gmail.com <br />
                    </p>
                    <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: 48 }} className="mr-2" />
                    <i className="fa fa-facebook-square mr-2" style={{ fontSize: 48 }}></i>
                    <FontAwesomeIcon icon={faLine} style={{ fontSize: 48 }} className="mr-2" />
                    <i className="fab fa-line mr-2" style={{ fontSize: 48 }}></i>
                    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 48 }} className="mr-2" />
                    <i className="fa fa-instagram mr-2" style={{ fontSize: 48 }}></i>
                </div>
                <div className="col-12 text-center m-footerText m-footerCR" style={{ fontSize: 13 }}>Copyright©</div>
            </footer>
        </React.Fragment>
    );
}


export default Footer;