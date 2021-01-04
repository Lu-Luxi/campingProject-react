import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Login = (props) => {
    // console.log(props)
    const { onLogin, loginAlert, role, msgReg, setMsgReg } = props;
    const [memberEmail, setMemberEmail] = useState("");
    const [memberPassword, setMemberPassword] = useState("");


    useEffect(() => {
        window.scrollTo(0, 0)
        setMsgReg({ //註冊msg重設
            registered: false,
            msg: ""
        });
        hint()
    }, [])

    const hint = () => {
        if (loginAlert === '') {
            return
        } else if (loginAlert === '登入成功') {
            return
        } else {
            return (
                <div className="alert alert-warning" role="alert">
                    {loginAlert}
                </div>
            )
        }
    }


    return (
        <React.Fragment>
            {/* <!-- login_page --> */}
            <div class="container mb-4 position-relative" style={{ paddingTop: "20px", marginTop: "-25px" }}>

                <div class="row d-flex justify-content-center mt-5 position-relative" style={{ top: 75 }}>
                    <div class="col-5 p-0 rounded cardShadow" style={{ backgroundColor: "#dfe2dd" }}>

                        <div className="col-8 m-auto">

                            <h2 className="text-center mt-4 font-weight-bold" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>會員登入</h2>
                            {/* form */}
                            {/* Alert === true 顯示 */}
                            {hint()}
                            {/* 是否要用form ????*/}
                            <div class="mt-4 mb-2" >
                                <div class="input-group mb-2 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: "50", border: "1px solid var(--priceColor)", paddingRight: 13 }}>
                                            <FontAwesomeIcon icon={faEnvelope} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control h-100" placeholder="請輸入信箱" onChange={(e) => {
                                        setMemberEmail(e.target.value);
                                    }} style={{ letterSpacing: 1 }} required onFocus={(e) => setMemberEmail("amy@gmail.com")} value={memberEmail} />
                                </div>

                                <div class="input-group mb-2" style={{ height: 50 }}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white" style={{ width: "50", paddingRight: "14px", border: "1.5px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faUnlockAlt} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="password" className="form-control h-100" placeholder="請輸入密碼" onChange={(e) => {
                                        setMemberPassword(e.target.value)
                                    }} style={{ letterSpacing: 1 }} required value={memberPassword} onFocus={(e) => setMemberPassword("1qaz!QAZ2")} />
                                </div>

                                <p className="text-muted text-right mb-1">
                                    {/* <a className="text-dark" href="forgotPassword01.html">
                                        忘記密碼?
                                    </a> */}
                                    <Link to="/forget-password" className="text-dark">忘記密碼?</Link>
                                </p>
                                <button type="" class="btn myBtn w-100 text-white mt-0" onClick={() => onLogin(memberEmail, memberPassword)}
                                    style={{ backgroundColor: "var(--priceColor)", fontSize: 18 }}>登 入</button>
                            </div>

                            <hr className="my-2" />

                            <div className="d-flex justify-content-between mb-3">
                                <p className="text-muted">還不是去露營會員嗎？</p>
                                <p className="">
                                    <Link to="/register" className="font-weight-bold" style={{ color: "var(--darkColor)" }}>
                                        立即註冊&nbsp;&nbsp;
                                </Link>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {/* <!-- end_login_page --> */}
        </React.Fragment >
    );
}

export default Login;