import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import camping from '../img/camping.jpg';
import Stars from './Stars';
import { faCommentDots, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';


const MemberOrderDetail = (props) => {

    const { DropdownId, campName, orderDate, purchaserName, paymentMethod, paymentAmount, campAddress, campPhone, campOwnerName, areaName, reservedCount, rankingText, checkinDay, checkoutDay, totalDays } = props
    //   console.log(DropdownId)
    return (
        <div class="collapse w-100" id={DropdownId}>
            <div class=" card-body w-100 " style={{ borderTop: "2px solid var(--titleColor)" }}>
                <div class="row">

                    <div class="col-md-6 col-6">

                        <h5 class="font-weight-bold">▎營區資訊</h5>
                        <div class=" my-2  rounded py-2">
                            <div class="row">
                                <div className="col-4">
                                    <p class="font-weight-bold">營區名稱</p>
                                    <p class="font-weight-bold">營區地址</p>
                                    <p class="font-weight-bold">營主姓名</p>
                                    <p class="font-weight-bold">聯絡電話</p>
                                </div>

                                <div className="col-8">
                                    <p class="font-weight-bold">{campName}</p>
                                    <p class="font-weight-bold">{campAddress}</p>
                                    <p class="font-weight-bold">{campOwnerName}</p>
                                    <p class="font-weight-bold">{campPhone}</p>
                                </div>
                            </div>
                        </div>

                        {/* 訂單評價 */}
                        <h5 class="font-weight-bold ">▎訂單評價</h5>
                        <div class=" my-2 rounded p-2">
                            <p>{!!rankingText ? rankingText : '尚未評價'}</p>
                        </div>
                    </div>
                    {/* <!-- 左結束 --> */}


                    {/* <!-- 右 --> */}
                    <div class="col-6">
                        <h5 class="font-weight-bold ">▎訂單資訊</h5>
                        <div class=" my-2 rounded py-2">
                            <div class="row">
                                <div className="col-4">
                                    <p class="font-weight-bold">入營時間</p>
                                    <p class="font-weight-bold">離營時間</p>
                                    <p class="font-weight-bold">入營天數</p>
                                    <p class="font-weight-bold">區域 / 帳數</p>
                                    <p class="font-weight-bold">訂購人姓名</p>
                                    <p class="font-weight-bold">付款日期</p>
                                    <p class="font-weight-bold">付款方式</p>
                                    <p class="font-weight-bold">付款金額</p>
                                </div>

                                <div className="col-8">
                                    <p class="font-weight-bold">{checkinDay}</p>
                                    <p class="font-weight-bold">{checkoutDay}</p>
                                    <p class="font-weight-bold">共{totalDays}晚</p>
                                    <p class="font-weight-bold"><span>{areaName}</span>&nbsp;/&nbsp;<span>{reservedCount}</span>帳</p>
                                    <p class="font-weight-bold">{purchaserName}</p>
                                    <p class="font-weight-bold">{orderDate}</p>
                                    <p class="font-weight-bold">{paymentMethod}</p>
                                    <p class="font-weight-bold"><span>{paymentAmount}</span>元</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberOrderDetail