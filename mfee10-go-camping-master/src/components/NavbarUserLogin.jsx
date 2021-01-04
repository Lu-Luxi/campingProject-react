import React, { useState, useEffect } from 'react';
import Axios from "axios";
import logo from '../img/logo2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faHome, faCog, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const NavbarUserLogin = (props) => {

    const { roleControl, onLogout, loginName } = props

    return (
        <React.Fragment>
            <li className="dropdown_nav mr-0">
                <Link to="" className="dropbtn_nav" >
                    <FontAwesomeIcon icon={faUser} color="rgb(255, 255, 255)" style={{ fontSize: 30 }} />
                    <i className="fa fa-user-circle-o " style={{ fontSize: 30, color: 'rgb(255, 255, 255)' }}></i>
                </Link>
                {/* <!-- 下拉表單，登入後出現 --> */}
                <form className="dropdown-content_nav" >
                    您好！ <span>{loginName}</span>
                    <hr className="my-2" />
                    <ul className="nav flex-column rounded  py-0">
                        <li className="nav-item sideNavHover px-2 py-0">
                            <Link to="/member" className="text-decoration-none" >
                                <FontAwesomeIcon icon={faHome} className="pr-1" style={{ fontSize: 16 }} />
                                <i className="fas fa-home " style={{ fontSize: 16 }}></i>
                          會員首頁
                      </Link>
                        </li>
                        <li className="nav-item px-2 sideNavHover py-0">
                            <Link to="/member/setting" className="text-decoration-none" >
                                <FontAwesomeIcon icon={faCog} className="pr-1" style={{ fontSize: 16 }} />
                                <i className="fa fa-cog pr-1" style={{ fontSize: 16 }}></i>
                          帳號設定
                      </Link>
                        </li>
                        <li className="nav-item px-2 sideNavHover">
                            <Link to="/member/order-list" className="text-decoration-none" >
                                <FontAwesomeIcon icon={faListAlt} className="pr-1" style={{ fontSize: 16 }} />
                                <i className="fa fa-list-alt pr-1" style={{ fontSize: 16 }}></i>
                          訂單管理
                      </Link>
                        </li>
                        <li className="nav-item px-2 sideNavHover">
                            <Link to="/member/coupon-list" className="text-decoration-none" >
                                <FontAwesomeIcon icon={faTicketAlt} className="pr-1" style={{ fontSize: 16 }} />
                                <i className="fa fa-list-alt pr-1" style={{ fontSize: 16 }}></i>
                          折扣禮券
                      </Link>
                            {/* <a className="text-decoration-none" href="member04_voucher_page.html">
                          <FontAwesomeIcon icon={faTicketAlt} className="pr-1" style={{ fontSize: 16 }} />
                          <i className="fa fa-ticket pr-1" style={{ fontSize: 16 }}></i>
                          折扣禮券
                      </a> */}
                        </li>
                        <li className="nav-item px-2 sideNavHover">
                            <Link to="/wish" className="text-decoration-none" >
                                <FontAwesomeIcon icon={faHeart} className="pr-1" style={{ fontSize: 16 }} />
                                <i className="fa fa-heart pr-1" style={{ fontSize: 16 }}></i>
                          心願清單
                      </Link>
                        </li>
                        <hr className="my-2" />
                        <button type="" value="" onClick={() => { onLogout() }}>登 出</button>
                    </ul>
                </form>
            </li>
        </React.Fragment>
    )
}


export default NavbarUserLogin;