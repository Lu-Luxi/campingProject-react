import React, { useState, useEffect } from 'react';
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// import './App.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';

import './css/dashboard.css';
import './css/base.css';
import './css/index.css';
import './css/campingSearch.css';

import Dashboard from './components/d-App'
import Front from './components/Front';


library.add(fab, fas, far);

const App = () => {

  const getDays = (fromDate, toDate) => {
    let tempFrom = fromDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
    let tempTo = toDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
    let dt1 = new Date(tempFrom[0], tempFrom[1], tempFrom[2]);
    let dt2 = new Date(tempTo[0], tempTo[1], tempTo[2]);
    return ((dt2 - dt1) / (1000 * 60 * 60 * 24));
  }

  const transformDate = inputDate => {
    moment.locale('zh-tw', {
      months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
      weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
      longDateFormat: {
        LT: 'Ah點mm分',
        LTS: 'Ah點m分s秒',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah點mm分',
        LLLL: 'YYYY年MM月DD日ddddAh點mm分',
        l: 'YYYY-MM-DD',
        ll: 'YYYY年MM月DD日',
        lll: 'YYYY年MM月DD日Ah點mm分',
        llll: 'YYYY年MM月DD日ddddAh點mm分'
      },
      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
      meridiemHour: function (h, meridiem) {
        let hour = h;
        if (hour === 12) {
          hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
          meridiem === '上午') {
          return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
          return hour + 12;
        } else {
          // '中午'
          return hour >= 11 ? hour : hour + 12;
        }
      },
      meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
          return '凌晨';
        } else if (hm < 900) {
          return '早上';
        } else if (hm < 1130) {
          return '上午';
        } else if (hm < 1230) {
          return '中午';
        } else if (hm < 1800) {
          return '下午';
        } else {
          return '晚上';
        }
      },
      calendar: {
        sameDay: function () {
          return this.minutes() === 0 ? '[今天]Ah[點整]' : '[今天]LT';
        },
        nextDay: function () {
          return this.minutes() === 0 ? '[明天]Ah[點整]' : '[明天]LT';
        },
        lastDay: function () {
          return this.minutes() === 0 ? '[昨天]Ah[點整]' : '[昨天]LT';
        },
        nextWeek: function () {
          let startOfWeek, prefix;
          startOfWeek = moment().startOf('week');
          prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
          return this.minutes() === 0 ? prefix + 'dddA點整' : prefix + 'dddAh點mm';
        },
        lastWeek: function () {
          let startOfWeek, prefix;
          startOfWeek = moment().startOf('week');
          prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
          return this.minutes() === 0 ? prefix + 'dddAh點整' : prefix + 'dddAh點mm';
        },
        sameElse: 'LL'
      },
      ordinalParse: /\d{1,2}(日|月|周)/,
      ordinal: function (number, period) {
        switch (period) {
          case 'd':
          case 'D':
          case 'DDD':
            return number + '日';
          case 'M':
            return number + '月';
          case 'w':
          case 'W':
            return number + '周';
          default:
            return number;
        }
      },
      relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '幾秒',
        m: '1 分鐘',
        mm: '%d 分鐘',
        h: '1 小時',
        hh: '%d 小時',
        d: '1 天',
        dd: '%d 天',
        M: '1 個月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
      },
      week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
      }
    });
    let temp = moment(inputDate).format('LL');
    return temp;
  }
  //訂單購買人 電話 信箱
  const [purchaserName, setPurchaserName] = useState('');
  const [purchaserPhone, setPurchaserPhone] = useState('');
  const [purchaserEmail, setPurchaserEmail] = useState('');
  //地點 日期 帳篷數量
  const [place, setPlace] = useState('');
  const [start, setStart] = useState(transformDate(moment().format('L')));
  const [end, setEnd] = useState(transformDate(moment().add(1, 'day').format('L')));
  const [campAmount, setCampAmount] = useState(1);
  const [localeSetting, setLocaleSetting] = useState({
    "format": "YYYY年MM月DD日",
    "separator": " - ",
    "applyLabel": "確認",
    "cancelLabel": "取消",
    "customRangeLabel": "自訂義範圍",
    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
    "monthNames": ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
    "firstDay": 0
  });

  // 登入程式參數設定
  const [loginAlert, setLoginAlert] = useState("") //處理 api 回傳的 login message
  const [role, setRole] = useState(); //登入角色 guest or member
  const [loggedIn, setLoggedIn] = useState(false);  //處理是否有登入
  const [loginStatusName, setLoginStatusName] = useState("");  //處理 api 回傳的 member姓名
  const [user, setUser] = useState({});  //取得使用者的資料
  // const [register, setRegister] = useState(false) //確認是否註冊成功 要轉業
  axios.defaults.withCredentials = true;

  useEffect(() => { //
    loginStatus();
    // handleLogout()
    // console.log(user)
  }, []);

  // 登入程式
  const handleLogin = (memberEmail, memberPassword) => {
    axios.post("http://localhost:5000/account/api/login", {
      memberEmail: memberEmail,
      memberPassword: memberPassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginAlert(response.data.message); //Login page 內的 alert 訊息
      } else {
        setLoginAlert("登入成功")
        console.log(response.data)
        setLoginStatusName(response.data[0].MemberName);
        loginStatus();
      }
    });
  }

  // 判定user是否已經登入
  const loginStatus = async () => {
    await axios.get("http://localhost:5000/account/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        // console.log(response.data.user)
        setUser(response.data.user[0]);
        setRole("member");
        setLoggedIn(true);
        setLoginStatusName(response.data.user[0].MemberName);
        console.log(user);
        // setLoginStatusName(user.MemberName);
        // console.log(loginStatusName)
        // console.log(response.data.user[0])
      } else {
        setRole("guest");
        setLoggedIn(false);
      }
    });
  }


  const handleLogout = () => {
    axios.get("http://localhost:5000/account/api/logout").then((response) => {
      setRole("guest");
      setLoginStatusName("");
      setLoginAlert("");
      setLoggedIn(false);
      setUser({});
      console.log(response);
      // setLoggedIn(!loggedIn)
      // console.log(loggedIn
    })
  }

  // 註冊
  const [memberEmailReg, setMemberEmailReg] = useState(""); //Email
  const [memberPasswordReg, setMemberPasswordReg] = useState(""); //密碼
  const [memberNameReg, setMemberNameReg] = useState("");  //姓名
  const [passwordComfirm, setPasswordConfirm] = useState(""); //密碼確認
  const [memberPhoneReg, setMemberPhoneReg] = useState("")
  const [msgReg, setMsgReg] = useState({  //註冊提示msg
    registered: false,
    msg: ""
  });
  const [statusReg, setStatusReg] = useState(false); //註冊狀態

  const handleRegisterStatus = () => {

    if (msgReg.registered) {
      setStatusReg(true);
      setMemberEmailReg("");
      setMemberPasswordReg("");
      setMemberNameReg("");
      setPasswordConfirm("");
      setMemberPhoneReg("");
      console.log(msgReg.msg);
    } else {
      setStatusReg(false);
    };


  };


  useEffect(() => {
    console.log(msgReg);
    handleRegisterStatus();
    // console.log(passwordComfirm)
  }, [msgReg])


  // const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  // const cellphoneRule = /^09[0-9]{8}$/;

  const validator = () => {
    if (memberNameReg.length === 0 || memberEmailReg.length === 0 || memberPhoneReg.length === 0 || memberPasswordReg.length === 0) {
      setMsgReg({
        registered: false,
        msg: "請輸入Email、姓名、手機、密碼"
      })
      return
    } else {
      if (memberPasswordReg !== passwordComfirm) {
        setMsgReg({
          registered: false,
          msg: "密碼驗證不符合"
        });
        return
        // !email以及手機驗證，要使用可以打開
        // } else if(memberEmailReg.search(emailRule) === -1) {
        //   setMsgReg({
        //     registered: false,
        //     msg: "請輸入正確Email格式"
        //   });
        //   return
        // } else if(memberPhoneReg.search(cellphoneRule) === -1) {
        //   setMsgReg({
        //     registered: false,
        //     msg: "請輸入正確手機格式"
        //   });
        //   return
      } else {
        register(); //登入的api
      }
    }
  }

  //會員註冊
  const register = async () => {
    await axios.post("http://localhost:5000/account/api/register", {
      memberEmail: memberEmailReg,
      memberPassword: memberPasswordReg,
      memberName: memberNameReg,
      memberPhone: memberPhoneReg
    }).then((response) => {
      console.log(response)
      setMsgReg(response.data)
    });
  };

  //會員資料修改
  const handleUserEdit = async (memberName, memberPhone, memberId) => {
    await axios.patch("http://localhost:5000/account/api/edit", {
      memberName: memberName,
      memberPhone: memberPhone,
      memberId: memberId
    }).then((response) => {
      console.log(response);
      setUser(response.data[0]);
      setLoginStatusName(response.data[0].MemberName);
      console.log(user);
    })
    // loginStatus()
    // setUser()
  }

  //訂單資訊初始值
  const [paymentInfo, setPaymentInfo] = useState({
    bookingCampInfo: [
      {
        campId: 1,
        campName: '喜洋洋露營區',
        cityName: '桃園市',
        campPhone: '04-22223333',
        campAltitude: 500,
        campAddress: '台中市北屯區皮卡路二段511號',
        campFacility: '麻將桌',
      }
    ],
    bookingCampTag: [
      { campId: 1, tagName: '近水源喔' },
      { campId: 1, tagName: '雲海雲' },
      { campId: 1, tagName: '雲海喔' },
      { campId: 1, tagName: '雲海海' }
    ],
    bookingCampRanking: [
      { campId: 1, ranking: 4.3, count: 45 },
    ],
    bookingCampAreaInfo: [
      { campId: 1, areaId: 1, areaName: 'A區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3000 },
    ],
    bookingCampAreaImage: [
      { areaId: 1, areaPhoto: 'https://picsum.photos/id/237/300/200' },
    ],
  });

  const [orderInfo, setOrderInfo] = useState({
    campInfo: [
      {
        campId: 2,
        campName: "秀水湯包露營區",
        cityName: "新北市",
        campPhone: "04-33665432",
        campAltitude: 280,
        campAddress: "新北市市南屯區公益路二段100號"
      }
    ],
    areaInfo: [
      {
        campId: 2,
        areaId: 4,
        areaName: "泥土A區",
        areaStyle: "木棧板",
        areaLeft: 10,
        dateCount: 1,
        totalPrice: 1200
      }
    ],
    campOwnerInfo: [
      {
        campName: "秀水湯包露營區",
        campAddress: "新北市市南屯區公益路二段100號",
        campOwnerName: "王偉娥",
        campOwnerPhone: "0922222222"
      }
    ],
    searchInfo: [
      {
        start: "2020年11月26日",
        end: "2020年11月27日",
        campAmount: "1"
      }
    ]
  });

  //在訂單方面的URL query
  const [orderAreaId, setOrderAreaId] = useState(0);

  return (
    <Router>
      <Switch>

        <Route path="/dashboard">
          <Dashboard
            localeSetting={localeSetting}
            transformDate={transformDate}
          />
        </Route>
        <Route path="/">
          <Front
            role={role}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            loginStatusName={loginStatusName}
            place={place}
            setPlace={setPlace}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            campAmount={campAmount}
            setCampAmount={setCampAmount}
            localeSetting={localeSetting}
            user={user}
            handleUserEdit={handleUserEdit}
            handleLogin={handleLogin}
            loginAlert={loginAlert}
            setLoginStatusName={setLoginStatusName}
            msgReg={msgReg}
            setMsgReg={setMsgReg}
            statusReg={statusReg}
            setMemberEmailReg={setMemberEmailReg}
            setMemberPasswordReg={setMemberPasswordReg}
            setMemberPhoneReg={setMemberPhoneReg}
            setMemberNameReg={setMemberNameReg}
            setPasswordConfirm={setPasswordConfirm}
            validator={validator}
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
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        </Route>
      </Switch>
    </Router >
  );

}


export default App;

