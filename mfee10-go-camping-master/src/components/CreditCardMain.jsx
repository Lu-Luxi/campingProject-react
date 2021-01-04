import React from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

import visa from '../img/visa.png';
import master from '../img/master.png';
import jcb from '../img/jcb.png';
import CreditCardInput from './CreditCardInput';

const CreditCardMain = (props) => {
    const { handleOrderClick } = props;

    return (
        <React.Fragment>

            <form className="row bg-white rounded card" style={{ height: "547px" }} >
                <div className="col-12 pt-4 px-4 pb-0" >
                    <h4 className="card-title font-weight-bold ">
                        信用卡交易資訊
                                         </h4>
                    <hr className="mb-2" />
                    <p className="mb-1">親愛的會員您好，請確認您的購買資訊，並正確填寫以下資料！</p>
                    <div className="d-flex">
                        <p className="mr-1">信用卡適用類別：</p>
                        <div>
                            <img src={visa} alt="" style={{ height: "25px" }} className="mr-1" />
                            <img src={master} alt="" style={{ height: "25px" }} className="mr-1" />
                            <img src={jcb} alt="" style={{ height: "25px" }} />
                        </div>
                    </div>

                    {/* 信用卡區塊 */}
                    <div className="col-12 mt-3">
                        {/* 信用卡本人 */}
                        <CreditCardInput />

                        <div className="col-12 d-flex justify-content-center  mt-5">

                            <Link to="/order-create/created" className="btn m-btnBgColor text-white " style={{ width: "30%", fontSize: 18, letterSpacing: 2 }} onClick={handleOrderClick}>
                                確認付款
                            </Link>
                            {/* <span className="btn m-btnBgColor text-white" style={{ width: "30%" }}>確認付款</span> */}
                        </div>
                        <p className="mb-1 mt-3 text-muted">注意事項：</p>
                        <p className="m-0 text-muted">※為維護交易安全，本公司已全面配合國際組織全面採用信用卡3DS 2.0交易授權機制。</p>
                        <p className="text-muted">※提醒您，若冒用他人信用卡或個人資料而為交易者，必移交法辦。</p>
                    </div>

                </div>
            </form>

        </React.Fragment>
    );
}


export default CreditCardMain;