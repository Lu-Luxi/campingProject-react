import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IntroduceTitle from './IntroduceTitle';
import IntroduceIntroduce from './IntroduceIntroduce';
import IntroduceMap from './IntroduceMap';
import IntroduceChoose from './IntroduceChoose';
import IntroduceChooseResult from './IntroduceChooseResult';
import IntroduceOrderLists from './IntroduceOrderLists';
import IntroduceComments from './IntroduceComments';
import IntroduceNote from './IntroduceNote';
import IntroduceGoogleMap from './IntroduceGoogleMap';


import { useLocation } from "react-router-dom";

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

import SearchSearchBar from './SearchSearchBar';
import IntroduceScrollSpy from './IntroduceScrollSpy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';




const Introduce = (props) => {
    let location = useLocation();
    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, getDays, loggedIn, user, favoriteCampList, setFavoriteCampList, setBrowserLocation, setSearchResultText } = props;
    const [campId, setCampId] = useState(location.pathname.split('/camps/').join(''));
    const [searchCampAmount, setSearchCampAmount] = useState(campAmount);

    setBrowserLocation(useLocation());
    let favorite = favoriteCampList.includes(parseInt(campId));

    const [introValue, setIntroValue] = useState({
        campImage: [],
        campInfo: [],
        campBussinessDay: [],
        campTag: [],
        campRanking: [],
        campMap: [],
        areaInfo: [],
        areaImage: [],
        campRankingDetail: [],
        campGuide: [],
        // campImage: [
        //     { campId: 1, campPhotoId: 1, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, campPhotoId: 2, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, campPhotoId: 3, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, campPhotoId: 4, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, campPhotoId: 5, campPhoto: 'https://picsum.photos/id/237/300/200' },
        // ],
        // campInfo: [
        //     {
        //         campId: 1,
        //         campName: '喜洋洋露營區',
        //         cityName: '桃園市',
        //         campPhone: '04-22223333',
        //         campAltitude: 500,
        //         campAddress: '台中市北屯區皮卡路二段511號',
        //         campFacility: '麻將桌',
        //     }
        // ],
        // campBussinessDay: [
        //     { campId: 1, day: '星期五' },
        //     { campId: 1, day: '星期六' },
        //     { campId: 1, day: '星期日' },
        // ],
        // campTag: [
        //     { campId: 1, tagName: '近水源喔' },
        //     { campId: 1, tagName: '雲海雲' },
        //     { campId: 1, tagName: '雲海喔' },
        //     { campId: 1, tagName: '雲海海' }
        // ],
        // campRanking: [
        //     { campId: 1, ranking: 4.3, bathroomRanking: 4.3, transportRanking: 4.5, facilityRanking: 4.2, serviceRanking: 4.5, sceneryRanking: 4.1, count: 45 },
        // ],
        // campMap: [

        // ],
        // areaInfo: [
        //     { campId: 1, areaId: 1, areaName: 'A區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3000 },
        //     { campId: 1, areaId: 2, areaName: 'B區', areaStyle: '木棧板', areaLeft: 5, totalPrice: 3400 },
        //     { campId: 1, areaId: 3, areaName: 'C區', areaStyle: '木棧板', areaLeft: 14, totalPrice: 3800 },
        // ],
        // areaImage: [
        //     { campId: 1, areaId: 1, areaPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, areaId: 2, areaPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 1, areaId: 3, areaPhoto: 'https://picsum.photos/id/237/300/200' },
        // ],
        // campRankingDetail: [
        //     { campId: 1, orderRankingId: 1, rankingTime: '2020-10-10', rankingName: '小明', ranking: 4.5, rankingText: '這是一個不錯的霧營區' },
        //     { campId: 1, orderRankingId: 2, rankingTime: '2020-10-12', rankingName: '小滑', ranking: 4.4, rankingText: '這是一個不錯的霧營區2' },
        //     { campId: 1, orderRankingId: 3, rankingTime: '2020-10-13', rankingName: '小陳', ranking: 4.3, rankingText: '這是一個不錯的霧營區3' },
        //     { campId: 1, orderRankingId: 4, rankingTime: '2020-10-14', rankingName: '小王', ranking: 4.6, rankingText: '這是一個不錯的霧營區4' },
        // ],
        // campGuide: [
        //     { campId: 1, campGuide: "進退營區時間假日進場時間：上午10:00以後。/假日退場時間：下午14:00以前。 ★ 連續假期(三天以上) 三天兩夜以上連續假日之期間凡有營位銜接需要，敬請露友配合當日進退場時間。 例如：連續假日第一天進場時間為上午10:00 以後，第二天離場時間中午13:00前。 連續假日第二天進場時間為下午14:00後，最後一天離場時間為14:00前。 ★ 週五(或前一晚) 提前進場 (限隔日續住者) 17:00~22:00 可入營，酌收每帳半價(現場收費)，17:00前到場，以整日收費計算，請於23:00前搭營完成，避免打擾已就寢露友。請於露營日2天前電話聯絡0937-723539營主確認是否有營位。 ★★連續假日期間、星期六晚上不提供夜衝服務★★" }
        // ],
    })

    //讀取url query部分
    // let location = useLocation(); //上面有了
    let queryList = decodeURI(location.search).substring(1,).split("&").join('&');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchItems = async () => {
            const result = await axios(
                `http://localhost:5000/camps/api/camp/${campId}?${queryList}`,
            );
            await setIntroValue(result.data);
            console.log(result.data);
        }
        fetchItems();
    }, [location, queryList]);



    return (
        <React.Fragment>
            <SearchSearchBar
                place={place}
                setPlace={setPlace}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
                campAmount={campAmount}
                setCampAmount={setCampAmount}
                localeSetting={localeSetting}
                setSearchResultText={setSearchResultText}
            />
            <IntroduceScrollSpy />
            {/* ---MAIN--- */}
            <div className="container" >
                <IntroduceTitle
                    introValue={introValue}
                    favoriteCampList={favoriteCampList}
                    setFavoriteCampList={setFavoriteCampList}
                    loggedIn={loggedIn}
                    user={user}
                    campId={campId}
                    favorite={favorite}
                />
                <div className="mt-2" >
                    <div className="row d-flex modal-body-scroll" >
                        <div className="col-12 col-md-12 col-sm-12">
                            <section id="camp-overview-link" style={{ position: "absolute", top: "-66px", height: 800 }}></section>
                            <IntroduceIntroduce introValue={introValue} />
                            <IntroduceMap />
                        </div>
                    </div>
                    <div style={{ position: "relative", width: "100%" }}>
                        <section id="camp-order" style={{ position: "absolute", top: "-66px", height: 1000 }}></section>
                        <IntroduceChoose
                            introValue={introValue}
                            place={place}
                            setPlace={setPlace}
                            start={start}
                            setStart={setStart}
                            end={end}
                            setEnd={setEnd}
                            campAmount={campAmount}
                            setCampAmount={setCampAmount}
                            campId={campId}
                            localeSetting={localeSetting}
                            getDays={getDays}
                            searchCampAmount={searchCampAmount}
                            setSearchCampAmount={setSearchCampAmount}
                        />
                        <IntroduceChooseResult introValue={introValue} start={start} end={end} getDays={getDays} />
                        <IntroduceOrderLists
                            introValue={introValue}
                            start={start}
                            end={end}
                            campAmount={campAmount}
                            setCampAmount={setCampAmount}
                            getDays={getDays}
                            campId={campId}
                            setBrowserLocation={setBrowserLocation}
                            searchCampAmount={searchCampAmount}
                            setSearchCampAmount={setSearchCampAmount}
                        />
                    </div>
                </div>
                <IntroduceComments campRanking={introValue.campRanking} campRankingDetail={introValue.campRankingDetail} />
                <IntroduceNote campGuide={introValue.campGuide} />
                <IntroduceGoogleMap />
            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment >
    );
}


export default Introduce;