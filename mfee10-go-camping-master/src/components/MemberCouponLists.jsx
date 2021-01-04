import React from 'react';

const MemberCouponLists = (props) => {
    return (
        <React.Fragment>
            <div class="col-9">
                <div class="mt-5 ">

                    <h3 class="mb-2 font-weight-bold px-0" style={{ letterSpacing: 2, color: "var(--darkColor)" }}>我的優惠券</h3>
                    <div>※優惠券可以和禮物卡同時使用。</div>
                    <div>※優惠券不能和首購優惠、紅利、站方活動折抵同時使用，且已成立訂單不能以未使用優惠券為由取消訂單。</div>

                </div>
                <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active font-weight-bold" id="home-tab" data-toggle="tab" href="#home"
                            role="tab" aria-controls="home" aria-selected="true">未使用</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link font-weight-bold" id="profile-tab" data-toggle="tab" href="#profile"
                            role="tab" aria-controls="profile" aria-selected="false">已使用</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link font-weight-bold" id="contact-tab" data-toggle="tab" href="#contact"
                            role="tab" aria-controls="contact" aria-selected="false">已失效</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="card ">
                            {/* <!-- title --> */}
                            <div class="row mt-0 p-3 mx-0 " style={{ backgroundColor: "var(--tagColor)" }}>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0" >優惠卷名稱</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">優惠卷期限</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">使用狀態</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1">
                                    <p className="mb-0">優惠卷折扣</p>
                                </div>
                            </div>
                            {/* <!-- text --> */}
                            <div class="row mt-3 px-4 ">
                                <div class="col-3">
                                    <p>新年抽抽樂</p>
                                </div>
                                <div class="col-3">
                                    <p>2020/08/01</p>
                                </div>
                                <div class="col-3">
                                    <p>未使用</p>
                                </div>
                                <div class="col-3">
                                    <p>8折</p>
                                </div>
                            </div>
                            {/* <hr className="mb-0" /> */}
                            <div class="row my-3 px-4">
                                <div class="col-3">
                                    <p>新年抽抽樂</p>
                                </div>
                                <div class="col-3">
                                    <p>2020/08/01</p>
                                </div>
                                <div class="col-3">
                                    <p>未使用</p>
                                </div>
                                <div class="col-3">
                                    <p>8折</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <div class="card">
                            {/* <!-- title --> */}
                            <div class="row mt-0 p-3 mx-0 " style={{ backgroundColor: "var(--tagColor)" }}>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0" >優惠卷名稱</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">優惠卷期限</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">使用狀態</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1">
                                    <p className="mb-0">優惠卷折扣</p>
                                </div>
                            </div>
                            {/* <hr className="mb-0" /> */}
                            {/* <!-- text --> */}
                            <div class="row mt-3 px-4">
                                <div class="col-3">
                                    <p>新年抽抽樂</p>
                                </div>
                                <div class="col-3">
                                    <p>2020/08/01</p>
                                </div>
                                <div class="col-3">
                                    <p>已使用</p>
                                </div>
                                <div class="col-3">
                                    <p>8折</p>
                                </div>
                            </div>
                            <hr className="mb-0" />
                        </div>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <div class="card">
                            {/* <!-- title --> */}
                            <div class="row mt-0 p-3 mx-0 " style={{ backgroundColor: "var(--tagColor)" }}>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0" >優惠卷名稱</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">優惠卷期限</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1" style={{ backgroundColor: "var(--tagColor)" }}>
                                    <p className="mb-0">使用狀態</p>
                                </div>
                                <div class="col-3 font-weight-bold p-1">
                                    <p className="mb-0">優惠卷折扣</p>
                                </div>
                            </div>
                            {/* <hr className="mb-0" /> */}
                            {/* <!-- text --> */}
                            <div class="row mt-3 px-4">
                                <div class="col-3">
                                    <p>新年抽抽樂</p>
                                </div>
                                <div class="col-3">
                                    <p>2020/08/01</p>
                                </div>
                                <div class="col-3">
                                    <p>已失效</p>
                                </div>
                                <div class="col-3">
                                    <p>8折</p>
                                </div>
                            </div>
                            {/* <hr className="mb-0" /> */}
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default MemberCouponLists;