import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

const SearchFilter = (props) => {

    const { searchResultText, searchFilterTag, setSearchFilterTag, handleTagClick } = props;
    console.log(searchFilterTag);
    return (
        <React.Fragment>
            <div className="bg-white mb-3 px-3 rounded cardShadow">
                <div className="m-0">
                    <h5 className="font-weight-bolder" style={{ letterSpacing: 0.5 }}>
                        找到
                        <span style={{ color: 'var(--priceColor)' }}> {props.searchCount} </span>
                        個符合<span style={{ color: 'var(--priceColor)' }}>{searchResultText}</span>的露營區
                        </h5>
                    <div className="d-flex" style={{ height: 40 }}>
                        <span className="mt-2">已篩選：</span>
                        {searchFilterTag.map((item, index) => <button key={index} type="button" className="m-searchTag3 rounded" onClick={handleTagClick}>{item}</button>)}
                    </div>
                </div>
                <hr className="my-2" />
                <div className="pb-3 text-dark ">
                    排序&nbsp;:&nbsp;&nbsp;
                        <span className="m-sortText" onClick={props.handleHotSorting} >
                        <FontAwesomeIcon icon={faHotjar} className="mr-1" />
                            熱門程度
                        </span>｜
                        <span className="m-sortText" >
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                            營區推薦
                        </span>｜
                        <span className="m-sortText" onClick={props.handleRankingSorting} >
                        <FontAwesomeIcon icon={faStar} className="mr-1" />
                            營友評價
                        </span>｜
                        <span className="m-sortText" onClick={props.handlePriceSorting} >
                        <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                            價格:低至高
                        </span>
                </div>
            </div>
        </React.Fragment>
    );
}


export default SearchFilter;