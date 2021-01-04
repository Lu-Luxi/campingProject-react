import React from 'react';
import { Link } from "react-router-dom";


import '../css/base.css';
import '../css/index.css';




const ForgetPassword01 = (props) => {
    return (
        <React.Fragment>
            {/* 忘記密碼01 */}
            <div class="col-8 m-auto ">
                <h3 class="text-center mt-5 font-weight-bold">忘記密碼</h3>
                <hr class="" />
                <form class="mt-3 mb-2 ">
                    <p class="m-0 ">
                        輸入後，系統將寄出確認信到該帳號的電子信箱
                    </p>
                    <div class="mb-3 d-flex align-items-center justify-content-center mt-4">
                        <label class="mr-0 font-weight-bold" for="userEmail" style={{ width: "150px" }}>電子信箱：</label>
                        <input type="text" class="form-control" id="userEmail" />
                    </div>
                    {/* <hr class="my-2" /> */}
                    <Link to="/forget-password/step02" class="btn w-100 text-white my-2 mb-4"
                        style={{ backgroundColor: "var(--priceColor)", letterSpacing: 2 }}>下一步</Link>
                    {/* <a href="forgotPassword02.html" class="btn w-100 text-white my-2 mb-4"
                        style={{ backgroundColor: "var(--lightColor)" }}>
                        下一步
                    </a> */}
                </form>
            </div>
        </React.Fragment>
    );
}


export default ForgetPassword01;