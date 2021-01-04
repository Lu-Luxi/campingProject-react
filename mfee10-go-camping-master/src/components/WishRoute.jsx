import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wishs from './Wishs';
import WishLists from './WishLists';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const WishRoute = (props) => {

    const { loggedIn, user, favoriteCampList, setFavoriteCampList, place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting } = props;


    //給 Wishes 的資料 
    const [cityList, setCityList] = useState({
        lists: [
            // { cityName: '新竹縣', campCount: 1, cityId: 3 },
            // { cityName: '南投縣', campCount: 2, cityId: 4 },
            // { cityName: '苗栗縣', campCount: 3, cityId: 2 },
            // { cityName: '宜蘭縣', campCount: 2, cityId: 3 },
            // { cityName: '桃園市', campCount: 4, cityId: 1 },
        ]
    });

    const [favoriteCamp, setFavoriteCamp] = useState(
        {
            // lists: [
            //     { cityName: '新竹縣', campCount: 1, cityId: 3 },
            //     { cityName: '南投縣', campCount: 2, cityId: 4 },
            //     { cityName: '苗栗縣', campCount: 3, cityId: 2 },
            //     { cityName: '宜蘭縣', campCount: 2, cityId: 3 },
            //     { cityName: '桃園市', campCount: 4, cityId: 1 },
            // ],
            // wishCamp: [
            //     { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
            //     { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
            //     { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
            //     { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
            // ],
            // wishCampPhoto: [
            //     { campId: 1, campPhoto: 'https://picsum.photos/id/128/300/200' },
            //     { campId: 2, campPhoto: 'https://picsum.photos/id/128/300/200' },
            //     { campId: 3, campPhoto: 'https://picsum.photos/id/128/300/200' },
            //     { campId: 4, campPhoto: 'https://picsum.photos/id/128/300/200' },
            // ],
            // wishCampTag: [
            //     { campId: 1, tagName: '近水源喔' },
            //     { campId: 1, tagName: '雲海雲' },
            //     { campId: 1, tagName: '雲幹喔' },
            //     { campId: 1, tagName: '雲海海' },
            //     { campId: 2, tagName: '雲海雲' },
            //     { campId: 2, tagName: '近水源喔' },
            //     { campId: 2, tagName: '雲海喔' },
            //     { campId: 2, tagName: '雲海海' },
            //     { campId: 3, tagName: '雲海雲' },
            //     { campId: 3, tagName: '雲海喔' },
            //     { campId: 3, tagName: '近水源喔' },
            //     { campId: 3, tagName: '雲海海' },
            //     { campId: 4, tagName: '雲海雲' },
            //     { campId: 4, tagName: '雲海喔' },
            //     { campId: 4, tagName: '雲海海' },
            //     { campId: 4, tagName: '近水源喔' },
            // ],
            // wishCampRanking: [
            //     { campId: 1, ranking: 4.3, count: 45 },
            //     { campId: 2, ranking: 4.7, count: 200 },
            //     { campId: 3, ranking: 4.8, count: 150 },
            //     { campId: 4, ranking: 4.4, count: 125 },
            // ],
        }
    )

    useEffect(() => {
        const fetchItems = async () => {
            const favorite = await axios(`http://localhost:5000/account/api/wish/${user.MemberId}?start=${start}&end=${end}&campAmount=${campAmount}`,);
            await setCityList(favorite.data);
            await setFavoriteCamp(favorite.data);
            // console.log(cityList);
            // await setCityList(favorite.data.favoriteId.map((item, index) => item.campId));
        }
        fetchItems();
    }, [user.MemberId, setCityList, start, end, campAmount]);

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/wish">
                    <Wishs
                        cityList={cityList}
                        setCityList={setCityList}
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        user={user}
                        setFavoriteCamp={setFavoriteCamp}
                    />
                </Route>
                {/* <Route path="/wish/list/:cityId"> */}
                <Route path="/wish/list">
                    <WishLists
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        loggedIn={loggedIn}
                        user={user}
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        localeSetting={localeSetting}
                        favoriteCamp={favoriteCamp}
                    />
                </Route>
            </Switch>
        </React.Fragment>
    );
}


export default WishRoute;