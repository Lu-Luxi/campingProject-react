import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import camping from '../img/camping.jpg';
import MemberTrip from './MemberTrip';
import MemberOrder from './MemberOrder'

const MemberTrips = (props) => {

    // data , latestTrip, latestTripRanking, latestTag
    const { user, start, end, campAmount } = props;
    // console.log(data)
    // const latestTrip = data.orders.shift()
    const [data, setData] = useState({
        orders: [],
        orderCampTag: [],
        orderRanking: [],
        orderCampPhoto: [],
    })
    const [latestTrip, setLatestTrip] = useState({})
    // const [latestTripRanking, setLatestTripRanking] = useState()
    // const [latestTag, setLatestTag] = useState()
    useEffect(() => {
        const getOrder = async () => {
            await axios.get(`http://localhost:5000/account/api/order/${user.MemberId}`, {
            }).then((response) => {
                console.log(response.data);
                setData(response.data);
                // const latestTrip = data.orders.shift()
                const temp = response.data.orders.shift()
                console.log(temp)
                setLatestTrip(temp)
                console.log(data);
                console.log(latestTrip)
            });
        }
        getOrder();
        // const latestTrip = data.orders.shift()
        // setData({latestTrip: latestTrip})
        // const latestTripRanking = data.orderRanking.filter(e => e.campId = latestTrip.CampId)
        // const latestTag = data.orderCampTag.filter(e => e.campId === latestTrip.CampId);
        // setLatestTrip(latestTrip)
        // setLatestTripRanking(latestTripRanking)
        // setLatestTag(latestTag)

        // console.log(latestTripRanking)
        // console.log(latestTag)
    }, [])

    // const latestTrip = data.orders.shift()

    // setLatestTrip(latestTrip)
    // setLatestTripRanking(latestTripRanking)
    // setLatestTag(latestTag)
    // console.log(data);
    // console.log(latestTrip)



    // const latestCard = () => {
    //     const getOrder = () => {
    //         axios.get(`http://localhost:5000/account/api/order/${user.MemberId}`,{
    //         }).then((response) => {
    //             console.log(response.data);
    //             setData(response.data);
    //         });
    //     }
    //     getOrder();
    //     const latestTrip = data.orders.shift()
    //     console.log(latestTrip)
    //     // const latestTripRanking = data.orderRanking.filter(e => e.campId = latestTrip.CampId)
    //     // const latestTag = data.orderCampTag.filter(e => e.campId === latestTrip.CampId);
    //     return (
    //         <MemberTrip latestTrip={latestTrip}/>
    //     )
    // }

    return (
        <React.Fragment>
            {/* <!-- 我的行程--> */}
            <div className="col-9 mt-5  ">
                {/* <!-- title --> */}
                <div className="rounded-sm mb-2 ">
                    <h3 className="mb-2 font-weight-bolder" style={{ letterSpacing: 1, color: "var(--darkColor)" }}>
                        {/* <FontAwesomeIcon icon={faBell} className="mr-2" /> */}
                        即將到來的行程
                    </h3>
                </div>
                {/* {console.log(latestTrip)} */}

                <MemberTrip
                    latestTrip={latestTrip}
                    start={start}
                    end={end}
                    campAmount={campAmount}
                    photo={!!data ? data.orderCampPhoto : null}
                />
                {/* <MemberTrip /> */}

            </div>
            {/* <!-- 我的行程結束 --> */}
        </React.Fragment>
    );
}


export default MemberTrips;