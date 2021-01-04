import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import axios from 'axios';

import CreditCardMain from './CreditCardMain';
import OrderCampInfo from './OrderCampInfo';
import OrderWelcome from './OrderWelcome';

import pay02 from '../img/pay02.svg';
import pay03 from '../img/pay03.svg';
import OrderInfoList from './OrderInfoList';
const OrderCreate = (props) => {

    const { start, end, campAmount, getDays, purchaserName, setPurchaserName, purchaserPhone, setPurchaserPhone, purchaserEmail, setPurchaserEmail, paymentInfo, setPaymentInfo, orderInfo, setOrderInfo, user } = props;
    let location = useLocation();
    let queryList = decodeURI(location.search).substring(1,).split("&").join('&');

    const [orderId, setOrderId] = useState(0);

    console.log(orderInfo.areaInfo);

    const handleOrderClick = () => {
        console.log('ok');
        createOrder();
    }

    const createOrder = async () => {
        axios.post(`http://localhost:5000/camps/api/order`, {
            purchaserName: purchaserName,
            purchaserPhone: purchaserPhone,
            purchaserEmail: purchaserEmail,
            memberId: user.MemberId,
            paymentMethodId: 1,
            paymentStatusId: 1,
            paymentAmount: 3000,
            orderStatusId: 1,
            start: start,
            end: end,
            areaId: orderInfo.areaInfo[0].areaId,
            campAmount: campAmount,
            dateCount: getDays(start, end),
        }).then((response) => {
            setOrderId(response.data);
            console.log(response);
            // setMsgReg(response.data);
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
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
            <div className="container" style={{ paddingTop: "40px" }}>
                <div className="row mt-5">
                    <div className="col-12 d-flex mb-3" style={{ height: "100px" }}>
                        <Switch>
                            <Route path="/order-create/credit-card">
                                <img src={pay02} alt="" style={{ width: "72%" }} className="m-auto" />
                            </Route>
                            <Route path="/order-create/created">
                                <img src={pay03} alt="" style={{ width: "72%" }} className="m-auto" />
                            </Route>
                        </Switch>

                    </div>
                    {/* <!-- 左半邊 --> */}
                    <div className="col-8 ">
                        <div className="col mb-2">
                            <Switch>
                                <Route path="/order-create/credit-card">
                                    <CreditCardMain
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
                                        handleOrderClick={handleOrderClick}
                                    />
                                </Route>
                                <Route path="/order-create/created">
                                    <OrderWelcome
                                        orderId={orderId}
                                        purchaserEmail={purchaserEmail}
                                    />
                                    <OrderCampInfo
                                        orderInfo={orderInfo}
                                        paymentInfo={paymentInfo}
                                    />
                                </Route>
                            </Switch>
                        </div>
                    </div>
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
                </div>
            </div>
        </React.Fragment>
    );
}


export default OrderCreate;