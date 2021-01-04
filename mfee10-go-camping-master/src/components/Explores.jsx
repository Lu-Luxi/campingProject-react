import React from 'react';
import Explore from './Explore';

const Explores = (props) => {
    const { explore } = props.initValue;
    const { place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, setSearchResultText } = props;
    return (
        <React.Fragment>
            {/* <!-- 分類名稱 --> */}
            <div className="row">
                <div className="col ">
                    <h3 className="font-weight-bolder text-center m-5 m-letterSpH3 ">營區探索</h3>
                </div>
            </div>

            {/* <!-- 該分類card模板 --> */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 ">
                {explore.map((item, index) => {
                    return (<Explore
                        key={index}
                        cityName={item.cityName}
                        campCount={item.campCount}
                        initValue={props.initValue}
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        cityPhoto={item.cityPhoto}
                        setSearchResultText={setSearchResultText}
                    />)
                }
                )}
            </div>
            {/* <!-- 該分類card模板結束 --> */}
        </React.Fragment>
    );
}


export default Explores;