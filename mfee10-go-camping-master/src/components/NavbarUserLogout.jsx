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

import loginBefore from '../img/loginBefore.svg';

const NavbarUserLogout = (props) => {
  return (
    <React.Fragment>
      <li className="dropdown_nav mr-0 ">
        {/* 登入前 */}
        <Link to="/login" >
          {/* rgb(255, 255, 255) */}
          {/* <FontAwesomeIcon icon={faUser} color="rgb(255, 255, 255)" style={{ fontSize: 30 }} /> */}

          <img src={loginBefore} alt="" style={{ width: 36 }} className="" />
          {/* <i className="fa fa-user-circle-o " style={{ fontSize: 30, color: 'rgb(255, 255, 255)' }}></i> */}
        </Link>
      </li>
    </React.Fragment>
  )
}


export default NavbarUserLogout;