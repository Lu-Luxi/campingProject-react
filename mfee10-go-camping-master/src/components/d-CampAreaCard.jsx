import React, { useEffect, useState } from 'react';
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import campMap from '../img/campMap.svg'
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";


const CampAreaCard = (props) => {
    const { areaId, areaName, weekdayPrice, weekendPrice, areaIntroduction, areaMaxCount, areaAvailableCount, areaPhoto } = props
    console.log(areaPhoto)
    return (
        <div className="col-12  c-shasow my-2 p-0">
            <div className="turquoise-bg text-center">{areaName}</div>
            <div className="card-body">
                <button type="button" className="btnstyle float-right " data-toggle="modal" data-target={`#areaId${areaId}`} >
                    編輯
                    </button>
                <div className="row">
                    <div className="col-6 ">
                        {/* <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                        <span className="text-style">區域數量上限：</span><span>{areaMaxCount}帳</span><br /> */}
                        <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                            區域數量上限:<span className="text-dark">{areaMaxCount}帳</span>
                        </p>


                        <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                            區域開放數量:<span className="text-dark">{areaAvailableCount}帳</span>
                        </p>


                        {/* <FontAwesomeIcon icon={faBullhorn} className="mr-1"></FontAwesomeIcon>
                        <span className="text-style">區域開放數量:</span><span>{areaAvailableCount}帳</span> */}
                    </div>
                    <div className="col-6 ">
                        {/* <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                        <span className="text-style">平時定價：</span><span>{weekdayPrice}元</span><br /> */}


                        <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                            平時定價：<span className="text-dark">{weekdayPrice}元</span>
                        </p>

                        <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                            假日定價：<span className="text-dark">{weekendPrice}元</span>
                        </p>


                    </div>

                    <div className="col-12">

                        {/* <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" ></FontAwesomeIcon>
                            區域介紹:
                        </p> */}


                        {/* <p className="card-text mb-0">
                            {areaIntroduction}
                        </p> */}
                    </div>

                    <div className="col-12">
                        <p className="text-style mb-1">
                            <FontAwesomeIcon icon={faPhotoVideo} className="mr-1" ></FontAwesomeIcon>
                            區域圖片：
                        </p>
                        <div>
                            {areaPhoto.map((item, index) => <img className="w-25" key={index} src={item.areaPhoto} alt="" />)}
                        </div>

                        {/* <img className="w-25" src={tamp} alt="" />
                        <img className="w-25" src={tamp} alt="" />
                        <img className="w-25" src={tamp} alt="" />
                        <img className="w-25" src={tamp} alt="" /> */}
                    </div>
                </div>
            </div>
            {/* cardbody end */}
        </div >
    )
}

export default CampAreaCard;