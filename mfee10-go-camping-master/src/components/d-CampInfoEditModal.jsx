import React, { useEffect, useState } from 'react';
import axios from "axios";
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import campMap from '../img/campMap.svg'
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";
import ImageUploading from "react-images-uploading";

// import fs from 'fs'; 
// import express from 'express'; 
// import mutler from 'mutler'; 
// import moduleName from '../../../camp_api/campImage/camp1_01.jpj'
const CampInfoEditModal = (props) => {

    // setCampData 更改 營區info
    const { campData, campId, setCampData } = props
    const [campName, setCampName] = useState(campData.campInfo[0].CampName)
    const [campPhone, setCampPhone] = useState(campData.campInfo[0].CampPhone)
    const [campAddress, setCampAddress] = useState(campData.campInfo[0].CampAddress)
    const [campAltitude, setCampAltitude] = useState(campData.campInfo[0].CampAltitude)
    const [campGuide, setCampGuide] = useState(campData.campInfo[0].CampGuide)

    const [campLine, setCampLine] = useState(!!campData.socialMedia[0] ? campData.socialMedia[0].SocialMediaLink : null)
    const [campfb, setCampFb] = useState(!!campData.socialMedia[1] ? campData.socialMedia[1].SocialMediaLink : null)
    const [campig, setCampIg] = useState(!!campData.socialMedia[2] ? campData.socialMedia[2].SocialMediaLink : null)

    const line = !!campData.socialMedia[0] ? campData.socialMedia[0].SocialMediaLink : null;
    const fb = !!campData.socialMedia[1] ? campData.socialMedia[1].SocialMediaLink : null;
    const ig = !!campData.socialMedia[2] ? campData.socialMedia[2].SocialMediaLink : null;

    // console.log(campData)

    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    axios.defaults.withCredentials = true;
    //按下確定更改按鈕
    const onClickHandler = async () => {
        let data = new FormData();
        console.log(images);
        // console.log(typeof images[0].file);
        for (let x = 0; x < images.length; x++) {
            // console.log(images[x].file)
            data.append('file', images[x].file);
        }
        await axios.post(`http://localhost:5000/upload/CampImage/${campId}/${campName}/${campPhone}/${campAddress}/${campAltitude}`, data, {

        }).then((res) => {
            console.log(res.data)
        })
        setImages([])
        fetchItem()
    }

    //重新取得camp data
    const fetchItem = async () => {
        await axios.get(`http://localhost:5000/dashboard/api/campInfo/${campId}`).then((response) => {
            console.log(response.data);
            setCampData(response.data);
            console.log(campData);
        })
    }
    // /campInfo/delete/image/:campPhotoId
    const deleteImage = async (campPhotoId) => {
        await axios.post(`http://localhost:5000/dashboard/api/campInfo/delete/image/${campPhotoId}`).then((res) => {
            console.log(res)
        })

        fetchItem()
        console.log(campPhotoId)
    }

    // const testClick = async () => {
    //   let data = new FormData();
    //   console.log(images);
    //   // console.log(typeof images[0].file);
    //   for(let x = 0; x<images.length; x++) {
    //       // console.log(images[x].file)
    //       data.append('file', images[x].file);
    //   }
    //   await axios.post(`/upload/CampImage/${campId}/${campName}/${campPhone}/${campAddress}/${campAltitude}/${campGuide}`, data, {

    //   }).then((res)=> {
    //     console.log(res.data)
    //   })

    //   fetchItem()
    // }
    // test input
    // const [files, setFiles] = useState({
    //   selectedFile: null
    // })

    // //input on change時，setFiles
    // const onChangeHandler = (e) => {
    //   setFiles({
    //     selectedFile: e.target.files,
    //     load: 0
    //   })
    //   console.log(e.target.files)
    //   // console.log(files)

    // }

    // const onClickTest = () => {
    //   console.log(files)
    //   let data = new FormData();
    //   for(var x = 0; x< files.selectedFile.length; x++) {
    //     console.log(x)
    //     data.append('file', files.selectedFile[x])
    //   }
    //   console.log(data)
    //   // data.append('file', files.selectedFile)
    //   axios.post("http://localhost:5000/upload/CampImage", data, {})
    //   .then(res => console.log(res))
    //   // console.log(data)
    // }


    return (
        <div className="modal fade  " id="campIntroEdit" tabindex="-1" aria-labelledby="campIntroEditLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="campIntroEditLabel"> 編輯露營區</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body font-text">

                        <div className="form-group">
                            <div className="row">
                                <div className="col">

                                    <FontAwesomeIcon icon={faBook} className="mr-1" ></FontAwesomeIcon>
                                    <label for="campName">名稱：</label>
                                    <input
                                        type="text"
                                        className="formstyle"
                                        id="campName"
                                        placeholder=""
                                        defaultValue={campData.campInfo[0].CampName}
                                        onChange={(e) => {
                                            setCampName(e.target.value)
                                        }}
                                    />
                                    <br />


                                    <FontAwesomeIcon icon={faPhoneSquare} className="mr-1" ></FontAwesomeIcon>
                                    <label for="campPhone">電話：</label>
                                    <input
                                        type="tel"
                                        className="formstyle"
                                        id="campPhone"
                                        placeholder=""
                                        defaultValue={campData.campInfo[0].CampPhone}
                                        onChange={(e) => {
                                            setCampPhone(e.target.value)
                                        }} /><br />


                                    <FontAwesomeIcon icon={faAddressBook} className="mr-1" ></FontAwesomeIcon>
                                    <label for="campAddress">地址：</label>
                                    <input
                                        type="text"
                                        className="formstyle-long"
                                        id="campAddress"
                                        placeholder=""
                                        defaultValue={campData.campInfo[0].CampAddress}
                                        onChange={(e) => {
                                            setCampAddress(e.target.value)
                                        }}
                                    /><br />


                                    <FontAwesomeIcon icon={faCalendar} className="mr-1" ></FontAwesomeIcon>
                                    <span>開放日：</span><br />
                                    <input type="checkbox" className="m-1 " id="sunday" checked />
                                    <label className="form-check-label" for="sunday">星期日</label>

                                    <input type="checkbox" className="m-1 " id="monday" checked />
                                    <label className="form-check-label" for="monday">星期一</label>

                                    <input type="checkbox" className="m-1 " id="tuesday" checked />
                                    <label className="form-check-label" for="tuesday">星期二</label>

                                    <input type="checkbox" className="m-1 " id="wednesday" checked />
                                    <label className="form-check-label" for="wednesday">星期三</label><br />

                                    <input type="checkbox" className="m-1 " id="thursday" checked />
                                    <label className="form-check-label" for="thursday">星期四</label>

                                    <input type="checkbox" className="m-1 " id="friday" checked />
                                    <label className="form-check-label" for="friday">星期五</label>

                                    <input type="checkbox" className="m-1 " id="saturday" checked />
                                    <label className="form-check-label" for="saturday">星期六</label><br /><br />


                                    <FontAwesomeIcon icon={faPagelines} className="mr-1" ></FontAwesomeIcon>
                                    <label for="campAltitude">海拔：</label>
                                    <input
                                        type="number"
                                        className="formstyle-long"
                                        id="campAltitude"
                                        placeholder=""
                                        defaultValue={campData.campInfo[0].CampAltitude}
                                        onChange={(e) => {
                                            setCampAltitude(e.target.value)
                                        }}
                                    />
                                    {/* <select className="form-style" id="campAltitude">
                                  <option>1000</option>
                                  <option>2000</option>
                                  <option>3000</option>
                              </select> */}
                                    <br />

                                </div>
                                <div className="col">

                                    <FontAwesomeIcon icon={faTag} className="mr-1" ></FontAwesomeIcon>
                                    <span className="mb-0">露營區標籤：</span><br />
                                    <input type="checkbox" className="m-1 " id="nigtView" checked />
                                    <label className="form-check-label" for="nigtView">夜景佳</label>

                                    <input type="checkbox" className="m-1 " id="seaofClouds" checked />
                                    <label className="form-check-label" for="seaofClouds">大草皮</label>

                                    <input type="checkbox" className="m-1 " id="nearRiver" />
                                    <label className="form-check-label" for="nearRiver">雲海</label>

                                    <input type="checkbox" className="m-1 " id="forest" checked />
                                    <label className="form-check-label" for="forest">螢火蟲</label>

                                    <input type="checkbox" className=" m-1" id="nearBeach" />
                                    <label className="form-check-label" for="nearBeach">賞楓</label>

                                    <input type="checkbox" className="m-1 " id="firefly" />
                                    <label className="form-check-label" for="firefly">近溪流</label>

                                    <input type="checkbox" className="m-1 " id="firefly" />
                                    <label className="form-check-label" for="firefly">櫻花季</label>

                                    <input type="checkbox" className="m-1 " id="firefly" />
                                    <label className="form-check-label" for="firefly">登山步道</label>

                                    <input type="checkbox" className="m-1 " id="firefly" />
                                    <label className="form-check-label" for="firefly">靠海邊</label><br /><br />


                                    <FontAwesomeIcon icon={faFacebookSquare} className="mr-1" ></FontAwesomeIcon>
                                    <label for="fbLink">FB連結 &nbsp;&nbsp;：</label>
                                    <input
                                        type="text"
                                        className="formstyle"
                                        id="fbLink"
                                        placeholder=""
                                        defaultValue={fb}
                                        onChange={(e) => {
                                            setCampFb(e.target.value)
                                        }}
                                    /><br />


                                    <FontAwesomeIcon icon={faInstagram} className="mr-1" ></FontAwesomeIcon>
                                    <label for="igLink">IG連結 &nbsp;&nbsp;：</label>
                                    <input
                                        type="text"
                                        className="formstyle"
                                        id="igLink"
                                        placeholder=""
                                        defaultValue={ig}
                                        onChange={(e) => {
                                            setCampIg(e.target.value)
                                        }}
                                    /><br />

                                    <FontAwesomeIcon icon={faLink} className="mr-1" ></FontAwesomeIcon>
                                    <label for="lineLink">Line連結：</label>
                                    <input
                                        type="text"
                                        className="formstyle"
                                        id="lineLink"
                                        placeholder=""
                                        defaultValue={line}
                                        onChange={(e) => {
                                            setCampLine(e.target.value)
                                        }}
                                    /><br />

                                </div>
                            </div>

                            <FontAwesomeIcon icon={faBell} className="mr-1" ></FontAwesomeIcon>
                            <label for="campGuid">露營區須知</label>
                            <textarea
                                className="form-control"
                                id="campGuid"
                                rows="10"
                                defaultValue={campData.campInfo[0].CampGuide}
                                onChange={(e) => {
                                    setCampGuide(e.target.value)
                                }}
                            ></textarea><br />

                            <FontAwesomeIcon icon={faPhotoVideo} className="mr-1" ></FontAwesomeIcon>
                            <label for="exampleFormControlFile1">目前露營區圖片：</label>
                            <div className="row row-cols-4">
                                {campData.photo.map((item, index) => (
                                    <div className="position-relative">
                                        <img className="col mt-2 card-img mb-3" style={{ height: 110 }} src={`${item.CampPhoto}`} alt="" />
                                        {/* 刪除紐 */}
                                        <button
                                            className="btn btn-danger position-absolute" style={{ top: 8, right: 15 }}
                                            onClick={() => deleteImage(item.CampPhotoId)}
                                        >X
                                        </button>
                                    </div>)
                                )}
                                {/* <img src="/Users/user/react-express-demo/camp_api/campImage/camp1_01.jpeg" alt=""/> */}
                            </div>

                            <FontAwesomeIcon icon={faPhotoVideo} className="mr-1 mt-2" ></FontAwesomeIcon>
                            <label for="exampleFormControlFile1">上傳露營區圖片：</label>
                            {/* onClickTest()}>上傳測試</button><input type="file" name="file" multiple onChange={onChangeHandler}/>
                      <button onClick={() =>  */}
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


                                            <div className="row  mt-3">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="col">
                                                        <img src={image.data_url} alt="" width="100%" />
                                                        <div className="mt-2 w-100 d-flex justify-content-center" >
                                                            <button className="btn btn-success mr-2" onClick={() => onImageUpdate(index)}>更換</button>
                                                            <button className="btn btn-danger" onClick={() => onImageRemove(index)}>刪除</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    )}
                            </ImageUploading>

                            {/* <FontAwesomeIcon icon={faPhotoVideo} className="mr-1 mt-2" ></FontAwesomeIcon>
                            <label for="exampleFormControlFile1">上傳露營區圖片：</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
 */}
                        </div>

                        <div className="modal-footer" >
                            <button style={{ width: "60px", height: "40px", fontSize: 18 }} onClick={() => onClickHandler()} type="button" className="btnstyle" data-dismiss="modal">儲 存</button>
                            <button style={{ width: "60px", height: "40px", fontSize: 18 }} type="button" className="btnstyle" data-dismiss="modal">取 消</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CampInfoEditModal