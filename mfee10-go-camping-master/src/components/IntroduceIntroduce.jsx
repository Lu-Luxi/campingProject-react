import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/base.css';
import '../css/index.css';
import '../css/camp_intro.css';

import { faFacebookSquare, faLine } from '@fortawesome/free-brands-svg-icons';

const IntroduceIntroduce = (props) => {
    const { campInfo, campBussinessDay, campTag } = props.introValue;
    // console.log(campInfo[0].campPhone);
    return (
        <React.Fragment>
            {/* <!-- 營區介紹  --> */}
            <div id="camp-introduction" className="card border-0">
                <div className="card-body pt-4 pb-0">
                    <h3 className="card-title font-weight-bold">營區介紹</h3>
                    <div className="row">
                        {/* <!-- 左 --> */}
                        <div className="col-6">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "25%" }} className="px-0 border-top-0">
                                            <span>營區地址</span>
                                        </th>
                                        <td style={{ width: "75%" }} className=" border-top-0">
                                            <span>{!!campInfo[0] ? campInfo[0].campAddress : null}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className=" px-0">營區電話</th>
                                        <td>
                                            <span>{!!campInfo[0] ? campInfo[0].campPhone : null}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-0">營業時間</th>
                                        <td >
                                            <span>{!!campBussinessDay ? campBussinessDay.map((item) => item.day).join(', ') : null}</span>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th className="px-0">停車方式</th>
                                        <td>
                                            <span>{campInfo[0].campParking}</span>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        {/* <!-- 右 --> */}
                        <div className="col-6">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "25%" }} className="px-0 border-top-0">
                                            <span>營區特色</span>
                                        </th>
                                        <td style={{ width: "75%" }} className=" border-top-0">
                                            <div className="tag-wrapper">
                                                {!!campTag ? campTag.map((item, index) => <span key={index} className="m-tagStyle rounded mr-1">{item.tagName}</span>) : null}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-0">海拔高度</th>
                                        <td>
                                            <span>{!!campInfo[0] ? campInfo[0].campAltitude : null}公尺</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-0">相關設施</th>
                                        <td>
                                            公共冰箱
                                            <span>{!!campInfo[0] ? campInfo[0].campFacility : null}</span>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th className="px-0">無線通訊</th>
                                        <td>
                                            <span>{campInfo[0].campSignal}</span>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="card-body text-right pt-0">
                    <span href="#" className="">聯絡營主</span>
                    <a href="#" className="mr-1">
                        <FontAwesomeIcon icon={faFacebookSquare} className="mx-1" style={{ fontSize: 30 }} color="#4267b2" />
    </a>
                    <a href="#" className="mr-1">
                        <FontAwesomeIcon icon={faLine} style={{ fontSize: 30 }} color="#00c300" />
    </a>
                    {/* <a href="#" className="mr-1">
                        <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 30 }} color="#00c300" />
    </a> */}
                </div>
            </div>

        </React.Fragment >
    );
}


export default IntroduceIntroduce;