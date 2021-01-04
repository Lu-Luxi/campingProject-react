import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';

import OrderInfoList from './OrderInfoList';
import 'react-credit-cards/es/styles-compiled.css';



import pay02 from '../img/pay02.svg';
import CreditCardMain from './CreditCardMain';
import { useLocation } from 'react-router-dom';
import OrderWelcome from './OrderWelcome';
import OrderCampInfo from './OrderCampInfo';



const CreditCard = (props) => {
    const { start, end, campAmount, getDays, purchaserName, setPurchaserName, purchaserPhone, setPurchaserPhone, purchaserEmail, setPurchaserEmail, paymentInfo, setPaymentInfo, orderInfo, setOrderInfo } = props;
    const [redirect, setRedirect] = useState(false);
    let location = useLocation();
    let queryList = decodeURI(location.search).substring(1,).split("&").join('&');
    // console.log(queryList);

    useEffect(() => {

        const fetchItems = async () => {
            const result = await axios(
                `http://localhost:5000/camps/api/order?${queryList}`,
            );
            await setOrderInfo(result.data);
            // console.log(orderInfo);
        }
        fetchItems();
    }, [queryList, setOrderInfo]);

    return (
        <React.Fragment>
            <div className="container" style={{ paddingTop: 40 }}>
                <div className="row mt-5">
                    <div className="col-12 d-flex mb-3" style={{ height: "100px" }}>
                        {/* <h2 className="card-title text-center font-weight-bold mb-4 pl-4">
                            確認付款
                        </h2> */}
                        <img src={pay02} alt="" style={{ width: "75%" }} className="m-auto" />
                    </div>
                    {/* <!-- 左半邊 --> */}
                    <div className="col-8 ">
                        <div className="col mb-2">
                            {/* <CreditCardMain
                                start={start}
                                end={end}
                                campAmount={campAmount}
                                getDays={getDays}
                                purchaserName={purchaserName}
                                setPurchaserName={setPurchaserName}
                                purchaserPhone={purchaserPhone}
                                setPurchaserPhone={setPurchaserPhone}
                                purchaserEmail={purchaserEmail}
                                setPurchaserEmail={setPurchaserEmail}
                                paymentInfo={paymentInfo}
                                setPaymentInfo={setPaymentInfo}
                                orderInfo={orderInfo}
                                setOrderInfo={setOrderInfo}
                            /> */}
                            <OrderWelcome />
                            <OrderCampInfo />
                        </div>
                    </div>
                    {/* <!-- 右半邊 --> */}
                    {/* <!-- 以下 col-4 --> */}
                    <OrderInfoList
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        getDays={getDays}
                        purchaserName={purchaserName}
                        setPurchaserName={setPurchaserName}
                        purchaserPhone={purchaserPhone}
                        setPurchaserPhone={setPurchaserPhone}
                        purchaserEmail={purchaserEmail}
                        setPurchaserEmail={setPurchaserEmail}
                        paymentInfo={paymentInfo}
                        setPaymentInfo={setPaymentInfo}
                        orderInfo={orderInfo}
                        setOrderInfo={setOrderInfo}
                    />
                    {/* <!-- 以上 col-4 --> */}
                </div>
            </div>
        </React.Fragment >
    );
}


export default CreditCard;