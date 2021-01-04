import React, { useState, useEffect } from 'react';
import Axios from "axios";
import logo from '../img/logo2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faHome, faCog, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import NavbarUserLogin from './NavbarUserLogin'
import NavbarUserLogout from './NavbarUserLogout'
import NavbarUserLogin2 from './NavbarUserLogin2'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Navbar = (props) => {

    // 將登入參數傳遞進來
    const { roleControl, onLogout, isLoggedIn, loginName } = props
    // const [role , setrole] = useState(roleControl);
    // useEffect(()=> {
    //     setrole(roleControl)
    // },[])
    // Axios.defaults.withCredentials = true;
    // useEffect(() => {
    //     Axios.get("http://localhost:5000/account/api/login").then((response) => {
    //     if (response.data.loggedIn === true) {
    //         console.log(response.data.user)
    //         // setRole(response.data.user[0].role);
    //         setRole("member");
    //     } else {
    //         setRole("guest")
    //         console.log("Guset")
    //     }
    //     });
    // }, []);




    return (
        <React.Fragment>
            {/* <!-- 置頂選單 --> */}
            {/* 0px 16px 0px 68px */}
            <nav className="navbar navbar-expand-md fixed-top cardShadow  py-2  main-navBar" style={{ padding: "0px 16px 0px 52px" }}>
                {/* <!-- logo --> */}
                <Link to="/" className="navbar-brand mr-4"><img src={logo} alt="" height="40px;" /></Link>
                {/* <!-- link --> */}
                {/* <div className=" ml-5">
                    
                    <Link to="/about" className="text-decoration-none" style={{ fontSize: 18 }}>關於我們</Link>
                    <Link to="/join-us" className="text-decoration-none" style={{ fontSize: 18 }}>成為營主</Link>
                    <Link to="/" className="text-decoration-none" style={{ fontSize: 18 }}>期間優惠</Link>
                </div> */}
                {/* <!-- icon --> */}
                <ul className="nav m-topNav ml-auto d-flex align-items-center">
                    {/* <!-- 心願清單 --> */}
                    <li className="nav-item mr-3">
                        <Link to="/wish" >
                            <FontAwesomeIcon icon={faHeart} color="#F2385A" style={{ fontSize: 30 }} />
                            <i className="fa fa-heart" style={{ fontSize: 28, color: '#F2385A' }}></i>
                        </Link>
                    </li>
                    {/* <!-- 會員系統 --> */}
                    {/* Login */}
                    {isLoggedIn && <NavbarUserLogin2 onLogout={onLogout} loginName={loginName} />}
                    {/* Logout */}
                    {isLoggedIn || <NavbarUserLogout />}
                </ul>
            </nav>
        </React.Fragment>
    );
}


export default Navbar;