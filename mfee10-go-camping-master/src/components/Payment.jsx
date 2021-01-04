import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';

import PaymentData from './PaymentData';
import PaymentWay from './PaymentWay';
import PaymentList from './PaymentList';

import pay01 from '../img/pay01.svg';


const Payment = (props) => {

    const { paymentInfo, setPaymentInfo, orderAreaId, setOrderAreaId } = props;


    let location = useLocation();
    let queryList = (decodeURI(location.search).substring(1,).split("&").join('&'));

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchItems = async () => {
            const result = await axios(
                `http://localhost:5000/book/api?${queryList}`,
            );
            await setPaymentInfo(result.data);
            await setOrderAreaId(result.data.bookingCampAreaInfo[0].areaId);
        }
        fetchItems();
    }, [location, queryList, setPaymentInfo, setOrderAreaId]);

    const { bookingCampInfo, bookingCampTag, bookingCampRanking, bookingCampAreaInfo, bookingCampAreaImage } = paymentInfo;
    const { start, end, campAmount, getDays, purchaserName, setPurchaserName, purchaserPhone, setPurchaserPhone, purchaserEmail, setPurchaserEmail } = props;
    let campId = paymentInfo.bookingCampAreaInfo[0].campId;
    let areaId = paymentInfo.bookingCampAreaInfo[0].areaId;

    return (
        <React.Fragment>
            <div className="container" style={{ paddingTop: 40 }}>
                <div className="row mt-5">
                    <div className="col-12 d-flex mb-3" style={{ height: "100px" }}>
                        {/* <h2 className="card-title text-center font-weight-bold mb-4">
                            填寫資料
                        </h2> */}
                        <img src={pay01} alt="" style={{ width: "72%" }} className="m-auto" />
                    </div>
                    {/* <!-- 付款表單 col-8 --> */}
                    <form className="col-12 col-md-8 pt-0">
                        <PaymentData
                            purchaserName={purchaserName}
                            setPurchaserName={setPurchaserName}
                            purchaserPhone={purchaserPhone}
                            setPurchaserPhone={setPurchaserPhone}
                            purchaserEmail={purchaserEmail}
                            setPurchaserEmail={setPurchaserEmail}
                        />
                        <PaymentWay
                            start={start}
                            end={end}
                            campAmount={campAmount}
                            getDays={getDays}
                            campId={campId}
                            areaId={areaId}
                        />
                    </form>
                    {/* <!-- 以上 col-8 --> */}

                    {/* <!-- 以下 col-4 --> */}
                    <PaymentList
                        bookingCampInfo={bookingCampInfo}
                        bookingCampTag={bookingCampTag}
                        bookingCampRanking={bookingCampRanking}
                        bookingCampAreaInfo={bookingCampAreaInfo}
                        bookingCampAreaImage={bookingCampAreaImage}
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        getDays={getDays}
                    />
                    {/* <!-- 以上 col-4 --> */}
                </div>
            </div>


        </React.Fragment >
    );
}


export default Payment;