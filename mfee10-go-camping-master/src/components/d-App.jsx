import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Analysis from "./d-Analysis";
import Home from "./d-Home";
import CampInfo from "./d-CampInfo";
import OrderManagement from "./d-OrderManagement";
import AreaManagement from "./d-AreaManagement";
import Setting from "./d-Setting";
import Login from "./d-Login";
import Navbar from './d-Navbar';


const Dashboard = (props) => {

  const { localeSetting, transformDate } = props;

  // 登入程式參數設定
  const [loginAlert, setLoginAlert] = useState("") //處理 api 回傳的 login message
  const [role, setRole] = useState(""); //登入角色 guest or member
  const [loggedIn, setLoggedIn] = useState(false);  //處理是否有登入
  const [loginStatusName, setLoginStatusName] = useState("");  //處理 api 回傳的 member姓名
  const [user, setUser] = useState({});  //取得使用者的資料
  const [campOnwerId, setCampOnwerId] = useState('');
  const [campId, setCampId] = useState(''); //取得campID
  // const [register, setRegister] = useState(false) //確認是否註冊成功要轉業
  axios.defaults.withCredentials = true;

  useEffect(() => { //
    loginStatus();
    // handleLogout()
    // console.log(user)
  }, []);

  // 登入程式
  const handleLogin = (CampOwnerAccount, CampOwnerPassword) => {
    axios.post("http://localhost:5000/dashboard/api/login", {
      campOwnerAccount: CampOwnerAccount,
      campOwnerPassword: CampOwnerPassword,
    }).then((response) => {
      if (response.data.message) {

        setLoginAlert(response.data.message); //Login page 內的 alert 訊息
        console.log(loginAlert)
      } else {
        setLoginAlert("登入成功")
        console.log(response.data);
        setLoginStatusName(response.data[0].CampOwnerName);
        setCampId(response.data[0].CampId)
        setCampOnwerId(response.data[0].CampOwnerId)
        // console.log(campId)
        loginStatus();
      }
    });
  }

  // 判定user是否已經登入
  const loginStatus = async () => {
    await axios.get("http://localhost:5000/dashboard/api/login").then((res) => {
      if (res.data.loggedIn === true) {
        // console.log(res.data.campOwner[0])
        setUser(res.data.campOwner[0]);
        setRole("member");
        setLoggedIn(true);
        setLoginStatusName(res.data.campOwner[0].CampOwnerName);
        setCampId(res.data.campOwner[0].CampId)
        setCampOnwerId(res.data.campOwner[0].CampOwnerId)
        console.log(res.data);
        console.log(`campid = ${campId}`)
        console.log(user);
        // setLoginStatusName(user.MemberName);
        // console.log(loginStatusName)
        // console.log(response.data.user[0])
      } else {
        // setRole("guest");
        setLoggedIn(false);
      }
    });
  }


  const handleLogout = () => {
    axios.get("http://localhost:5000/dashboard/api/logout").then((response) => {
      setRole("guest");
      setLoginStatusName("");
      setLoginAlert("");
      setCampId("")
      setCampOnwerId("")
      setLoggedIn(false);
      setUser({});
      console.log(response);
      // setLoggedIn(!loggedIn)
      // console.log(loggedIn
    })
  }

  //取得campInfo data
  const [campData, setCampData] = useState({})
  // data.campInfo[0]

  useEffect(() => {
    const fetchItem = async () => {
      await axios.get(`http://localhost:5000/dashboard/api/campInfo/${campId}`).then((response) => {
        console.log(response.data);
        setCampData(response.data);
        console.log(campData);
      })
    }
    fetchItem()
  }, [campId])



  return (
    <React.Fragment>
      <Navbar onLogout={handleLogout} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/dashboard">
          {loggedIn ? <Home campId={campId} /> : <Redirect to="/dashboard/login" />}
          {/* <Home /> */}
        </Route>
        <Route path="/dashboard/order-management">
          {loggedIn ? <OrderManagement campId={campId} /> : <Redirect to="/dashboard/login" />}

          {/* <OrderManagement /> */}
        </Route>
        <Route path="/dashboard/camp-info">
          {loggedIn ? <CampInfo campId={campId} campData={campData} setCampData={setCampData} /> : <Redirect to="/dashboard/login" />}
        </Route>
        <Route path="/dashboard/area-management">
          {loggedIn ? <AreaManagement campId={campId} /> : <Redirect to="/dashboard/login" />}
        </Route>
        <Route path="/dashboard/analysis">
          {loggedIn ? <Analysis
            campId={campId}
            localeSetting={localeSetting}
            transformDate={transformDate}
          /> : <Redirect to="/dashboard/login" />}
        </Route>
        <Route path="/dashboard/setting">
          {loggedIn ? <Setting user={user} campId={campId} /> : <Redirect to="/dashboard/login" />}

        </Route>
        <Route path="/dashboard/login" >
          {loggedIn ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} loginAlert={loginAlert} />}
          {/* <Login onLogin={handleLogin}/> */}
        </Route>
      </Switch>
    </React.Fragment>

  );
}

export default Dashboard;
