import React from 'react';
import HotCamp from './HotCamp';

const HotCamps = (props) => {
    const { hotCamp, hotCampRanking, hotCampTag, hotCampPhoto } = props.initValue;
    const { setPlace, start, end, campAmount, favoriteCampList, setFavoriteCampList, loggedIn, user } = props;
    console.log(favoriteCampList);
    return (
        <React.Fragment>
            {/* <!-- 分類名稱 --> */}
            <div className="row">
                <div className="col ">
                    <h3 className="font-weight-bolder text-center m-5 m-letterSpH3">熱門營區</h3>
                </div>
            </div>

            {/* <!-- 該分類card模板 --> */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">
                {hotCamp.map((item) => {
                    let newRanking = (!!hotCampRanking.length ? hotCampRanking.filter(e => e.campId === item.campId) : [{ ranking: 0, count: 0 }]);
                    let newTag = hotCampTag.filter(e => e.campId === item.campId);
                    let campPhoto = (!!hotCampRanking.length ? hotCampPhoto.filter(e => e.campId === item.campId) : [{ campPhoto: 'https://picsum.photos/id/128/300/200' }]);
                    let favorite = favoriteCampList.includes(item.campId);
                    // console.log('favorite:' + favorite);
                    // console.log(item.campId)
                    return <HotCamp
                        key={item.campId}
                        campName={item.campName}
                        campId={item.campId}
                        cityName={item.cityName}
                        areaPrice={item.areaPrice}
                        ranking={newRanking[0].ranking}
                        count={newRanking[0].count}
                        campTag={newTag}
                        campPhoto={campPhoto[0]}
                        setPlace={setPlace}
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        favorite={favorite}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        loggedIn={loggedIn}
                        user={user}
                    />
                })}
            </div>
            {/* <!-- 該分類card模板結束 --> */}
        </React.Fragment>
    );
}


export default HotCamps;