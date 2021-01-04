import React, { useEffect, useState } from 'react';
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import campMap from '../img/campMap.svg'
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";

const CampAreaAddModal = () => {

    return (
        <div className="modal fade font-text" id="areaAddModel" tabindex="-1" aria-labelledby="areaAddModelLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header mb-5">
                        <h5 className="modal-title" id="areaAddModelLabel">新增區域</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body ">
                        <div className="form-group">
                            <FontAwesomeIcon icon={faBook} className="mr-1" ></FontAwesomeIcon>
                            <label for="areaName">區域名稱：</label>
                            <input type="text" className="formstyle" id="areaName" placeholder="" /><br />
                            <div className="row">

                                <div className="col">

                                    <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                                    <label for="areaMaxCount">區域數量上限：</label>
                                    <input type="number" className="formstyle-small" id="areaMaxCount" placeholder="" /><br />

                                    <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                                    <label for="areaAvailableCount">區域開放數量：</label>
                                    <input type="number" className="formstyle-small" id="areaAvailableCount" placeholder="" /><br />

                                </div>
                                <div className="col">
                                    <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                                    <label for="weekdayPrice">平日定價：</label>
                                    <input type="number" className="formstyle-small" id="weekdayPrice" placeholder="" /><br />

                                    <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                                    <label for="weekendPrice">假日定價：</label>
                                    <input type="number" className="formstyle-small" id="weekendPrice" placeholder="" /><br />

                                </div>
                            </div>


                            <FontAwesomeIcon icon={faPencilAlt} className="mr-1" ></FontAwesomeIcon>
                            <label for="areaIntroduction">區域介紹：</label>
                            <textarea className="form-control" id="areaIntroduction" rows="3"></textarea><br />


                            <FontAwesomeIcon icon={faPhotoVideo} className="mr-1" ></FontAwesomeIcon>
                            <label for="exampleFormControlFile1">上傳區域圖片：</label>
                            <input type="file" className="formstyle-file" id="exampleFormControlFile1" />

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btnstyle" data-dismiss="modal">取消</button>
                        <button type="button" className="btnstyle">儲存</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CampAreaAddModal