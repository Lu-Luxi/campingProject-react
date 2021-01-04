import React from 'react';
import { Link } from 'react-router-dom';

const SearchSideBar = (props) => {
    const { place, setPlace, start, end, campAmount, setSearchResultText, handleTagClick, searchFilterTag, setSearchFilterTag } = props;
    return (
        <React.Fragment>
            {/* <!-- 左欄 --> */}
            <div className="col-3 ">

                <div className="bg-white mb-2 p-4 mg-0 rounded cardShadow" >
                    <p className="mb-2 font-weight-bold " style={{ fontSize: 18, letterSpacing: 1 }}>營區位置</p>
                    {/* <hr className="m-0" /> */}
                    {/* <!-- 營區分類標籤 --> */}
                    <form action="#" className="tag my-2">
                        {/* <p className="my-1">北部</p>
                        <button type="button" className=" m-searchTag2">新北</button>
                        <button type="button" className=" m-searchTag2">桃園</button>
                        <button type="button" className=" m-searchTag2">新竹</button>
                        <p className="my-1">中部</p>
                        <button type="button" className=" m-searchTag2">台中</button>
                        <button type="button" className=" m-searchTag2">苗栗</button>
                        <button type="button" className=" m-searchTag2">南投</button>
                        <p className="my-1">南部</p>
                        <button type="button" className=" m-searchTag2">嘉義</button>
                        <button type="button" className=" m-searchTag2">高雄</button>
                        <button type="button" className=" m-searchTag2">屏東</button>
                        <p className="my-1">東部</p>
                        <button type="button" className=" m-searchTag2">宜蘭</button>
                        <button type="button" className=" m-searchTag2">花蓮</button>
                        <button type="button" className=" m-searchTag2">台中</button> */}
                        <p className="my-1">北部</p>
                        <Link className="text-decoration-none" onClick={() => { setPlace('新北'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">新&nbsp;北</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('桃園'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">桃&nbsp;園</button>
                        </Link>
                        {/* <Link to={`/search?place=新竹&start=${start}&end=${end}&campAmount=${campAmount}`} className="text-decoration-none" onClick={() => { setPlace('新竹'); setSearchResultText('新竹'); setSearchFilterTag([]) }} > */}
                        <Link className="text-decoration-none" onClick={() => { setPlace('新竹'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">新&nbsp;竹</button>
                        </Link>
                        <p className="my-1">中部</p>
                        <Link className="text-decoration-none" onClick={() => { setPlace('苗栗'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">苗&nbsp;栗</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('台中'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">台&nbsp;中</button>
                        </Link>
                        {/* <Link to={`/search?place=南投&start=${start}&end=${end}&campAmount=${campAmount}&tags=${searchFilterTag ? searchFilterTag : ''}`} className="text-decoration-none" onClick={() => { setPlace('南投'); setSearchResultText('南投'); setSearchFilterTag([]) }} > */}
                        <Link className="text-decoration-none" onClick={() => { setPlace('南投'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">南&nbsp;投</button>
                        </Link>
                        <p className="my-1">南部</p>
                        <Link className="text-decoration-none" onClick={() => { setPlace('嘉義'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">嘉&nbsp;義</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('高雄'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">高&nbsp;雄</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('屏東'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">屏&nbsp;東</button>
                        </Link>
                        <p className="my-1">東部</p>
                        <Link className="text-decoration-none" onClick={() => { setPlace('宜蘭'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">宜&nbsp;蘭</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('花蓮'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">花&nbsp;蓮</button>
                        </Link>
                        <Link className="text-decoration-none" onClick={() => { setPlace('台東'); setSearchFilterTag([]) }} >
                            <button type="button" className="m-searchTag2">台&nbsp;東</button>
                        </Link>
                    </form>
                </div>

                <div className="bg-white mb-2 p-4 rounded cardShadow">
                    <p className="font-weight-bolder mb-2 ml-1" style={{ fontSize: 18, letterSpacing: 1 }}>營區特色</p>
                    {/* <hr className="m-0" /> */}
                    {/* <!-- 營區分類標籤 --> */}
                    <div className="tag my-2">
                        {/* <Link to={{ pathname: "/search", search: `?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}&tags=` }} > */}
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="0">不拘</button>
                        {/* </Link> */}
                        {/* <Link to={{ pathname: "/search", search: `?place=${place}&start=${start}&end=${end}&campAmount=${campAmount}&tags=${searchFilterTag ? searchFilterTag : ''}` }} onClick={handleTagClick} > */}
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="1">夜景佳</button>
                        {/* </Link> */}
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="2">大草皮</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="3">螢火蟲</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="5">雲海</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="6">賞楓</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="7">近溪流</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="8">櫻花季</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="9">登山步道</button>
                        <button type="button" className="rounded m-searchTag3" onClick={handleTagClick} value="10">靠海邊</button>
                    </div>
                </div>

                {/* <div className="bg-white mb-2 p-4 rounded cardShadow">
                    <p className="mb-2 font-weight-bolder"></p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="formControlRange" className="font-weight-bolder mb-2" style={{ fontSize: 18, letterSpacing: 1 }}>價格(每晚)</label>
                            <input type="range" className="form-control-range my-2" id="formControlRange" />
                        </div>
                    </form>
                </div> */}

                <div className="bg-white mb-2 p-4 rounded cardShadow">
                    <form>
                        <div className="form-group">
                            <p className="mb-2 font-weight-bolder" style={{ fontSize: 18, letterSpacing: 1 }}>營區評價</p>
                            {/* <hr className="m-0 mb-2" /> */}
                            <button type="button" className="m-searchTag4 ">3+</button>
                            <button type="button" className="m-searchTag4 ">3.5+</button>
                            <button type="button" className="m-searchTag4 ">4+</button>
                            <button type="button" className="m-searchTag4 ">4.5+</button>
                        </div>
                    </form>
                </div>

            </div>
        </React.Fragment>
    );
}


export default SearchSideBar;