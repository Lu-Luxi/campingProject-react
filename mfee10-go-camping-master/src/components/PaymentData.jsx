import React from 'react';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';


const PaymentData = (props) => {
    const { purchaserName, setPurchaserName, purchaserPhone, setPurchaserPhone, purchaserEmail, setPurchaserEmail } = props;

    return (
        <React.Fragment>
            <div className="card  border-0 cardShadow " style={{}}>
                <div className="card-body ">
                    <h4 className="card-title font-weight-bold">
                        訂購人資料
                    </h4>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <div className="d-flex">
                                <span className="mr-2"><span className="text-danger" style={{ fontSize: 20 }}>*</span>訂購人姓名</span>
                                <input
                                    className="form-control"
                                    style={{ width: "230px" }}
                                    required="required"
                                    placeholder=""
                                    name="purchaserName"
                                    value={purchaserName}
                                    onChange={event => setPurchaserName(event.target.value)}
                                    onFocus={(e) => { setPurchaserName("王艾咪") }}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex">
                                <span className="mr-2"><span className="text-danger" style={{ fontSize: 20 }}>*</span>手機號碼</span>
                                <input
                                    className="form-control"
                                    style={{ width: "230px" }}
                                    required="required"
                                    placeholder=""
                                    name="purchaserPhone"
                                    value={purchaserPhone}
                                    onChange={event => setPurchaserPhone(event.target.value)}
                                    onFocus={(e) => { setPurchaserPhone("0970975903") }}
                                />
                            </div>
                        </div>
                        <div className="col mt-3">
                            <div className="d-flex">
                                <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>電子信箱</span>
                                <input type="email"
                                    className="form-control"
                                    style={{ width: "230px" }}
                                    require
                                    placeholder=""
                                    name="purchaserEmail"
                                    value={purchaserEmail}
                                    onChange={event => setPurchaserEmail(event.target.value)}
                                    onFocus={(e) => { setPurchaserEmail("amy@gmail.com") }}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}


export default PaymentData;