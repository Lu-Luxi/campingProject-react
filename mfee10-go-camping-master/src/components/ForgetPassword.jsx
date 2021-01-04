import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import '../css/base.css';
import '../css/index.css';


import ForgetPassword01 from './ForgetPassword01';
import ForgetPassword02 from './ForgetPassword02';
import ForgetPassword03 from './ForgetPassword03';



const ForgetPassword = (props) => {
    return (
        <React.Fragment>
            {/* <div className="container" style={{ paddingTop: 66 }}>
                <div className="row">
                    <Switch>
                        <Route exact path="/ForgetPassword">
                            <ForgetPassword />
                        </Route>
                        <Route exact path="/member/setting">
                            <MemberSetting />
                        </Route>

                    </Switch>
                </div>
            </div> */}


            {/* <!-- login_page --> */}
            <div class="container mb-0" style={{ paddingTop: 66 }}>
                <div class="row d-flex justify-content-center mt-5">
                    <div class="col-6 p-0 rounded cardShadow  bg-white ">
                        <Switch>
                            {/* 忘記密碼01 */}
                            <Route exact path="/forget-password">
                                <ForgetPassword01 />
                            </Route>
                            {/* 忘記密碼02 */}
                            <Route path="/forget-password/step02">
                                <ForgetPassword02 />
                            </Route>
                            {/* 忘記密碼03 */}
                            <Route path="/forget-password/step03">
                                <ForgetPassword03 />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


export default ForgetPassword;