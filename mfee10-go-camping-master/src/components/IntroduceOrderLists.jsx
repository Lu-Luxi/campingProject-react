import React from 'react';
import IntroduceOrderList from './IntroduceOrderList';


import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

// import MemberSideBar from './MemberSideBar';
// import MemberTrip from './MemberTrips';


const IntroduceOrderLists = (props) => {

    const { areaInfo, areaImage } = props.introValue;
    const { setBrowserLocation, searchCampAmount, setSearchCampAmount } = props;
    console.log(areaImage)
    return (
        <React.Fragment>
            {/* <!-- 區域選擇 --> */}
            <div className="camp-area-wrapper">
                {!!areaInfo ? areaInfo.map((item, index) => {
                    let areaPhoto = areaImage.filter((e) => e.areaId === item.areaId) || null;
                    return <IntroduceOrderList
                        key={index}
                        areaId={item.areaId}
                        areaName={item.areaName}
                        areaStyle={item.areaStyle}
                        areaLeft={item.areaLeft}
                        totalPrice={item.totalPrice}
                        start={props.start}
                        end={props.end}
                        campAmount={props.campAmount}
                        setCampAmount={props.setCampAmount}
                        getDays={props.getDays}
                        campId={props.campId}
                        setBrowserLocation={setBrowserLocation}
                        searchCampAmount={searchCampAmount}
                        setSearchCampAmount={setSearchCampAmount}

                        areaPhoto={
                            areaPhoto[0] === undefined ? [] : areaPhoto[0].areaPhoto
                        }
                    />
                }) : null}
            </div>
            {/* ＡＢＣ區結束 */}
        </React.Fragment >
    );
}


export default IntroduceOrderLists;