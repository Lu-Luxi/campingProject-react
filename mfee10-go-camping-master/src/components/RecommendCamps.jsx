import React from 'react';
import RecommendCamp from './RecommendCamp';

const RecommendCamps = (props) => {
    const { recommendedCamp, recommendedCampRanking, recommendedCampTag, recommendedCampPhoto } = props.initValue;
    const { setPlace, start, end, campAmount, favoriteCampList, setFavoriteCampList, loggedIn, user } = props;

    return (
        <React.Fragment>
            {/* <!-- 下一個分類title --> */}
            <div className="row" >
                <div className="col">
                    <h3 className="font-weight-bolder text-center m-5 m-letterSpH3">推薦營區</h3>
                </div>
            </div >

            {/* <!-- 分類card模板 --> */}
            < div className="row row-cols-1 row-cols-md-2 row-cols-lg-4" >
                {recommendedCamp.map((item) => {
                    let newRanking = recommendedCampRanking.filter(e => e.campId === item.campId);
                    let newTag = recommendedCampTag.filter(e => e.campId === item.campId);
                    let campPhoto = (!!recommendedCampPhoto ? recommendedCampPhoto.filter(e => e.campId === item.campId) : [{ campPhoto: 'https://picsum.photos/id/128/300/200' }]);
                    // let campPhoto = (!!hotCampRanking.length ? hotCampPhoto.filter(e => e.campId === item.campId) : [{ campPhoto: 'https://picsum.photos/id/128/300/200' }]);
                    let favorite = favoriteCampList.includes(item.campId);
                    return <RecommendCamp
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
            </div >
            {/* <!-- 該分類card模板結束 --> */}
        </React.Fragment>
    );
}


export default RecommendCamps;