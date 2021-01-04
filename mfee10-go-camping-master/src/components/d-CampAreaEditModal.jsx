import React, {useEffect, useState} from 'react';
import axios from "axios";
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import campMap from '../img/campMap.svg'
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";
import ImageUploading from "react-images-uploading";


const CampAreaEditModal = (props) => {
  const {areaId, areaName, weekdayPrice, weekendPrice, areaIntroduction, areaMaxCount, areaAvailableCount} = props


  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  axios.defaults.withCredentials = true;

  return(
    <div className="modal fade font-text" id={`areaId${areaId}`} tabindex="-1" aria-labelledby="areaEditModelLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
          <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title" id="areaEditModelLabel">編輯區域： {areaName}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body ">
                  <div className="form-group">
                      <FontAwesomeIcon icon={faBook} className="mr-1" ></FontAwesomeIcon>
                      <label for="areaName">區域名稱：</label>
                      <input type="text" className="formstyle" id="areaName" placeholder="" defaultValue={areaName}/><br />
                      <div className="row">

                          <div className="col">

                              <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                              <label for="areaMaxCount">區域數量上限：</label>
                              <input type="number" className="formstyle-small" id="areaMaxCount"
                              defaultValue={areaMaxCount}
                              placeholder="" /><br />

                              <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                              <label for="areaAvailableCount">區域開放數量：</label>
                              <input type="number" className="formstyle-small" id="areaAvailableCount"
                              defaultValue={areaAvailableCount}
                              placeholder="" /><br />

                          </div>
                          <div className="col">
                              <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                              <label for="weekdayPrice">平日定價：</label>
                              <input type="number" className="formstyle-small" id="weekdayPrice" placeholder="" 
                              defaultValue={weekdayPrice}
                              /><br />

                              <FontAwesomeIcon icon={faBullhorn} className="mr-1" ></FontAwesomeIcon>
                              <label for="weekendPrice">假日定價：</label>
                              <input type="number" className="formstyle-small" id="weekendPrice" placeholder=""
                              defaultValue={weekendPrice}
                              /><br />

                          </div>
                      </div>


                      <FontAwesomeIcon icon={faPencilAlt} className="mr-1" ></FontAwesomeIcon>
                      <label for="areaIntroduction">區域介紹：</label>
                      <textarea className="form-control" id="areaIntroduction" rows="3" defaultValue={areaIntroduction}></textarea><br />


                      <FontAwesomeIcon icon={faPhotoVideo} className="mr-1" ></FontAwesomeIcon>
                      <label for="exampleFormControlFile1">上傳區域圖片：</label>
                      <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <button className="btn btn-success"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            點擊或拖曳
                          </button>
                          &nbsp;
                          <button className="btn btn-danger" onClick={onImageRemoveAll}>刪除全部</button>
                          <div className="row row-cols-4">
                              {imageList.map((image, index) => (
                              <div key={index} className="image-item col">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper mt-2">
                                  <button className="btn btn-success mr-2" onClick={() => onImageUpdate(index)}>更換</button>
                                  <button className="btn btn-danger" onClick={() => onImageRemove(index)}>刪除</button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                        </div>
                      )}
                    </ImageUploading>

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

export default CampAreaEditModal