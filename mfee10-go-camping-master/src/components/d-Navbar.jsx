import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo2.svg';

const Navbar = (props) => {
    const {onLogout, loggedIn} = props
    // console.log(onLogout)
    return (
        <React.Fragment>
            {/* top nav start */}
            <nav className="navbar navbar-dark sticky-top topbar flex-md-nowrap p-2 shadow ">
                {/* <a className=" navbar-brand  col-md-3 col-lg-2 mr-0 px-3" href="dashboard_index.html">
                    <img src={logo} alt="" /> 
                </a> */}
                <Link to="/dashboard" className="navbar-brand mr-4 pl-3"><img src={logo} alt="" height="40px;" /></Link>
                {
                    loggedIn ? <ul className="navbar-nav px-3" style={{cursor: "pointer"}}>
                    <a className="logout-btnstyle" onClick={()=>{onLogout()}}>登出</a>
                    </ul> : ""
                }
                
            </nav>
            {/* top nav end */}
        </React.Fragment>
    );
}


export default Navbar;