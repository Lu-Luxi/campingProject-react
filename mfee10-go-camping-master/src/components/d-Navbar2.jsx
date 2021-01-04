import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo2.svg';


const Navbar = (props) => {
  const {onLogout} = props
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-md fixed-top  cardShadow  px-5 login-navBar  ">
                    {/* <!-- logo --> */}
          <Link to="/dashboard" className="navbar-brand mr-4 pl-3"><img src={logo} alt="" height="40px;" /></Link>

          <ul className="navbar-nav px-3">
              <a className="logout-btnstyle" onClick={()=>{onLogout()}}>
                登出
              </a>
          </ul>
      </nav>
    </React.Fragment>
  )
}

export default Navbar