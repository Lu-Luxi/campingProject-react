import React from 'react';

import SearchResultCamps from './SearchResultCamps';
import SearchFilter from './SearchFilter';

const SearchResult = (props) => {

    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, location, searchResultText, searchFilterTag, setSearchFilterTag, handleTagClick, loggedIn, user, favoriteCampList, setFavoriteCampList, page, setPage, countPerPage, setCountPerPage, maxPage, setMaxPage } = props;



    return (
        <React.Fragment>
            {/* <!-- 右欄 --> */}
            <div className="col-9">

                <SearchFilter
                    searchCount={props.searchValue.searchCount}
                    handleHotSorting={props.handleHotSorting}
                    handleRankingSorting={props.handleRankingSorting}
                    handlePriceSorting={props.handlePriceSorting}
                    searchResultText={searchResultText}
                    searchFilterTag={searchFilterTag}
                    setSearchFilterTag={setSearchFilterTag}
                    handleTagClick={handleTagClick}
                />

                <SearchResultCamps
                    place={place}
                    setPlace={setPlace}
                    start={start}
                    setStart={setStart}
                    end={end}
                    setEnd={setEnd}
                    campAmount={campAmount}
                    setCampAmount={setCampAmount}
                    searchValue={props.searchValue}
                    location={location}
                    searchFilterTag={searchFilterTag}
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
        </React.Fragment>
    );
}


export default SearchResult;