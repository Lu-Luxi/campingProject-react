import React from 'react';

import '../css/base.css';
import '../css/index.css';


const ForgetPassword03 = (props) => {
    return (
        <React.Fragment>
            {/* 忘記密碼03 */}
            <div class="col-8 m-auto">
                <h3 class="text-center mt-5 font-weight-bold">重新設定密碼</h3>
                <hr class="" />
                <form class="mt-3 mb-2 ">

                    <p class="m-0 ">
                        請為您的帳號，重新設定一組新密碼!
                    </p>
                    <div class="mb-3 d-flex align-items-center mt-3">
                        <label class="mr-0 font-weight-bold" for="userEmail" style={{ width: "120px" }}>密碼設定： </label>
                        <input type="text" class="form-control" id="userEmail" />
                    </div>
                    <div class="mb-3 d-flex align-items-center ">
                        <label class="mr-1 font-weight-bold" for="userEmail" style={{ width: "120px" }}>確認密碼： </label>
                        <input type="text" class="form-control" id="userEmail" />
                    </div>
                    {/* <hr class="my-2" /> */}

                    <button type="submit" class="btn w-100 text-white mt-2 mb-3"
                        style={{ backgroundColor: "var(--priceColor)" }}>確認送出</button>

                </form>




            </div>
        </React.Fragment >
    );
}


export default ForgetPassword03;