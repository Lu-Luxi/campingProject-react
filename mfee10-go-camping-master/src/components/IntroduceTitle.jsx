import React, { useState } from 'react';
import axios from 'axios';
// import Skeleton from 'react-loading-skeleton';
// import ReactPlaceholder from 'react-placeholder';
// import "react-placeholder/lib/reactPlaceholder.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

import { faHeart, faImage, faMapMarkerAlt, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import Stars from './Stars';
import { Link } from 'react-router-dom';

// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const IntroduceTitle = (props) => {
    // const { campInfo, campRanking, campImage } = props.introValue;
    const { favorite, loggedIn, user, favoriteCampList, setFavoriteCampList, campId, introValue } = props;
    // let mainPhoto = campImage[0];
    // let otherPhoto = campImage.filter((item, index) => index !== 0);

    const [heartStatus, setHeartStatus] = useState(favorite ? 'selected' : 'unselected');

    const handleHeartToggle = () => {
        heartStatus === 'unselected' ? setHeartStatus('selected') : setHeartStatus('unselected');
        //這裏要連資料庫將該campId加入或移除資料表
        // if (!loggedIn) {
        //     window.location.href = 'http://localhost:3000/login';
        // }
        fetchFavorite();
    }

    const fetchFavorite = async () => {
        if (loggedIn && heartStatus === 'unselected') {
            //add (update)
            await axios.post(`http://localhost:5000/account/api/wish/add`, {
                memberId: user.MemberId,
                campId: campId,
            }).then((response) => {
                console.log(response);
            });
            //search
            const favorite = await axios(`http://localhost:5000/account/api/wish/campId/${user.MemberId}`,);
            await setFavoriteCampList(favorite.data.favoriteId.map((item, index) => item.campId));
        } else if (loggedIn && heartStatus === 'selected') {
            //add (delete)
            await axios.post(`http://localhost:5000/account/api/wish/delete`, {
                memberId: user.MemberId,
                campId: campId,
            }).then((response) => {
                console.log(response);
            });
            //search
            const favorite = await axios(`http://localhost:5000/account/api/wish/campId/${user.MemberId}`,);
            await setFavoriteCampList(favorite.data.favoriteId.map((item, index) => item.campId));
        } else {
            // console.log('out');
            // setFavoriteCampList([]);
        }
    }
    return (
        <React.Fragment>
            <section id="camp-overview" className="mt-3">
                <div className="card border-0 pt-1">

                    <div className="card-body pb-0 pt-4">
                        <h3 className="card-title font-weight-bold">
                            {!!introValue.campInfo[0] ? introValue.campInfo[0].campName : ''}
                        </h3>
                        <div className="d-flex  justify-content-between card-text mb-0 ">
                            <div>
                                <span className="card-text mb-1 d-flex align-items-center" style={{ fontSize: 16 }} >
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                    <span>{!!introValue.campInfo[0] ? introValue.campInfo[0].cityName : null}&nbsp;｜</span>
                                    <Stars ranking={!!introValue.campRanking[0] ? introValue.campRanking[0].ranking : null} fontSize={16} />
                                    <span className="ml-1">{!!introValue.campRanking[0] ? (Math.round(introValue.campRanking[0].ranking * 10) / 10).toFixed(1) : null}</span>
                                    <span>({!!introValue.campRanking[0] ? introValue.campRanking[0].count : null})</span>
                                </span>
                            </div>

                            <div>
                                <button className="btn">
                                    <FontAwesomeIcon icon={faShareSquare} className="mr-1" />
                                        分享</button>
                            </div>
                        </div>
                    </div>
                    {/* <!-- 圖片 --> */}
                    <div className="px-4 pb-4 position-relative">
                        {/* <!-- 收藏的愛心 --> */}
                        <div className="m-loveCampWrap m-loveCamp" style={{ zIndex: 1000, right: 35, top: 10, width: 35, height: 35 }} onClick={handleHeartToggle}>
                            {loggedIn ? (favorite ?
                                <FontAwesomeIcon icon={faHeart} style={{ fontSize: 18, color: 'var(--heartColor)', cursor: "pointer" }} /> :
                                <FontAwesomeIcon icon={faHeart} style={{ fontSize: 18, color: 'gray', cursor: "pointer" }} />) :
                                <Link to="/login">
                                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: 18, color: 'gray', cursor: "pointer" }} />
                                </Link>
                            }
                        </div>

                        <div className="row no-gutters " style={{ height: "355px" }}>
                            <div className="col-md-6 col-6 border-right" style={{ height: "100%" }}>
                                {/* <Skeleton height={350}/> */}
                                <img src={!!introValue.campImage[0] ? introValue.campImage[0].campPhoto : null} alt="" className="rounded-left"
                                    style={{ height: "100%", width: "100%", objectFit: "cotain", borderBottomLeftRadius: "calc(.25rem - 1px)" }} />
                            </div>

                            <div className="col-md-6 col-6" style={{ height: "100%" }} >
                                <div className="row no-gutters" style={{ height: "50%" }}  >
                                    <div className="col-md-6 col-6 border-right " style={{ height: "100%" }} >
                                        <img src={!!introValue.campImage[1] ? introValue.campImage[1].campPhoto : null} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div className="col-md-6 col-6 " style={{ height: "100%" }} >
                                        <img src={!!introValue.campImage[2] ? introValue.campImage[2].campPhoto : null} alt="" style={{ height: "100%", width: "100%", objectFit: "cover", borderBottomRightRadius: "calc(.25rem - 1px)" }} />
                                    </div>

                                    {/* 
                                    <div className="col-md-6 col-6 border-right">
                                        <img src={!!introValue.campImage[3] ? introValue.campImage[3].campPhoto : null} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <img src={!!introValue.campImage[4] ? introValue.campImage[4].campPhoto : null} alt=""
                                            style={{ height: "100%", width: "100%", objectFit: "cover", borderBottomRightRadius: "calc(.25rem - 1px)" }} />
                                      
                                    </div> */}


                                </div>

                                <div className="row no-gutters border-top" style={{ height: "50%" }}>
                                    <div className="col-md-6 col-6 border-right" style={{ height: "100%" }} >
                                        <img src={!!introValue.campImage[3] ? introValue.campImage[3].campPhoto : null} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div className="col-md-6 col-6 position-relative" style={{ height: "100%" }} >
                                        <img src={!!introValue.campImage[4] ? introValue.campImage[4].campPhoto : null} alt=""
                                            style={{ height: "100%", width: "100%", objectFit: "cover", borderBottomRightRadius: "calc(.25rem - 1px)" }} />
                                        {/* <span className=" position-absolute p-2 rounded" style={{ right: 10, bottom: 10, backgroundColor: "white" }}>
                                            <FontAwesomeIcon icon={faImage} className="mr-1" />
                                            查看更多圖片
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment >
    );
}


export default IntroduceTitle;