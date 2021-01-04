import React, { Component } from 'react';
import axios from 'axios';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';

import OrderInfoList from './OrderInfoList';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import visa from '../img/visa.png';
import master from '../img/master.png';
import jcb from '../img/jcb.png';

import pay02 from '../img/pay02.svg';
import { Link } from 'react-router-dom';



class CreditCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        };

    }



    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleInputFocus = (e) => {
        this.setState({
            focus: e.target.name,
            // expiry: e.target.
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    render() {

        return (
            <React.Fragment>
                <div className="container" style={{ paddingTop: "40px" }}>
                    <div className="row mt-5">
                        <div className="col-12 d-flex mb-3">
                            {/* <h2 className="card-title text-center font-weight-bold mb-4 pl-4">
                            確認付款
                        </h2> */}
                            <img src={pay02} alt="" style={{ width: "710px" }} className="m-auto" />
                        </div>
                        {/* <!-- 左半邊 --> */}
                        <div className="col-8 ">
                            <div className="col mb-2">


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
                                            <div id="PaymentForm" className="row mb-4">
                                                <div className="col-6 pl-0 pr-5" style={{ objectFit: "fill" }}>
                                                    <Cards
                                                        cvc={this.state.cvc}
                                                        expiry={this.state.expiry}
                                                        focused={this.state.focus}
                                                        name={this.state.name}
                                                        number={this.state.number}
                                                        style={{ width: "200px" }}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <div className="d-flex">
                                                        <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>持卡人姓名</span>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            onChange={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            className="form-control text-center" style={{ width: "180px" }} />
                                                    </div>
                                                    <div className="my-2 d-flex">
                                                        <span className="mr-4"><span className="text-danger p-0" style={{ fontSize: 20 }}>*</span>信用卡卡號</span>
                                                        <input
                                                            type="tel"
                                                            name="number"
                                                            onChange={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            className="form-control text-center"
                                                            style={{ width: "180px" }}
                                                            maxLength="16"
                                                            pattern="[0-9]*"
                                                        />
                                                    </div>
                                                    <div className="my-2 d-flex">
                                                        <span className="mr-2"><span className="text-danger" style={{ fontSize: 20 }}>*</span>卡片有效期限</span>
                                                        <input
                                                            type="text"
                                                            name="expiry"
                                                            onChange={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            placeholder="MM&nbsp;/&nbsp;YY"
                                                            className="text-center form-control text-center"
                                                            style={{ width: "180px" }}
                                                            maxLength="5" />
                                                    </div>
                                                    <div className="my-2 d-flex">
                                                        <span className="mr-4"><span className="text-danger" style={{ fontSize: 20 }}>*</span>背面末三碼</span>
                                                        <input
                                                            type="text"
                                                            name="cvc"
                                                            onChange={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            className="form-control text-center"
                                                            style={{ width: "180px" }}
                                                            maxLength="3" />
                                                    </div>

                                                </div>
                                            </div>



                                            <div className="col-12 d-flex justify-content-center  mt-5">
                                                <Link to="order-created" className="btn m-btnBgColor text-white " style={{ width: "30%", fontSize: 18 }}>
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
                            </div>
                        </div>

                        {/* <!-- 右半邊 --> */}
                        {/* <!-- 以下 col-4 --> */}
                        <OrderInfoList
                            start={this.props.start}
                            end={this.props.end}
                            campAmount={this.props.campAmount}
                            getDays={(fromDate, toDate) => this.props.getDays(fromDate, toDate)}
                            purchaserName={this.props.purchaserName}
                            setPurchaserName={() => this.props.setPurchaserName()}
                            purchaserPhone={this.props.purchaserPhone}
                            setPurchaserPhone={() => this.props.setPurchaserPhone()}
                            purchaserEmail={this.props.purchaserEmail}
                            setPurchaserEmail={() => this.props.setPurchaserEmail()}
                            paymentInfo={this.props.paymentInfo}
                            setPaymentInfo={() => this.props.setPaymentInfo()}
                        />
                        {/* <!-- 以上 col-4 --> */}
                    </div>
                </div>










            </React.Fragment >
        );
    }
}


export default CreditCard;