import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import '../css/payment.css';


import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const OrderWelcome = (props) => {

    const { orderId, purchaserEmail } = props;

    const getCurrentTime = () => {
        let currentTime = new Date();
        let year = currentTime.getFullYear();
        let month = currentTime.getMonth() + 1;
        let date = currentTime.getDate();
        let hour = currentTime.getHours();
        let minute = (currentTime.getMinutes() + 100).toString().slice(1);
        let second = (currentTime.getSeconds() + 100).toString().slice(1);
        return (`${year}年${month}月${date}日 ${hour}:${minute}:${second}`);
    }

    return (
        <React.Fragment>
            <div className="row bg-white rounded mb-2 card" style={{}}>
                <div className="col px-5 py-4 mb-2 ">
                    <h5 className="font-weight-bold" style={{ color: "var(--btnColor)" }}>親愛的會員您好，感謝您使用我們的服務，本次預訂已提交成功！</h5>
                    <p className="mb-0 m-text18">
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--priceColor)" }} className="mr-1" />
                        訂單編號：<span>#{orderId}</span></p>
                    <p className="mb-0 m-text18"><FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--priceColor)" }} className="mr-1" />訂單成立時間：<span>{getCurrentTime()}</span>
                    </p>
                    <p className="mb-0 m-text18"><FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--priceColor)" }} className="mr-1" />我們將寄營區預定確認信至<span
                        className="m-priceColor">&nbsp;{purchaserEmail}</span>，敬請查收
                                    </p>
                    <p className="mb-0 m-text18"><FontAwesomeIcon icon={faCheckCircle} style={{ color: "var(--priceColor)" }} className="mr-1" />若有疑問請撥打服務電話：04-23242526</p>
                </div>
            </div>
        </React.Fragment >
    );
}


export default OrderWelcome;