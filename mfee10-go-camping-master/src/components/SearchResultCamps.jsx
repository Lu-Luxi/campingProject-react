import React, { useState } from 'react';

import SearchResultCamp from './SearchResultCamp';
import SearchResultCampPage from './SearchResultCampPage';

const SearchResultCamps = (props) => {
    const { searchCamp, searchCampRanking, searchCampTag, searchCount, searchCampPhoto, searchFilterTag } = props.searchValue;
    const { favoriteCampList, setFavoriteCampList, loggedIn, user, page, setPage, countPerPage, setCountPerPage, maxPage, setMaxPage } = props;
    //第一頁page: 0
    // const [page, setPage] = useState(0);
    // const [countPerPage, setCountPerPage] = useState(8);

    // console.log(favoriteCampList);
    // console.log(searchCampTag);
    // console.log(searchCamp);
    return (
        <React.Fragment>
            {/* <!-- 卡片的家 --> */}
            <div className="mb-2 ">
                {
                    searchCamp.slice(page * countPerPage, (page + 1) * countPerPage).map((item, index) => {
                        let newRanking = searchCampRanking.filter(e => e.campId === item.campId);
                        let newTag = searchCampTag.filter(e => e.campId === item.campId);
                        let campPhoto = searchCampPhoto.filter(e => e.campId === item.campId);
                        let favorite = favoriteCampList.includes(item.campId);
                        return (
                            <SearchResultCamp
                                start={props.start}
                                end={props.end}
                                campAmount={props.campAmount}
                                key={item.campId}
                                campName={item.campName}
                                cityName={item.cityName}
                                minTotalPrice={item.minTotalPrice}
                                ranking={newRanking[0].ranking}
                                count={newRanking[0].count}
                                campTag={newTag}
                                campId={item.campId}
                                campPhoto={campPhoto}
                                favorite={favorite}
                                favoriteCampList={favoriteCampList}
                                setFavoriteCampList={setFavoriteCampList}
                                loggedIn={loggedIn}
                                user={user}
                            />
                        )
                    })
                }

                <SearchResultCampPage
                    searchCount={searchCount}
                    page={page}
                    setPage={setPage}
                    countPerPage={countPerPage}
                    maxPage={maxPage}
                    setMaxPage={setMaxPage}
                />
            </div>
        </React.Fragment>
    );

}

export default SearchResultCamps;