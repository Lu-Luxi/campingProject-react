import React from 'react';
import { Link } from "react-router-dom";


import '../css/base.css';
import '../css/index.css';



const ForgetPassword02 = (props) => {
    return (
        <React.Fragment>
            {/* 忘記密碼02 */}
            <div className="col-8 m-auto">
                <h3 className="text-center mt-5 font-weight-bold">輸入認證碼</h3>
                <hr className="" />
                <form className="mt-3 mb-2 ">
                    <p className="m-0 ">
                        請輸入認證郵件驗證代碼,若無收到請按&nbsp;<a href="#" className="font-weight-bold" style={{ color: "var(--priceColor)" }}>重新寄送</a>
                    </p>
                    <div className="mb-3 d-flex align-items-center mt-4">
                        <label className="mr-0 font-weight-bold" for="userEmail" style={{ width: "150px" }}>驗證代碼：</label>
                        <input type="text" className="form-control" id="userEmail" />
                    </div>
                    {/* <hr className="my-2" /> */}
                    {/* <a href="forgotPassword03.html" className="btn w-100 text-white my-2 mb-4"
                        style={{ backgroundColor: "var(--lightColor)" }}>
                        下一步
                    </a> */}
                    <Link to="/forget-password/step03" class="btn w-100 text-white my-2 mb-4"
                        style={{ backgroundColor: "var(--priceColor)", letterSpacing: 2 }}>
                        下一步
                    </Link>


                </form>
            </div>
        </React.Fragment>
    );
}


export default ForgetPassword02;