import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const MemberSetting = (props) => {
    const { user } = props
    console.log(user)

    // const memberBirth = user.MemberBirth.slice(0, 10)
    useEffect(() => {

    }, [user])


    return (
        <React.Fragment>
            <div class="col-md-9 col-12">
                {/* <!-- user_message --> */}
                <div class="card mt-5">
                    <div class="card-header border-0" style={{ backgroundColor: "var(--titleColor)" }}>
                        <div class="row" >

                            <div class="col-11" >
                                <h4 class="m-0 font-weight-bold">個人資料</h4>
                            </div>


                            <div class="col-1 px-1">
                                <Link to="/member/edit">
                                    <FontAwesomeIcon icon={faEdit} />
                                   &nbsp;編輯
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row d-flex flex-column align-items-center">
                            <form class="col-8">
                                <div class="form-group row">
                                    <label htmlFor="memberEmail" class="col-2 col-form-label font-weight-bolder">Email</label>
                                    <div class="col-10 borderBotton d-flex align-items-center">
                                        <p className="mb-0">{user.MemberEmail}</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label htmlFor="menberName" class="col-2 col-form-label font-weight-bolder">姓名</label>
                                    <div class="col-10 borderBotton d-flex align-items-center">
                                        <p className="mb-0">{user.MemberName}</p>
                                    </div>
                                </div>
                                {/* <div class="form-group row">
                                    <label for="memberGender" class="col-2 col-form-label font-weight-bolder">性別</label>
                                    <div class="col-10 borderBotton d-flex align-items-center">
                                        <p className="mb-0">{user.MemberSex === "男" ? "男生" : "女生"}</p>
                                    </div>
                                </div> */}
                                <div class="form-group row">
                                    <label htmlFor="memberTelephone "
                                        class="col-2 col-form-label font-weight-bolder">電話</label>
                                    <div class="col-10 borderBotton d-flex align-items-center">
                                        <p className="mb-0">{user.MemberPhone}</p>
                                    </div>
                                </div>
                                {/* <div class="form-group row">
                                    <label for="example-date-input "
                                        class="col-2 col-form-label font-weight-bolder">生日</label>
                                    <div class="col-10 borderBotton d-flex align-items-center">
                                        <p className="mb-0">{memberBirth}</p>
                                    </div>
                                </div> */}
                            </form>

                        </div>
                    </div>
                </div>

                {/* <!-- end_user_message --> */}

                {/* <!-- end_row --> */}
            </div>
        </React.Fragment>
    );
}

export default MemberSetting;