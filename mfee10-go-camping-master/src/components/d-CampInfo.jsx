import React, {useState, useEffect} from 'react';
import axios from "axios";
import { faAddressBook, faBell, faBook, faBullhorn, faCalendar, faLink, faPencilAlt, faPhoneSquare, faPhotoVideo, faTag, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tamp from '../img/camping.jpg';
import { faFacebookSquare, faInstagram, faPagelines } from "@fortawesome/free-brands-svg-icons";

import LeftNav from './d-LeftNav';
import CampInfoMain from './d-CampInfoMain';

const CampInfo = (props) => {
    const {campId, campData, setCampData} = props
    
    // const [data, setData] = useState({})
    // console.log(campId)
    // useEffect(() => {
    //     const fetchItem = async () => {
    //         await axios.get(`http://localhost:5000/dashboard/api/campInfo/${campId}`).then((response) => {
    //             console.log(response.data)
    //             setData()
    //         })
    //     }
    //     fetchItem()
    // }, [])
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">

                    <LeftNav />

                    <CampInfoMain  campId={campId} campData={campData} setCampData={setCampData}/>

                </div>
                {/* row 的div end */}
            </div>
            {/* container 的div end */}
        </React.Fragment>
    );

}

export default CampInfo;