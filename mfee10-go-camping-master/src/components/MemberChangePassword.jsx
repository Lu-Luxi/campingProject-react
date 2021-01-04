import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const MemberEdit = (props) => {
    return (
        <React.Fragment>
            {/* <!-- member_message_page --> */}
            <div className="col-9">
                {/* <!-- user_message --> */}
                <div className="card mt-5">
                    <div class="card-header border-0" style={{ backgroundColor: "var(--titleColor)" }}>
                        <div className="row">
                            <div className="col-11">
                                <h4 className="m-0 font-weight-bold">修改密碼</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body shadow-sm">
                        <div className="row d-flex flex-column align-items-center">
                            <form className="col-7">
                                <div className="form-group row mt-2">
                                    <label for="userPassword" className="col-sm-3 col-form-label pr-0 font-weight-bolder">舊密碼</label>
                                    <div className="col-sm-9 ml-0 ">
                                        <input type="password" className="form-control" id="userPassword" />
                                    </div>
                                </div>

                                <div className="form-group row pt-1">
                                    <label for="userPassword" className="col-sm-3 col-form-label font-weight-bolder">新密碼</label>
                                    <div className="col-sm-9 ml-0">
                                        <input type="password" className="form-control" id="userPassword" />
                                    </div>
                                </div>
                                <div className="form-group row pt-1">
                                    <label for="userPassword" className="col-sm-3 col-form-label font-weight-bolder">再次確認</label>
                                    <div className="col-sm-9 ml-0">
                                        <input type="password" className="form-control" id="userPassword" />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end col-12 p-0 mb-2">
                                    <a className="btn text-white" href="" role="button" style={{ backgroundColor: "var(--btnColor)", letterSpacing: 2 }}>確認修改</a>
                                </div>
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

export default MemberEdit;