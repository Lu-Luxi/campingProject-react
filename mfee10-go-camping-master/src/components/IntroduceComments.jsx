import React from 'react';

import IntroduceComment from './IntroduceComment'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Stars from './Stars';

const IntroduceComments = (props) => {

    const { campRanking, campRankingDetail } = props;
    // console.log(campRanking);
    return (
        <React.Fragment>
            {/* <section id="camp-review-link"> */}
            <div id="camp-review-wrapper " className="card mt-2 border-0 ">
                <div className="card-body" style={{ position: "relative", width: "100%" }}
                >
                    <section id="camp-review-link" style={{ position: "absolute", top: "-66px", height: 750 }}></section>
                    <h3 className="card-title font-weight-bold">
                        營友評價
                    </h3>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="overview-rank d-flex mb-2">
                                <div className="big-score px-4" style={{ backgroundColor: "var(--darkColor)" }}> {campRanking[0] ? (Math.round(campRanking[0].ranking * 10) / 10).toFixed(1) : null}<span className="pt-2" style={{ fontSize: 18 }}>/5</span></div>
                                <div>
                                    <Stars ranking={campRanking[0] ? campRanking[0].ranking : null} fontSize={16} />
                                    <div className="star-wrapper">
                                        <i className="fa fa-star" style={{ color: "rgb(238, 199, 73)" }}></i>
                                        <i className="fa fa-star" style={{ color: "rgb(238, 199, 73)" }}></i>
                                        <i className="fa fa-star" style={{ color: "rgb(238, 199, 73)" }}></i>
                                        <i className="fa fa-star" style={{ color: "rgb(238, 199, 73)" }}></i>
                                        <i className="fa fa-star" style={{ color: "rgb(238, 199, 73)" }}></i>
                                    </div>
                                    <span>共&nbsp;<span>{campRanking[0] ? campRanking[0].count : null}</span>&nbsp;則評價</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row ">
                                <div className="col-6 col-md-6 ">
                                    {/* <!-- 浴廁 --> */}
                                    <div className="row">
                                        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
                                            <span>浴廁</span>

                                            <span className="ranking-bar">
                                                <Stars ranking={campRanking[0] ? campRanking[0].bathroomRanking : null} fontSize={16} />
                                                <span className="ml-3 font-weight-bold">{campRanking[0] ? (Math.round(campRanking[0].bathroomRanking * 10) / 10).toFixed(1) : null}</span>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <!-- 交通 --> */}
                                    <div className="row ">
                                        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
                                            <span>交通</span>
                                            <div className="ranking-bar">
                                                <Stars ranking={campRanking[0] ? campRanking[0].transportRanking : null} fontSize={16} />
                                                <span className="ml-3 font-weight-bold">{campRanking[0] ? (Math.round(campRanking[0].transportRanking * 10) / 10).toFixed(1) : null}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- 設施 --> */}
                                    <div className="row">
                                        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
                                            <span>設施</span>
                                            <div className="ranking-bar">
                                                <Stars ranking={campRanking[0] ? campRanking[0].facilityRanking : null} fontSize={16} />
                                                <span className="ml-3 font-weight-bold">{campRanking[0] ? (Math.round(campRanking[0].facilityRanking * 10) / 10).toFixed(1) : null}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6 col-md-6">
                                    {/* <!-- 服務 --> */}
                                    <div className="row">
                                        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
                                            <span>服務</span>
                                            <div className="ranking-bar">
                                                <Stars ranking={campRanking[0] ? campRanking[0].serviceRanking : null} fontSize={16} />
                                                <span className="ml-3 font-weight-bold">{campRanking[0] ? (Math.round(campRanking[0].serviceRanking * 10) / 10).toFixed(1) : null}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- 景觀 --> */}
                                    <div className="row">
                                        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
                                            <span>景觀</span>
                                            <div className="ranking-bar">
                                                <Stars ranking={campRanking[0] ? campRanking[0].sceneryRanking : null} fontSize={16} />
                                                <span className="ml-3 font-weight-bold">{campRanking[0] ? (Math.round(campRanking[0].sceneryRanking * 10) / 10).toFixed(1) : null}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    {/* <!-- 評價 --> */}
                    <div className=" row">
                        {campRankingDetail.slice(0, 4).map((item, index) => <IntroduceComment
                            key={index}
                            rankingTime={item.rankingTime}
                            rankingName={item.rankingName}
                            ranking={item.ranking}
                            rankingText={item.rankingText}
                        />
                        )}
                    </div>
                    <div className=" text-right">
                        <a href="#" className="btn  text-white" style={{ backgroundColor: "var(--priceColor)" }}>顯示更多評價</a>
                    </div>
                </div>
            </div>


            {/* </section> */}

        </React.Fragment >
    );
}


export default IntroduceComments;