import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Stars from './Stars';



import test01 from '../img/test01.jpg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const WishList = (props) => {
    const { areaPrice, campId, campName, campTag, cityName, rankCount, ranking, campPhoto, start, end, campAmount, favorite, loggedIn, user, favoriteCampList, setFavoriteCampList } = props;
    // console.log(campPhoto);
    const [heartStatus, setHeartStatus] = useState('unselected');

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

    console.log(campTag)
    return (
        <React.Fragment>
            {/* <!-- 第一組card --> */}
            <div className="col m-cardPd mb-3 ">

                <div className="position-relative">
                    <Link to={{ pathname: `/camps/${campId}`, search: `?start=${start}&end=${end}&campAmount=${campAmount}` }} className="text-decoration-none" >
                        {/* <a href="" className="text-decoration-none"> */}
                        <div className="card border-0       ">
                            <img src={campPhoto} className="img-fluid card-img-top m-productImg" alt="Responsive image" />

                            <div className="card-body text-dark  m-cardBodyPd">
                                <h5 className="card-title font-weight-bold mb-3 ">{campName}</h5>
                                <p className="card-text mb-1 m-fontS12">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 14 }} color="gray" className="mr-1" />
                                    <span>地點：{cityName}</span>
                                </p>
                                {/* <!-- 營區分類標籤 --> */}
                                <div className="mb-3">
                                    {campTag.map((item, index) => <span className="rounded m-tagStyle mr-1" key={index}>{item.tagName}</span>)}
                                </div>

                                <div className="m-starHome">
                                    <p className="card-text mb-1 m-fontS12">
                                        <Stars ranking={ranking} fontSize={14} />
                                        <span className="ml-1">{ranking}</span>
                                        <span>({rankCount})</span>
                                    </p>
                                    <h6 className="text-right ">
                                        <span className="font-weight-bold m-TextColor">${areaPrice}</span>
                                        <span className="font-weight-bold">/&nbsp;晚</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        {/* </a> */}
                    </Link>


                    {/* <!-- 收藏的愛心 --> */}
                    <div className="m-loveCampWrap m-loveCamp" onClick={handleHeartToggle}>
                        {favorite ?
                            <FontAwesomeIcon icon={faHeart} style={{ fontSize: 16, cursor: "pointer" }} color="var(--heartColor)" /> :
                            <FontAwesomeIcon icon={faHeart} style={{ fontSize: 16, cursor: "pointer" }} color="gray" />
                        }
                    </div>



                </div>

            </div>
            {/* <!-- 第一組card結束 --> */}
        </React.Fragment>
    );
}

export default WishList;