import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";



// import './App.css';
// import 'jquery';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import moment from 'moment';

// import '../css/base.css';
// import '../css/index.css';
// import '../css/campingSearch.css';

import topIcon from '../img/topIcon.png';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Search from './Search';
import WishRoute from './WishRoute';
import Member from './Member';
import Login from './Login';
import Register from './Register';
import Introduce from './Introduce';
// import Order from './Order';
import Payment from './Payment';
// import CreditCard from './CreditCard';
import ForgetPassword from './ForgetPassword';
import OrderCreate from './OrderCreate';


const Front = (props) => {
    const [browserLocation, setBrowserLocation] = useState({ pathname: "/", search: "" });
    console.log(browserLocation);
    const { role, loggedIn, handleLogout, loginStatusName, place, setPlace, start, setStart, end, setEnd, campAmount, setCampAmount, localeSetting, user, handleUserEdit, handleLogin, loginAlert, setLoginStatusName, msgReg, setMsgReg, statusReg, setMemberEmailReg, setMemberPasswordReg, setMemberPhoneReg, setMemberNameReg, setPasswordConfirm, validator, getDays, purchaserName, setPurchaserName, purchaserPhone, setPurchaserPhone, purchaserEmail, setPurchaserEmail, paymentInfo, setPaymentInfo, orderAreaId, setOrderAreaId, orderInfo, setOrderInfo } = props;
    const [searchFilterTag, setSearchFilterTag] = useState([]);
    const [favoriteCampList, setFavoriteCampList] = useState([]);
    const [searchResultText, setSearchResultText] = useState('');

    const handleTagClick = (e) => {
        if (e.target.value === "0") {
            setSearchFilterTag([]);
            // setSearchFilterTag([...searchFilterTag, e.target.innerText]);
        } else {
            if (searchFilterTag.includes(e.target.innerText)) {
                let newList = [...searchFilterTag];
                newList.splice(newList.indexOf(e.target.innerText), 1);
                setSearchFilterTag(newList);
            } else {
                setSearchFilterTag([...searchFilterTag, e.target.innerText]);
            }
        }
        // console.log(e.target.innerText);
    }

    return (
        <React.Fragment>
            <Navbar roleControl={role} isLoggedIn={loggedIn} onLogout={handleLogout} loginName={loginStatusName} />

            <Switch>
                <Route exact path="/">
                    <Home
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        localeSetting={localeSetting}
                        searchFilterTag={searchFilterTag}
                        setSearchFilterTag={setSearchFilterTag}
                        handleTagClick={handleTagClick}
                        loggedIn={loggedIn}
                        user={user}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        setBrowserLocation={setBrowserLocation}
                        searchResultText={searchResultText}
                        setSearchResultText={setSearchResultText}
                    />
                </Route>
                <Route exact path="/search">
                    <Search
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        localeSetting={localeSetting}
                        searchFilterTag={searchFilterTag}
                        setSearchFilterTag={setSearchFilterTag}
                        handleTagClick={handleTagClick}
                        loggedIn={loggedIn}
                        user={user}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        browserLocation={browserLocation}
                        setBrowserLocation={setBrowserLocation}
                        searchResultText={searchResultText}
                        setSearchResultText={setSearchResultText}
                    />
                </Route>
                <Route path="/wish">
                    {loggedIn ? <WishRoute
                        loggedIn={loggedIn}
                        user={user}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        localeSetting={localeSetting}
                    /> : <Redirect to="/login" />}
                </Route>
                <Route path="/member">
                    {loggedIn ? <Member
                        user={user}
                        loginName={loginStatusName}
                        handleUserEdit={handleUserEdit}
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                    /> : <Redirect to="/" />}
                </Route>
                <Route path="/login">
                    {loggedIn ? <Redirect to={browserLocation} /> :
                        // {loggedIn ? <Redirect to="/" /> :
                        <Login
                            onLogin={handleLogin}
                            loginAlert={loginAlert}
                            role={role}
                            setLoginStatusName={setLoginStatusName}
                            msgReg={msgReg}
                            setMsgReg={setMsgReg}
                            browserLocation={browserLocation}
                            setBrowserLocation={setBrowserLocation}
                        />}
                </Route>
                <Route path="/register">
                    {statusReg ? <Redirect to="/login" /> :
                        <Register

                            setMemberEmailReg={setMemberEmailReg}
                            setMemberPasswordReg={setMemberPasswordReg}
                            setMemberPhoneReg={setMemberPhoneReg}
                            setMemberNameReg={setMemberNameReg}
                            setPasswordConfirm={setPasswordConfirm}
                            msgReg={msgReg}
                            validator={validator}
                        />
                    }
                </Route>
                <Route
                    path="/camps/:campId" >
                    <Introduce
                        place={place}
                        setPlace={setPlace}
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                        campAmount={campAmount}
                        setCampAmount={setCampAmount}
                        localeSetting={localeSetting}
                        getDays={getDays}
                        loggedIn={loggedIn}
                        user={user}
                        favoriteCampList={favoriteCampList}
                        setFavoriteCampList={setFavoriteCampList}
                        setBrowserLocation={setBrowserLocation}
                        searchResultText={searchResultText}
                        setSearchResultText={setSearchResultText}
                    />
                </Route>
                <Route path="/book">
                    {loggedIn ? <Payment
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        getDays={getDays}
                        purchaserName={purchaserName}
                        setPurchaserName={setPurchaserName}
                        purchaserPhone={purchaserPhone}
                        setPurchaserPhone={setPurchaserPhone}
                        purchaserEmail={purchaserEmail}
                        setPurchaserEmail={setPurchaserEmail}
                        paymentInfo={paymentInfo}
                        setPaymentInfo={setPaymentInfo}
                        orderAreaId={orderAreaId}
                        setOrderAreaId={setOrderAreaId}
                    /> : <Redirect to="/login" />}
                </Route>
                <Route path="/order-create">
                    {loggedIn ? <OrderCreate
                        start={start}
                        end={end}
                        campAmount={campAmount}
                        getDays={getDays}
                        purchaserName={purchaserName}
                        purchaserPhone={purchaserPhone}
                        purchaserEmail={purchaserEmail}
                        paymentInfo={paymentInfo}
                        setPaymentInfo={setPaymentInfo}
                        orderInfo={orderInfo}
                        setOrderInfo={setOrderInfo}
                        user={user}
                    /> : <Redirect to="/login" />}
                </Route>
                <Route path="/forget-password">
                    <ForgetPassword />
                </Route>

            </Switch>

            <Footer />


            {/* <!-- 右下釘版圖片top --> */}
            <div className="position-fixed m-fixedIcon" onClick={() => window.scrollTo(0, 0)} style={{ cursor: "pointer" }}>
                <img src={topIcon} alt="" className="w-100" style={{ objectFit: 'contain' }} />
            </div>
        </React.Fragment>
    );

}

export default Front;