import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import Stars from './Stars';

const SearchResultCamp = (props) => {
    const { minTotalPrice, campName, campTag, cityName, count, ranking, campId, start, end, campAmount, campPhoto, favorite, loggedIn, user, favoriteCampList, setFavoriteCampList } = props;
    // console.log(campPhoto);
    const [heartStatus, setHeartStatus] = useState('unselected');
    console.log(favorite);
    useEffect(() => {
        if (favorite) {
            setHeartStatus('selected');
        } else {
            setHeartStatus('unselected');
        }
    }, [favorite])

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
            {/* <!-- 第一組卡片 --> */}
            <div className="card mb-3 border-0 position-relative" >



                <Link to={{ pathname: `/camps/${campId}`, search: `?start=${start}&end=${end}&campAmount=${campAmount}` }} className="text-decoration-none m-cardImg" onClick={props.handleClick}>
                    {/* <a href="#" className="text-decoration-none"> */}
                    <div className=" row no-gutters">
                        {/* <!-- 收藏的愛心 --> */}
                        {/* <FontAwesomeIcon icon={faHeart} className="m-loveCamp2" style={{ fontSize: 20, color: 'gray' }} /> */}
                        <div className="col-md-4" style={{ height: 180 }}>
                            <img src={campPhoto[0].campPhoto} className="card-img h-100 " alt="..." style={{ objectFit: "cover" }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title mb-3 font-weight-bold">
                                    {campName}
                                </h5>
                                <p className="card-text mb-1 m-fontS12">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="" style={{ fontSize: 14 }} />
                                    <i className="fas fa-map-marker-alt  m-pdL pr-1" style={{ fontSize: 14 }}></i>
                                    <span>地點：{cityName}</span>
                                </p>
                                {/* <!-- 營區分類標籤 --> */}
                                <div className="mb-2">
                                    {campTag.map((item, index) => <span className="m-tagStyle mr-1 rounded" key={index}>{item.tagName}</span>)}
                                </div>
                                <div className="m-starHome">
                                    <p className="card-text mb-1 m-fontS12 d-flex align-items-center">
                                        <Stars ranking={ranking} fontSize={14} />
                                        <span className="ml-1">{ranking}</span>
                                        <span>({count})</span>
                                    </p>
                                    <div className="text-right ">
                                        <span className="font-weight-bold m-TextColor" style={{ fontSize: 28 }}>${minTotalPrice}</span>
                                        <span className="font-weight-bold">&nbsp;/&nbsp;晚</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* <!-- 收藏的愛心 --> */}
                <div onClick={handleHeartToggle}>
                    {loggedIn ? (favorite ?
                        <FontAwesomeIcon icon={faHeart} className="m-loveCamp2" style={{ fontSize: 20, color: 'var(--heartColor)', cursor: "pointer" }} /> :
                        <FontAwesomeIcon icon={faHeart} className="m-loveCamp2" style={{ fontSize: 20, color: 'gray', cursor: "pointer" }} />) :
                        <Link to="/login">
                            <FontAwesomeIcon icon={faHeart} className="m-loveCamp2" style={{ fontSize: 20, color: 'gray', cursor: "pointer" }} />
                        </Link>
                    }
                </div>


            </div>
        </React.Fragment>
    );
}


export default SearchResultCamp;