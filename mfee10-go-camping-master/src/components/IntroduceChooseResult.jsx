import React from 'react';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceChooseResult = (props) => {
    const { start, end, introValue, getDays } = props;
    return (
        <React.Fragment>
            {/* <!-- 顯示選擇營區與時間 --> */}
            {/* <div className="card mt-2 border-0 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title">在 <span>{introValue.campInfo[0].campName}</span> 住 <span>{getDays(start, end)}</span> 晚</h3>
                    <span>{start} - {end}</span>
                </div>
            </div> */}
            <div className="card mt-0 border-0 shadow-sm mt-2">
                <div className="card-body" >
                    <h3 className="card-title font-weight-bold">
                        營區預定
                </h3>
                    <h5 className="card-title mb-0">
                        已選擇 在<span className="font-weight-bold" style={{ color: "var(--priceColor)" }}>九號森林露營區</span>
                        住<span className="font-weight-bold" style={{ color: "var(--priceColor)" }}>2</span>晚,日期
                        <span className="font-weight-bold" style={{ color: "var(--priceColor)" }}>2020年10月29日-2020年10月31日</span>
                    </h5>
                    {/* <h5>&nbsp;<span className="font-weight-bold">2020年10月29日 - 2020年10月31日</span></h5> */}
                </div>
            </div>
        </React.Fragment >
    );
}


export default IntroduceChooseResult;