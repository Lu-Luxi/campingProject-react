import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap-daterangepicker/daterangepicker.css'
import { Link, useLocation } from 'react-router-dom';

import WishList from './WishList';

const WishLists = (props) => {

    const location = useLocation();
    let searchParams = new URLSearchParams(location.search);
    let favoriteCityId = parseInt(searchParams.get("id"));
    console.log(favoriteCityId);
    const { start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, favoriteCamp, favoriteCampList, setFavoriteCampList, loggedIn, user } = props;

    const [wishCityName, setWishCityName] = useState('');
    // console.log(favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId)[0].cityName);
    console.log(favoriteCamp.wishCamp);

    console.log(props.favoriteCamp);

    useEffect(() => {
        const fetchItems = async () => {
            favoriteCityId = parseInt(searchParams.get("id"));
            setWishCityName(favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId)[0] === undefined ? [] : favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId)[0].cityName);
            console.log('in');
            const favorite = await axios(`http://localhost:5000/account/api/wish/campId/${user.MemberId}`,);
            await setFavoriteCampList(favorite.data.favoriteId.map((item, index) => item.campId));
        }
        fetchItems();


    }, [])


    return (
        <React.Fragment>
            {/* <!-- 卡片區塊 --> */}
            <div class="container" style={{ paddingTop: "66px" }}>


                <p class="mt-4" style={{ color: "var(--priceColor)" }}>心願清單&nbsp;<span style={{ color: "black" }}>&gt;</span><span>&nbsp;
                    {/* {favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId)[0].cityName} */}
                    {wishCityName}
                </span></p>

                {/* <!-- 分類名稱 --> */}
                {/* <div class="row">
                    <div class="col ">
                        <h3 class="font-weight-bolder mb-5 mt-4 m-letterSpH3">
                            {wishCityName}
                        </h3>
                    </div>
                </div> */}



                {/* <!-- searchBar區塊 --> */}
                <form className="searchBarHomeWish bg-white cardShadow">
                    <div className="d-flex " >
                        {/* <!-- input --> */}
                        <div className="pl-3  p-1 d-flex  insertShadow" style={{ width: "100%" }} >
                            <div className="inputHome p-2 pl-4 border-right" style={{ width: "60%" }}>
                                <p className=" mb-1 text-secondary" style={{ fontSize: 18 }}>
                                    <FontAwesomeIcon icon={faCalendarPlus} className="mr-1" />
                選擇入住及離營日期
                                </p>
                                <DateRangePicker
                                    initialSettings={{
                                        autoApply: true,
                                        maxSpan: { "days": 7 },
                                        locale: localeSetting,
                                        startDate: start,
                                        endDate: end,
                                        minDate: "2000年01月02日",
                                        maxDate: "2020年12月31日"
                                    }}
                                    startDate={start}
                                    endDate={end}
                                    onApply={(e, p) => { setStart(p.startDate.format('LL')); setEnd(p.endDate.format('LL')); }}
                                >
                                    <input
                                        type="text"
                                        className="w-100 m-searchInput font-weight-bold"
                                        name="dates"
                                    />
                                </DateRangePicker>

                            </div>

                            <div className="inputHome p-2 pl-4" style={{ width: "40%" }}>
                                <p className="mb-1 text-secondary" style={{ fontSize: 18 }}>
                                    <FontAwesomeIcon icon={faCampground} className="mr-1" />
                選擇帳數
            </p>

                                <select
                                    name="campAmount"
                                    className="w-100 border-0"
                                    id="exampleFormControlSelect1"
                                    style={{ outline: "none", fontSize: 18 }}
                                    onChange={event => setCampAmount(event.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>

                            </div>

                        </div>

                        <Link to={`/wish/list?id=${favoriteCityId}&start=${start}&end=${end}&campAmount=${campAmount}`} className="btn m-searchBtn  text-white ml-1 d-flex justify-content-center align-items-center font-weight-bold my-auto mr-1" style={{ width: "25%", height: "75px", fontSize: 20, letterSpacing: 1 }} >
                            {/* <Link to={`/search?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}`} className="btn m-searchBtn  text-white ml-1 d-flex justify-content-center align-items-center font-weight-bold" style={{ width: "25%", fontSize: 18, letterSpacing: 1 }} > */}
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 25 }} className="mr-2" />
        重新搜尋
                        </Link>
                    </div>

                </form>



                <hr class="mb-3" />

                <div style={{ height: "65vh" }}>

                    <p style={{ fontSize: 18 }}>共有&nbsp;<span class="font-weight-bolder" style={{ color: "var(--priceColor)" }}>
                        {favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId).length}
                    </span>&nbsp;個行程在<span class="font-weight-bolder" style={{ color: "var(--priceColor)" }}>&nbsp;{wishCityName}&nbsp;</span>的心願清單
                    </p>
                    {/* <!-- 該分類card模板 d-flex justify-content-center--> */}
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">
                        {favoriteCamp.wishCamp.filter(e => e.cityId === favoriteCityId).map((item, index) => {
                            let newRanking = favoriteCamp.wishCampRanking.filter(e => e.campId === item.campId);
                            let newTag = favoriteCamp.wishCampTag.filter(e => e.campId === item.campId);
                            let newPhoto = favoriteCamp.wishCampPhoto.filter(e => e.campId === item.campId);
                            let favorite = favoriteCampList.includes(item.campId);
                            return (
                                <WishList
                                    key={index}
                                    tag={newTag}
                                    ranking={newRanking[0].ranking}
                                    rankCount={newRanking[0].count}
                                    campId={item.campId}
                                    campName={item.campName}
                                    cityName={item.cityName}
                                    areaPrice={item.areaPrice}
                                    campPhoto={newPhoto[0].campPhoto}
                                    campTag={newTag}
                                    start={start}
                                    end={end}
                                    campAmount={campAmount}
                                    favorite={favorite}
                                    favoriteCampList={favoriteCampList}
                                    setFavoriteCampList={setFavoriteCampList}
                                    loggedIn={loggedIn}
                                    user={user}
                                />
                            )
                        }
                        )}
                    </div>

                </div>
                {/* <!-- 該分類card模板結束 --> */}

            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment>
    );
}


export default WishLists;