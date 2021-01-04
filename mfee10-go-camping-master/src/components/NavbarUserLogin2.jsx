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

import loginAfter from '../img/loginAfter.svg';



const NavbarUserLogin2 = (props) => {

  const { roleControl, onLogout, loginName } = props

  const itemStyle = {
    // color: "black",
    margin: 0,
    color: "var(--darkColor)",
    fontWeight: "600"
  }

  return (
    <React.Fragment>
      {/* 新增dropdown class */}
      <li className="dropdown">

        {/* 登入後 */}
        <Link data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {/* <FontAwesomeIcon icon={faUser} color="rgb(255, 255, 255)" style={{ fontSize: 30, color: "blue" }} /> */}
          {/* 登入後的圖示 */}
          <img src={loginAfter} alt="" style={{ width: 36 }} />
          {/* <i className="fa fa-user-circle-o " style={{ fontSize: 30, color: 'rgb(255, 255, 255)' }}></i> */}
        </Link>
        {/* <!-- 下拉表單，登入後出現 --> */}
        <div class="dropdown-menu dropdown-menu-right" style={{ zIndex: 2000 }}>
          <div className="dropdown-item text-center disabled" style={{ color: "var(--darkColor)" }}>
            您好！<span>{loginName}</span>
          </div>
          <Link to="/member" className="dropdown-item" style={itemStyle}>
            <FontAwesomeIcon icon={faHome} className="mr-3" style={{ fontSize: 16 }} />
            <i className="fas fa-home " style={{ fontSize: 16 }}></i>
                會員首頁
            </Link>
          <Link to="/member/setting" className="dropdown-item" style={itemStyle}>
            <FontAwesomeIcon icon={faCog} className="mr-3" style={{ fontSize: 16 }} />
            <i className="fa fa-cog pr-1" style={{ fontSize: 16 }}></i>
                帳號設定
            </Link>
          <Link to="/member/order-list" className="dropdown-item" style={itemStyle}>
            <FontAwesomeIcon icon={faListAlt} className="mr-3" style={{ fontSize: 16 }} />
            <i className="fa fa-list-alt pr-1" style={{ fontSize: 16 }}></i>
                訂單管理
            </Link>
          {/* <Link to="/member/coupon-list" className="dropdown-item" style={itemStyle}>
            <FontAwesomeIcon icon={faTicketAlt} className="mr-3" style={{ fontSize: 16 }} />
            <i className="fa fa-list-alt pr-1" style={{ fontSize: 16 }}></i>
                折扣禮券
            </Link> */}
          <Link to="/wish" className="dropdown-item" style={itemStyle}>
            <FontAwesomeIcon icon={faHeart} className="mr-3" style={{ fontSize: 16 }} />
            <i className="fa fa-heart pr-1" style={{ fontSize: 16 }}></i>
                心願清單
            </Link>
          <button className="dropdown-item text-center mt-2" type="button" value="" onClick={() => { onLogout() }}>
            登 出
            </button>
        </div>

      </li>
    </React.Fragment>
  )
}


export default NavbarUserLogin2;