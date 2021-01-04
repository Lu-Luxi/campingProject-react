import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngleRight, faCog, faHome, faListAlt, faTicketAlt, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

const MemberSideBar = (props) => {
    const { loginName } = props
    return (
        <React.Fragment>
            {/* <!-- left_nav  --> */}
            <div className="col-md-3 col-12 text-center " >
                {/* <div className="col mt-5 cardShadow rounded bg-white p-4">
                    <div><FontAwesomeIcon icon={faUser} color="var(--priceColor)" style={{ fontSize: 30 }} className="mb-2" /></div>
                    Hi!<span>聰明狗</span>，歡迎回來！
                </div> */}

                <ul className="nav flex-column cardShadow rounded  mt-5 bg-white" style={{ fontSize: 18, color: "var(--darkColor)" }}>
                    <li className="sideNavHover pt-4">
                        {/* <div>
                            <FontAwesomeIcon icon={faUser} color="var(--priceColor)" style={{ fontSize: 30 }} className="mb-2" />
                        </div> */}
                        Hi! <span>{loginName}</span>,去露營嗎？
                    </li>
                    <li className=" sideNavHover p-3 mx-5" >
                        <Link to="/member" className="text-decoration-none font-weight-bold" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>
                            <FontAwesomeIcon icon={faHome} className="mr-3" style={{ fontSize: 16, color: "var(--darkColor)" }} />
                            會員首頁
                        </Link>
                    </li>
                    <li className=" p-2 sideNavHover">
                        <a className="text-decoration-none dropdown-toggle pl-3 font-weight-bold" href="#" data-toggle="collapse"
                            data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>
                            <FontAwesomeIcon icon={faCog} className="mr-3" style={{ fontSize: 16 }} />
                                    帳號設定
                        </a>
                    </li>
                    <div className="collapse w-100 p-2" id="collapseExample">
                        <ul className="pl-3">
                            <li className="mt-0">
                                <Link to="/member/setting" className="text-decoration-none font-weight-bold" >
                                    <FontAwesomeIcon icon={faAngleRight} className="" />
                                    &nbsp;<span> 個人檔案</span>
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link to="/member/edit" className="text-decoration-none font-weight-bold" >
                                    <FontAwesomeIcon icon={faAngleRight} className="" />
                                &nbsp;<span> 修改資料</span>
                                </Link>
                            </li>
                            <li className="mt-2 ">
                                <Link to="/member/changePassword" className="text-decoration-none font-weight-bold" >
                                    <FontAwesomeIcon icon={faAngleRight} className="" />
                                &nbsp;<span> 修改密碼</span>
                                </Link>
                                {/* <a className="text-decoration-none" href="member02-2_user_message_chang_password.html">
                                    <FontAwesomeIcon icon={faAngleRight} className="" />
                                            &nbsp;<span> 修改</span>
                                </a> */}
                            </li>
                        </ul>
                    </div>

                    <li className=" p-3 sideNavHover">
                        <Link to="/member/order-list" className="text-decoration-none font-weight-bold" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>
                            <FontAwesomeIcon icon={faListAlt} className="mr-3" style={{ fontSize: 16 }} />
                            訂單管理
                        </Link>
                    </li>
                    {/* <li className=" pt-2 pb-3 sideNavHover">
                        <Link to="/member/coupon-list" className="text-decoration-none font-weight-bold" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>
                            <FontAwesomeIcon icon={faTicketAlt} className="mr-3" style={{ fontSize: 16 }} />
                            折扣禮券
                        </Link>
                    </li> */}
                    <li className=" pt-2 pb-4 sideNavHover">
                        <Link to="/wish" className="text-decoration-none font-weight-bold" style={{ color: "var(--darkColor)", letterSpacing: 1 }}>
                            <FontAwesomeIcon icon={faHeart} className="mr-3" style={{ fontSize: 16 }} />
                            心願清單
                        </Link>
                    </li>
                </ul>
            </div>
            {/* <!-- end_left_nav --> */}
        </React.Fragment>
    );
}


export default MemberSideBar;