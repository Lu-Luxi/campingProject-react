import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, } from '@fortawesome/free-regular-svg-icons';
import { faUnlockAlt, faMobileAlt, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Register = (props) => {

    const { setMemberEmailReg, setMemberPasswordReg, setMemberNameReg, setPasswordConfirm, msgReg, setMemberPhoneReg, validator } = props

    const hint = () => {
        if (msgReg.msg === '') {
            return
        } else if (msgReg.msg === '註冊成功') {
            return
        } else {
            return (
                <div class="alert alert-warning" role="alert">
                    {msgReg.msg}
                </div>
            )
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        hint()
        // console.log(msgReg)
        // console.log(passwordComfirm)
    }, [])


    return (
        <React.Fragment>
            <div class="container mb-0" style={{ paddingTop: "66px" }}>

                <div class="row d-flex justify-content-center mt-5 ">

                    <div class="col-6 p-0 rounded cardShadow  bg-white border border-muted">

                        <div class="col-7 m-auto">
                            <h2 class="text-center mt-5 font-weight-bold" style={{ color: "var(--darkColor)" }}>會員註冊</h2>
                            <p className="text-center mb-0">加入去露營會員，立即開啟露營新體驗！</p>
                            <div class="mt-3 mb-2">
                                {/* 提示 */}
                                {hint()}
                                <div class="input-group mb-3 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: 50, border: "1px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faUser} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="text" class="form-control h-100" placeholder="姓名" onChange={(e) => {
                                        setMemberNameReg(e.target.value);
                                    }} required style={{}} />
                                </div>

                                <div class="input-group mb-3 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: 50, border: "1px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faEnvelope} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="text" class="form-control h-100" placeholder="電子信箱" onChange={(e) => {
                                        setMemberEmailReg(e.target.value)
                                    }} required style={{}} />
                                </div>

                                <div class="input-group mb-3 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: 50, border: "1px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faMobileAlt} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="tel" class="form-control h-100" placeholder="手機" onChange={(e) => { setMemberPhoneReg(e.target.value) }} required style={{}} />
                                </div>

                                <div class="input-group mb-3 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: 50, border: "1px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faUnlockAlt} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="password" class="form-control h-100" placeholder="密碼" onChange={(e) => {
                                        setMemberPasswordReg(e.target.value);
                                    }} required style={{}} />
                                </div>

                                <div class="input-group mb-3 " style={{ height: 50 }}>
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text bg-white" style={{ width: 50, border: "1px solid var(--priceColor)" }}>
                                            <FontAwesomeIcon icon={faUnlockAlt} className="m-auto" color="var(--priceColor)" style={{ fontSize: 20 }} />
                                        </span>
                                    </div>
                                    <input type="password" class="form-control h-100 " placeholder="確認密碼" onChange={(e) => {
                                        setPasswordConfirm(e.target.value);
                                    }} required style={{}} />
                                </div>

                                <button type="" onClick={validator} class="btn myBtn w-100 text-white my-2"
                                    style={{ backgroundColor: "var(--priceColor)", fontSize: 18, letterSpacing: 2 }}>成為會員</button>
                            </div>

                            <hr class="my-2" />

                            <div class="d-flex justify-content-between mb-5">
                                <p class="text-muted">已經是去露營會員了嗎？</p>
                                <p class="">
                                    <Link to="/login" class=" font-weight-bold" style={{ color: "var(--darkColor)" }}>
                                        立即登入&nbsp;&nbsp;
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;