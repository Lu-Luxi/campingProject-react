import React, { useState, useEffect } from 'react';
import axios from "axios";
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import campMap from '../img/campMap.svg'
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";
import CampAreaCard from './d-CampAreaCard'
import CampAreaAddModal from './d-CampAreaAddModal'
import CampAreaEditModal from './d-CampAreaEditModal'
import CampInfoEditModal from './d-CampInfoEditModal'
// import aaa from '../../../camp_api/public/campImage'
import IMGPath from './imgPath'
const CampInfoMain = (props) => {
    const { campId, campData, setCampData } = props

    console.log(campData)
    console.log(campData.campInfo[0].CampName)
    const week = campData.campOpenDay.map(item => item.CampOpenDay).join(", ")
    console.log(week)
    // console.log(campData.socialMedia[0].SocialMediaLink)
    const line = !!campData.socialMedia[0] ? campData.socialMedia[0].SocialMediaLink : null;
    const fb = !!campData.socialMedia[1] ? campData.socialMedia[1].SocialMediaLink : null;
    const ig = !!campData.socialMedia[2] ? campData.socialMedia[2].SocialMediaLink : null;
    console.log(line, fb, ig)

    // const requireContext = require.context("../campImage", false, /\.(png|jpe?g|svg)$/);
    // const images = requireContext.keys().map(requireContext);   
    // console.log(images)
    // let imgPath = new IMGPath()
    // let pics = require.context("../../../camp_api/public/campImage", false,  /\.(png|jpe?g|svg)$/)
    // console.log(imgPath.importAll(pics))


    // {campData.campInfo[0].CampName}
    const dS = {
        "campInfo": [
            {
                "CampId": 1,
                "CampName": "手信瀑布露營區",
                "CampPhone": "02-82620506",
                "CampAddress": "新北市土城區國際路55號",
                "CampAltitude": 250,
                "CampGuide": "可攜帶寵物 需注意清潔 需加鍊綁著，或放置籠內",
                "CampMap": ""
            }
        ],
        "socialMedia": [
            {
                "SocialMediaId": 1,
                "SocialMediaLink": "www.Line.com"
            },
            {
                "SocialMediaId": 2,
                "SocialMediaLink": "www.FaceBook.com"
            },
            {
                "SocialMediaId": 3,
                "SocialMediaLink": "www.Instagram.com"
            }
        ],
        "campOpenDay": [
            {
                "CampOpenDay": "星期一"
            },
            {
                "CampOpenDay": "星期二"
            },
            {
                "CampOpenDay": "星期三"
            },
            {
                "CampOpenDay": "星期四"
            },
            {
                "CampOpenDay": "星期五"
            },
            {
                "CampOpenDay": "星期六"
            },
            {
                "CampOpenDay": "星期日"
            }
        ],
        "tag": [
            {
                "campId": 1,
                "tagName": "雲海"
            },
            {
                "campId": 1,
                "tagName": "大草皮"
            },
            {
                "campId": 1,
                "tagName": "螢火蟲"
            }
        ],
        "photo": [
            {
                "CampPhotoId": 1,
                "CampId": 1,
                "CampPhoto": "https://picsum.photos/id/128/300/200",
                "CampPhotoCreateTime": "2020-10-09T16:00:00.000Z"
            },
            {
                "CampPhotoId": 2,
                "CampId": 1,
                "CampPhoto": "https://picsum.photos/id/128/300/200",
                "CampPhotoCreateTime": "2020-11-02T08:47:45.000Z"
            },
            {
                "CampPhotoId": 3,
                "CampId": 1,
                "CampPhoto": "https://picsum.photos/id/128/300/200",
                "CampPhotoCreateTime": "2020-11-02T08:47:45.000Z"
            },
            {
                "CampPhotoId": 4,
                "CampId": 1,
                "CampPhoto": "https://picsum.photos/id/128/300/200",
                "CampPhotoCreateTime": "2020-11-02T08:47:45.000Z"
            },
            {
                "CampPhotoId": 5,
                "CampId": 1,
                "CampPhoto": "https://picsum.photos/id/128/300/200",
                "CampPhotoCreateTime": "2020-11-02T08:47:45.000Z"
            }
        ],
        "Areas": [
            {
                "AreaId": 1,
                "AreaName": "草皮A區",
                "WeekdayPrice": 2200,
                "WeekendPrice": 2400,
                "AreaIntroduction": "說明省略",
                "AreaMaxCount": 15,
                "AreaAvailableCount": 10,
                "AreaStyleId": 1
            },
            {
                "AreaId": 2,
                "AreaName": "草皮B區",
                "WeekdayPrice": 2400,
                "WeekendPrice": 2600,
                "AreaIntroduction": "說明省略",
                "AreaMaxCount": 15,
                "AreaAvailableCount": 10,
                "AreaStyleId": 1
            },
            {
                "AreaId": 3,
                "AreaName": "草皮C區",
                "WeekdayPrice": 2600,
                "WeekendPrice": 2850,
                "AreaIntroduction": "說明省略",
                "AreaMaxCount": 15,
                "AreaAvailableCount": 10,
                "AreaStyleId": 1
            },
            {
                "AreaId": 4,
                "AreaName": "木棧板A區",
                "WeekdayPrice": 1200,
                "WeekendPrice": 1400,
                "AreaIntroduction": "說明省略",
                "AreaMaxCount": 15,
                "AreaAvailableCount": 10,
                "AreaStyleId": 2
            },
            {
                "AreaId": 5,
                "AreaName": "木棧板B區",
                "WeekdayPrice": 1400,
                "WeekendPrice": 1550,
                "AreaIntroduction": "說明省略",
                "AreaMaxCount": 15,
                "AreaAvailableCount": 10,
                "AreaStyleId": 2
            }
        ]
    }
    // const [data, setData] = useState({})
    // data.campInfo[0]

    // useEffect(() => {
    //     const fetchItem = async () => {
    //         await axios.get(`http://localhost:5000/dashboard/api/campInfo/${campId}`).then((response) => {
    //             console.log(response.data)
    //             setData(response.data)
    //             console.log(data)
    //         })
    //     }
    //     fetchItem()
    // }, [])
    return (
        <React.Fragment>
            <div className="my-5 mx-auto col-9 ">


                <div className="d-flex justify-content-between align-items-center mb-0">
                    <h3 className="title-style">
                        <FontAwesomeIcon icon={faTree} className="mr-1"></FontAwesomeIcon>
                            露營區管理
                        </h3>

                    <button style={{ fontSize: 18 }} type="button" className="btnstyle-big" data-toggle="modal" data-target="#campIntroEdit">
                        編 輯
                    </button>
                </div>





                {/* 露營區介紹card 的 div start */}
                <div className="card c-shasow mt-2 mb-5" >
                    <div className="card-body">
                        <div className="row">
                            <div className="col">

                                <FontAwesomeIcon icon={faBook} style={{ fontSize: 16 }} className="mr-1 "></FontAwesomeIcon>
                                <span className="text-style" >名稱：</span><span className="">{campData.campInfo[0].CampName}</span><br />


                                <FontAwesomeIcon icon={faPhoneSquare} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">電話：</span><span className="">{campData.campInfo[0].CampPhone}</span><br />

                                <FontAwesomeIcon icon={faAddressBook} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">地址：</span><span className="">{campData.campInfo[0].CampAddress}</span><br />


                                <FontAwesomeIcon icon={faCalendar} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">開放日：</span>
                                <pre className="mb-0">{week}</pre>

                                <FontAwesomeIcon icon={faPagelines} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">海拔：</span><span className="">{campData.campInfo[0].CampAltitude}m</span><br />
                            </div>

                            <div class="col">
                                <FontAwesomeIcon icon={faTag} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="mb-0 text-style">露營區標籤：</span>
                                <div className="mt-0 d-inline">
                                    {/* tag Map */}
                                    {campData.tag.map((item, index) => <button key={index} type="button" className="btn myTag mx-1">{item.tagName}</button>)}

                                </div><br />

                                <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">FB連結：</span><span className="">{fb}</span><br />

                                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">IG連結：</span><span className="">{ig}</span><br />


                                <FontAwesomeIcon icon={faLink} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                                <span className="text-style">Line連結：</span><span className="">{line}</span><br />

                            </div>


                        </div><br />

                        {/* card row 的div end */}

                        {/* <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: 16 }} className="mr-1 "></FontAwesomeIcon> */}
                        {/* <span className="small-title" >露營區介紹：</span>

                        <p className="card-text " style={{ lineHeight: 2 }}>翠峰位在清境農場與合歡山的道路之間，
                        是合歡山入口的第一站，標高二三○九，
                        為合歡山海拔較低之景點。除了可以欣賞山林美景外其無光害、
                        遮蔽物的優勢更是觀星族的最愛，
                        遇到觀星熱門季節時
                        更有數千名天文愛好者聚集在此舉辦觀星活動！
                        其周邊設有翠峰遊客服務中心、
                        雪季救護站及泰雅造型的翠峰派出所，
                        提供遊客用餐休憩，增加旅遊的便利性。
                        三角峰步道全長七八○公尺，
                        峰頂標高二三七六公尺，隸屬於臺大山地實驗農場翠峰分場。
                        其步道前身為合歡越嶺古道，
                        擁有原始林木及豐富的自然生態環境，
                        經由臺灣大學實驗農場重新整修後，
                        維持原始的自然風貌外還修建了手作步道，
                        佈滿片片褐色落葉的小徑，
                        更讓這條歷史步道增添了一股神祕氛圍。
                        而三角峰除了擁有豐富多元的生態環境外，
                        位在合歡山南稜嶺線上的絕佳景觀位置，
                        讓人站在三角峰峰頂就能夠清楚地眺望整個清境地區，
                        輕鬆地將清境的美景盡收眼底。
                                  </p> */}
                        <FontAwesomeIcon icon={faBell} style={{ fontSize: 16 }} className="mr-1 "></FontAwesomeIcon>
                        <span className="small-title" >營區須知：</span>
                        <p class="card-text" style={{ lineHeight: 2 }}>
                            {campData.campInfo[0].CampGuide}
                        </p>

                        <FontAwesomeIcon icon={faPhotoVideo} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                        <span className="small-title">露營區地圖：</span>
                        <div>
                            <img src={campMap} alt="" />
                        </div>
                        <FontAwesomeIcon icon={faPhotoVideo} style={{ fontSize: 16 }} className="mr-1"></FontAwesomeIcon>
                        <span className="small-title">露營區圖片：</span>
                        <div className="row row-cols-4 pl-2">
                            {campData.photo.map((item, index) => <img className=" m-2" src={`${item.CampPhoto}`} alt="" />)}
                            {/* <img src="http://localhost:5000/campImage/camp1_01.jpeg" alt=""/> */}
                            {/* {require(`../campImage/camp1_01.jpeg`)} */}
                            {/* ${item.CampPhoto} */}
                            {/* {require('./img/background.jpg')} */}
                            {/* <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" />
                            <img className="w-25" src={tamp} alt="" /> */}
                        </div>



                    </div>
                    {/* cardbody 的div end */}
                </div>
                {/* 露營區介紹card 的 div end */}


                <div>

                    <div className="d-flex justify-content-between align-items-center mb-0">
                        <h3 className="title-style">
                            <FontAwesomeIcon icon={faTree} className="mr-1"></FontAwesomeIcon>
                            區域設置
                        </h3>

                        <button type="button" class="btnstyle-big" data-toggle="modal" data-target="#areaAddModel">
                            +新增區域
                        </button>
                    </div>



                    {/* CampAreaCard 要 Map*/}
                    {campData.Areas.map((item, index) => {
                        let areaPhoto = campData.areasPhoto.filter(e => e.areaId === item.AreaId)
                        return (
                            <CampAreaCard
                                key={index}
                                areaId={item.AreaId}
                                areaName={item.AreaName}
                                weekdayPrice={item.WeekdayPrice}
                                weekendPrice={item.WeekendPrice}
                                areaIntroduction={item.AreaIntroduction}
                                areaMaxCount={item.AreaMaxCount}
                                areaAvailableCount={item.AreaAvailableCount}
                                areaPhoto={areaPhoto}
                            />
                        )
                    }

                    )}
                    {/* <CampAreaCard/> */}
                    {/* 區域card div end */}
                </div>
            </div>
            {/* 全部內容的大袋子div */}


            {/*新增區域 model start */}
            <CampAreaAddModal />
            {/*新增區域 model end */}

            {/*編輯區域 model start  要用 MAP 給他id*/}
            {campData.Areas.map((item, index) => {
                let areaPhoto = campData.areasPhoto.filter(e => e.areaId === item.AreaId)

                return (
                    <CampAreaEditModal
                        key={index}
                        areaId={item.AreaId}
                        areaName={item.AreaName}
                        weekdayPrice={item.WeekdayPrice}
                        weekendPrice={item.WeekendPrice}
                        areaIntroduction={item.AreaIntroduction}
                        areaMaxCount={item.AreaMaxCount}
                        areaAvailableCount={item.AreaAvailableCount}
                        areaPhoto={areaPhoto}

                    />
                )

            }
            )}
            {/* <CampAreaEditModal/> */}
            {/*編輯區域 model end */}

            {/* 編輯露營區model */}
            <CampInfoEditModal
                campData={campData}
                campId={campId}
                setCampData={setCampData}
            />
            {/* 編輯露營區model end*/}

        </React.Fragment>
    );
}

export default CampInfoMain;