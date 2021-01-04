import React from 'react';

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

const IntroduceComment = (props) => {

    const { rankingName, rankingTime, rankingText, ranking } = props;
    return (
        <React.Fragment>
            <div className="col-6 my-2">
                <div className=" bg-light p-3 comment-border" style={{ backgroundColor: "" }}>
                    <div className="mb-1 d-flex justify-content-between">
                        <div>
                            <p className="mb-0 font-weight-bold">{rankingName} </p>
                            <span className="" style={{ color: "gray" }}>{rankingTime.substring(0, 10)}</span>
                        </div>
                        <div>
                            <span className="badge bagde-pill customer-ranking p-2" style={{ backgroundColor: "var(--darkColor)" }}>
                                <span style={{ fontSize: "1.2rem" }}>{(Math.round(ranking * 10) / 10).toFixed(1)}</span><span className="text-light "></span>
                            </span>
                        </div>
                    </div>
                    <p>{rankingText}</p>
                </div>
            </div>
        </React.Fragment >
    );
}


export default IntroduceComment;