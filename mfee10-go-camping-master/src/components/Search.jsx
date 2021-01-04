import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchSearchBar from './SearchSearchBar';
import SearchSideBar from './SearchSideBar';
import SearchResult from './SearchResult';
import { Link, useLocation } from 'react-router-dom';
const Search = (props) => {
    // console.log(window.location.href);
    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, searchFilterTag, setSearchFilterTag, handleTagClick, loggedIn, user, favoriteCampList, setFavoriteCampList, browserLocation, setBrowserLocation, searchResultText, setSearchResultText } = props;
    setBrowserLocation(useLocation());
    //換頁用參數
    const [page, setPage] = useState(0);
    const [countPerPage, setCountPerPage] = useState(8);


    const [searchValue, setSearchValue] = useState({
        searchCount: 0,
        searchCamp: [],
        searchCampTag: [],
        searchCampRanking: [],
        searchCampPhoto: [],
        // filterLocation: [1, 2],
        // filterTag: [2, 3],
        // filterPrice: [0, 9999],
        // filterRanking: 1,

        // searchCount: 40,

        // searchCamp: [
        //     { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', minTotalPrice: 1200 },
        //     { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', minTotalPrice: 1300 },
        //     { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', minTotalPrice: 1400 },
        //     { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', minTotalPrice: 1500 },
        //     { campId: 5, campName: '灰太狼露營區', cityName: '桃園市', minTotalPrice: 1100 },
        //     { campId: 6, campName: '海綿寶寶露營區', cityName: '桃園市', minTotalPrice: 1600 },
        // ],
        // searchCampTag: [
        //     { campId: 1, tagName: '近水源喔' },
        //     { campId: 1, tagName: '雲海雲' },
        //     { campId: 1, tagName: '雲海喔' },
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
        //     { campId: 5, tagName: '雲海雲' },
        //     { campId: 5, tagName: '雲海喔' },
        //     { campId: 5, tagName: '雲海海' },
        //     { campId: 5, tagName: '近水源喔' },
        //     { campId: 6, tagName: '雲海雲' },
        //     { campId: 6, tagName: '雲海喔' },
        //     { campId: 6, tagName: '雲海海' },
        //     { campId: 6, tagName: '近水源喔' },
        // ],
        // searchCampRanking: [
        //     { campId: 1, ranking: 4.3, count: 45 },
        //     { campId: 2, ranking: 4.7, count: 200 },
        //     { campId: 3, ranking: 4.8, count: 150 },
        //     { campId: 4, ranking: 4.4, count: 125 },
        //     { campId: 5, ranking: 4.1, count: 25 },
        //     { campId: 6, ranking: 4.5, count: 35 },
        // ],
        // searchCampPhoto: [
        //     { campId: 1, campPhotoId: 1, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 2, campPhotoId: 6, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 3, campPhotoId: 11, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 4, campPhotoId: 16, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 5, campPhotoId: 21, campPhoto: 'https://picsum.photos/id/237/300/200' },
        //     { campId: 6, campPhotoId: 26, campPhoto: 'https://picsum.photos/id/237/300/200' },
        // ]
    })

    const [maxPage, setMaxPage] = useState(1);

    //按下熱門排行(按照訂單數量)
    const handleHotSorting = () => {
        setPage(0);
        let newList = searchValue.searchCamp.sort(function (a, b) {
            var keyA = a.count,
                keyB = b.count;
            // Compare 2 orderCount
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        setSearchValue({ ...searchValue, searchCamp: newList })
        console.log(searchValue.searchCamp);
    }

    //按下營友評價
    const handleRankingSorting = () => {
        setPage(0);
        let newList = searchValue.searchCamp.sort(function (a, b) {
            var keyA = a.ranking,
                keyB = b.ranking;
            // Compare 2 orderCount
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        setSearchValue({ ...searchValue, searchCamp: newList })
        console.log(searchValue.searchCamp);
    }

    //按下價格低至高
    const handlePriceSorting = () => {
        setPage(0);
        let newList = searchValue.searchCamp.sort(function (a, b) {
            var keyA = a.minTotalPrice,
                keyB = b.minTotalPrice;
            // Compare 2 orderCount
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        setSearchValue({ ...searchValue, searchCamp: newList })
        console.log(searchValue.searchCamp);
    }

    //讀取url query部分 並將內容存入queryObj

    let location = useLocation();
    let queryList = decodeURI(location.search).substring(1,).split("&").join('&');
    // console.log(queryList);
    // let queryObj = {};
    // queryList.map((item) => { return queryObj[item.split("=")[0]] = (item.split("=").length === 2) ? item.split("=")[1] : '' })

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchItems = async () => {
            const result = await axios(
                `http://localhost:5000/search/api/tag?${queryList}`,
            );
            await setSearchValue(result.data);
            console.log(result.data);
            if (loggedIn) {
                console.log('in');
                const favorite = await axios(`http://localhost:5000/account/api/wish/campId/${user.MemberId}`,);
                await setFavoriteCampList(favorite.data.favoriteId.map((item, index) => item.campId));
            } else {
                console.log('out');
                await setFavoriteCampList([]);
            }
        }
        fetchItems();
    }, [queryList, loggedIn]);


    console.log(favoriteCampList)
    // console.log(searchValue);
    console.log(browserLocation);

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
                searchFilterTag={searchFilterTag}
            />
            <div className="container mt-3" style={{ paddingTop: 66 }}>
                <p className="font-weight-bold" style={{ color: 'var(--priceColor)' }}>
                    <Link to="/" className="font-weight-bold" style={{ color: 'var(--priceColor)' }}>
                        首頁&nbsp;&nbsp;
                    </Link>
                    <span className="text-dark">&gt;</span>
                     &nbsp;&nbsp;
                     <span>{searchResultText}</span>
                </p>
                <div className="row ">
                    <SearchSideBar
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        setSearchResultText={setSearchResultText}
                        setSearchFilterTag={setSearchFilterTag}
                        handleTagClick={handleTagClick}
                    />
                    <SearchResult
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        searchValue={searchValue}
                        handleHotSorting={handleHotSorting}
                        handleRankingSorting={handleRankingSorting}
                        handlePriceSorting={handlePriceSorting}
                        location={location}
                        searchResultText={searchResultText}
                        searchFilterTag={searchFilterTag}
                        setSearchFilterTag={setSearchFilterTag}
                        handleTagClick={handleTagClick}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        loggedIn={loggedIn}
                        user={user}
                        page={page}
                        setPage={setPage}
                        countPerPage={countPerPage}
                        setCountPerPage={setCountPerPage}
                        maxPage={maxPage}
                        setMaxPage={setMaxPage}
                    />
                </div>
            </div>
            {/* <!-- container結束 --> */}
        </React.Fragment >
    );
}


export default Search;