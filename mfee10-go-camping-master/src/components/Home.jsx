import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Explores from './Explores';
import RecommandCamps from './RecommendCamps';
import HotCamps from './HotCamps';
import { useLocation } from 'react-router-dom';

// expolre圖片
// import exploreImg01 from '../img/exploreImg01.jpg';
// import expolreImg02 from '../img/exploreImg02.jpg';
// import expolreImg03 from '../img/exploreImg03.jpg';
// import expolreImg04 from '../img/exploreImg04.jpg';
// import expolreImg05 from '../img/exploreImg05.jpg';
const Home = (props) => {

    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, searchFilterTag, loggedIn, user, favoriteCampList, setFavoriteCampList, setBrowserLocation, searchResultText, setSearchResultText } = props;
    setBrowserLocation(useLocation());
    console.log(`login: ${loggedIn}`);
    console.log(`user: ${user.MemberId}`);
    console.log(favoriteCampList);
    const [initValue, setInitValue] = useState({
        explore: [
            { cityName: '新竹縣', campCount: 38 },
            { cityName: '南投縣', campCount: 54 },
            { cityName: '苗栗縣', campCount: 27 },
            { cityName: '宜蘭縣', campCount: 18 },
            { cityName: '桃園市', campCount: 62 },
        ],
        cityImg: [],
        hotCamp: [
            { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
            { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
            { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
            { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
        ],
        hotCampTag: [
            { campId: 1, tagName: '近水源喔' },
            { campId: 1, tagName: '雲海雲' },
            { campId: 1, tagName: '雲海喔' },
            { campId: 1, tagName: '雲海海' },
            { campId: 2, tagName: '雲海雲' },
            { campId: 2, tagName: '近水源喔' },
            { campId: 2, tagName: '雲海喔' },
            { campId: 2, tagName: '雲海海' },
            { campId: 3, tagName: '雲海雲' },
            { campId: 3, tagName: '雲海喔' },
            { campId: 3, tagName: '近水源喔' },
            { campId: 3, tagName: '雲海海' },
            { campId: 4, tagName: '雲海雲' },
            { campId: 4, tagName: '雲海喔' },
            { campId: 4, tagName: '雲海海' },
            { campId: 4, tagName: '近水源喔' },
        ],
        hotCampRanking: [
            { campId: 1, ranking: 4.3, count: 45 },
            { campId: 2, ranking: 4.7, count: 200 },
            { campId: 3, ranking: 4.8, count: 150 },
            { campId: 4, ranking: 4.4, count: 125 },
        ],
        hotCampPhoto: [
            {
                campId: 1,
                campPhoto: "https://picsum.photos/id/128/300/200",
            },
            {
                campId: 2,
                campPhoto: "https://picsum.photos/id/128/300/200",
            },
            {
                campId: 3,
                campPhoto: "https://picsum.photos/id/128/300/200",
            },
            {
                campId: 4,
                campPhoto: "https://picsum.photos/id/128/300/200",
            },
        ],
        recommendedCamp: [
            { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
            { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
            { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
            { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
        ],
        recommendedCampTag: [
            { campId: 1, tagName: '近水源喔' },
            { campId: 1, tagName: '雲海雲' },
            { campId: 1, tagName: '雲海喔' },
            { campId: 1, tagName: '雲海海' },
            { campId: 2, tagName: '雲海雲' },
            { campId: 2, tagName: '近水源喔' },
            { campId: 2, tagName: '雲海喔' },
            { campId: 2, tagName: '雲海海' },
            { campId: 3, tagName: '雲海雲' },
            { campId: 3, tagName: '雲海喔' },
            { campId: 3, tagName: '近水源喔' },
            { campId: 3, tagName: '雲海海' },
            { campId: 4, tagName: '雲海雲' },
            { campId: 4, tagName: '雲海喔' },
            { campId: 4, tagName: '雲海海' },
            { campId: 4, tagName: '近水源喔' },
        ],
        recommendedCampRanking: [
            { campId: 1, ranking: 4.3, count: 45 },
            { campId: 2, ranking: 4.7, count: 200 },
            { campId: 3, ranking: 4.8, count: 150 },
            { campId: 4, ranking: 4.4, count: 125 },
        ]
    })


    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                'http://localhost:5000/api',
            );
            await setInitValue(result.data);
            if (loggedIn) {
                const favorite = await axios(`http://localhost:5000/account/api/wish/campId/${user.MemberId}`,);
                await setFavoriteCampList(favorite.data.favoriteId.map((item, index) => item.campId));
                // console.log(favorite.data);
            } else {
                console.log('out');
                setFavoriteCampList([]);
            }
        }
        fetchItems();
    }, [loggedIn, setFavoriteCampList, user.MemberId]);




    console.log(favoriteCampList);


    return (
        <React.Fragment>
            <SearchBar
                place={place}
                setPlace={setPlace}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
                campAmount={campAmount}
                setCampAmount={setCampAmount}
                localeSetting={localeSetting}
                searchFilterTag={searchFilterTag}
                searchResultText={searchResultText}
                setSearchResultText={setSearchResultText}
            />
            {/* <!-- 卡片區塊 --> */}
            <div className="container">
                {/* 營區探索 */}
                <Explores
                    initValue={initValue}
                    place={place}
                    setPlace={setPlace}
                    start={start}
                    setStart={setStart}
                    end={end}
                    setEnd={setEnd}
                    campAmount={campAmount}
                    setCampAmount={setCampAmount}
                    searchResultText={searchResultText}
                    setSearchResultText={setSearchResultText}
                // campImg={campImg}
                />
                {/* 熱門營區 */}
                <HotCamps
                    initValue={initValue}
                    setPlace={setPlace}
                    start={start}
                    end={end}
                    campAmount={campAmount}
                    favoriteCampList={favoriteCampList}
                    setFavoriteCampList={setFavoriteCampList}
                    loggedIn={loggedIn}
                    user={user}
                />
                {/* 推薦營區 */}
                <RecommandCamps
                    initValue={initValue}
                    setPlace={setPlace}
                    start={start}
                    end={end}
                    campAmount={campAmount}
                    favoriteCampList={favoriteCampList}
                    setFavoriteCampList={setFavoriteCampList}
                    loggedIn={loggedIn}
                    user={user}
                />
            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment>
    );
}

export default Home;