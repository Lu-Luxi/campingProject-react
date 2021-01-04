import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

import '../css/base.css';
import '../css/index.css';
import { faAngleRight, faCog, faHome, faListAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';


import MemberSideBar from './MemberSideBar';
import MemberTrips from './MemberTrips';
import MemberCalendar from './MemberCalendar';
import MemberOrderLists from './MemberOrderLists';
import MemberCouponLists from './MemberCouponLists';
import MemberSetting from './MemberSetting';
import MemberChangePassword from './MemberChangePassword';
import MemberEdit from './MemberEdit';



const Member = (props) => {
    const { user, loginName, handleUserEdit, place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount } = props;
    const [MemberId, setMemberId] = useState(user.MemberId);
    // console.log(user)
    console.log(MemberId)

    const [data, setData] = useState({
        orders: [],
        orderCampTag: [],
        orderRanking: [],
        orderCampPhoto: [],
        // latestTrip: {}
    })
    // // const [latestTrip, setLatestTrip] = useState(data.orders.shift())
    // // const [latestTripRanking, setLatestTripRanking] = useState(data.orderRanking.filter(e => e.campId = latestTrip.CampId))
    // // const [latestTag, setLatestTag] = useState(data.orderCampTag.filter(e => e.campId === latestTrip.CampId))
    useEffect(() => {
        const getOrder = async () => {
            await axios.get(`http://localhost:5000/account/api/order/${user.MemberId}`, {
            }).then((response) => {
                console.log(response.data);
                setData(response.data);
                // const latestTrip = data.orders.shift()
                // setData({latestTrip: data.orders.shift()})

            });
        }

        getOrder();

        // const latestTripRanking = data.orderRanking.filter(e => e.campId = latestTrip.CampId)
        // const latestTag = data.orderCampTag.filter(e => e.campId === latestTrip.CampId);
        // console.log(data);
        // console.log(latestTrip)
        // console.log(latestTripRanking)
        // console.log(latestTag)
    }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    return (
        <React.Fragment>
            {/* <!-- main_area --> */}
            <div className="container" style={{ paddingTop: 66 }}>
                <div className="row">
                    <MemberSideBar loginName={loginName} />
                    <Switch>
                        <Route exact path="/member">
                            <MemberTrips
                                user={user}
                                data={data}
                                start={start}
                                end={end}
                                campAmount={campAmount}
                            // latestTrip={latestTrip}
                            // latestTripRanking={latestTripRanking}
                            // latestTag={latestTag}
                            />
                            {/* <MemberCalendar /> */}
                        </Route>
                        <Route path="/member/setting">
                            <MemberSetting user={user} />
                        </Route>
                        <Route path="/member/edit">
                            <MemberEdit user={user} handleUserEdit={handleUserEdit} />
                        </Route>
                        <Route path="/member/changePassword">
                            <MemberChangePassword />
                        </Route>
                        <Route path="/member/order-list">
                            <MemberOrderLists
                                user={user}
                                start={start}
                                end={end}
                                campAmount={campAmount}
                            // data={data}
                            />
                        </Route>
                        <Route path="/member/coupon-list">
                            <MemberCouponLists />
                        </Route>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    );
}


export default Member;