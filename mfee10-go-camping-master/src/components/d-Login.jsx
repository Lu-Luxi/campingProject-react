import React, { useState, useEffect } from 'react';
import Navbar from './d-Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, } from "@fortawesome/free-solid-svg-icons";
import logo from '../img/logo2.svg';
import { Link } from 'react-router-dom';


const Login = (props) => {
    const { onLogin, loginAlert } = props
    // console.log(props)
    const [ownerAccount, setOwnerAccount] = useState("")
    const [ownerPassword, setOwnerPassword] = useState("")


    const hint = () => {
        if (loginAlert === '') {
            return
        } else if (loginAlert === '登入成功') {
            return
        } else {
            return (
                <div className="alert alert-warning" role="alert">
                    {loginAlert}
                    {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                </div>
            )
        }
    }

    return (
        <div>

            <div className="container  ">
                {/* <nav class="navbar navbar-expand-md fixed-top  cardShadow  px-5 login-navBar  ">
                    
                    <Link to="/dashboard" className="navbar-brand mr-4 pl-3"><img src={logo} alt="" height="40px;" /></Link>
                </nav> */}

                <div className="login-input row d-flex justify-content-center mb-1 mt-5 pt-5">

                    <div className="col-6 p-0 rounded cardShadow  bg-white border border-muted">

                        <div className="col-7 m-auto">
                            <h2 className="text-center mt-5 font-weight-bold" style={{ color: "var(--darkColor)" }}>營主登入</h2>
                            {hint()}
                            <div className="mt-4 ">
                                <div className="input-group mb-3 " style={{ height: 50 }}>
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-white" style={{ width: 50 }}>
                                            <FontAwesomeIcon icon={faEnvelope} className="m-auto"></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control h-100" placeholder="請輸入帳號" onChange={(e) => setOwnerAccount(e.target.value)} required value={ownerAccount} onFocus={(e) => { setOwnerAccount("easy@gmail.com") }} />
                                </div>

                                <div className="input-group mb-2" style={{ height: 50 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white" style={{ width: 50 }}>

                                            <FontAwesomeIcon icon={faLock} className="m-auto"></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input type="password" className="form-control h-100" placeholder="請輸入密碼" onChange={(e) => setOwnerPassword(e.target.value)} required value={ownerPassword} onFocus={(e) => { setOwnerPassword("0000") }} />
                                </div>
                                <p className="text-muted text-right ">
                                    <a className="text-dark" href="forgotPassword01.html">
                                        忘記密碼?
                    </a>
                                </p>
                                <button type="submit" className="btn w-100 text-white my-2 btnstyle-big mb-5" style={{ fontSize: 18 }} onClick={() => onLogin(ownerAccount, ownerPassword)}>登 入</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login;