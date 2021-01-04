import React from 'react';
import { Link } from "react-router-dom";

const LeftNav = (props) => {

    return (
        <React.Fragment>
            {/* navbar left start */}
            <nav className="col-2 d-md-block sidebar ">
                <div className=" pt-3 mt-4">
                    <ul className="nav flex-column" style={{ fontSize: 20 }}>
                        <li>
                            <Link to="/dashboard" className="nav-link sidebar-text">
                                首頁
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/order-management" className="nav-link sidebar-text">
                                訂單管理
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/analysis" className="nav-link sidebar-text">
                                銷售分析
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/camp-info" className="nav-link sidebar-text">
                                營區管理
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/area-management" className="nav-link sidebar-text">
                                區域管理
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/setting" className="nav-link sidebar-text">
                                帳號管理
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="col-2"></div>
            {/* navbar left end */}
        </React.Fragment>
    );
}


export default LeftNav;