const express = require('express');
const session = require("express-session");
const multer = require("multer");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

const router = express.Router()

// router.post('/register', async (req, res) => {
//   const memberEmail = req.body.memberEmail;
//   const memberPassword = req.body.memberPassword;
//   const memberName = req.body.memberName;
//   const memberPhone = req.body.memberPhone;
//   // console.log(memberEmail, memberPassword, memberName)
//   await req.mysql.query("SELECT * FROM `members` WHERE MemberEmail = ?", [memberEmail], (err, result) => {
//     if(err) {
//       console.log(err)
//       res.send(err)
//     }

//     if(result.length > 0) {
//       console.log(result)
//       res.send({registered: false ,msg: "Email已註冊，請更換Email"})
//     } else {
//         //將密碼加密
//       bcrypt.hash(memberPassword, saltRounds, (err, hash) => {
//         if(err) {
//           console.log(err);
//         }
//         req.mysql.query("INSERT INTO members (MemberEmail, MemberPassword, MemberName, MemberPhone) VALUES (?, ?, ?, ?)", [memberEmail, hash, memberName, memberPhone], (err, rows) => {
//             if(err) {
//               res.send(err)
//               console.log(err)
//             }else{
//               res.send({registered: true , msg: "註冊成功"})
//             }
//           }
//         )
//       })
//     }
//   })
// })

//確認使用者是否登入使用者
router.get("/login", (req, res) => {
    if (req.session.campOwner) {
        res.send({ loggedIn: true, campOwner: req.session.campOwner });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post('/login', async (req, res) => {
    const campOwnerAccount = req.body.campOwnerAccount;
    const campOwnerPassword = req.body.campOwnerPassword;
    const token = uuidv4()

    // SELECT * FROM `members` WHERE MemberEmail = "abeChen@gmail.com"
    //輸入帳號或email 皆可
    await req.mysql.query(
        "SELECT * FROM `camp owners` AS co JOIN camps AS c ON c.CampOwnerId = co.CampOwnerId WHERE campOwnerAccount = ?",
        [campOwnerAccount],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            console.log(result[0])
            if (result.length > 0) {
                bcrypt.compare(campOwnerPassword, result[0].CampOwnerPassword, (error, response) => {
                    if (response) {
                        // let Auth = {}
                        req.session.campOwner = result;
                        // req.session.token = token;
                        // console.log(req.session);
                        // Auth["result"] = result
                        // Auth["token"] = token
                        // res.send(Auth)
                        res.send(result)
                    } else {
                        res.send({ message: "密碼輸入錯誤" })
                    }
                })
            } else {
                res.send({ message: "帳號尚未註冊" })
                // res.send({message: "User doesn't exist"})
            }
        }
    );
});

router.get('/logout', (req, res) => {
    // res.cookie("userId", "", {expires: new Date()})
    req.session.destroy(function () {
        req.session = null;
    });
    console.log(req.session)
    res.send("Logout!")
})

router.get('/campInfo/:campId', async (req, res) => {
    const campId = req.params.campId;
    const data = {}
    // 取得營區資訊
    const row1 = await req.mysql.queryAsync('SELECT CampId ,CampName, CampPhone, CampAddress, CampAltitude, CampGuide, CampMap FROM `camps` WHERE CampId =? ', [campId])
    // 取得社群
    const row2 = await req.mysql.queryAsync('SELECT sml.SocialMediaId ,sml.SocialMediaLink FROM camps AS c JOIN `social media lists` AS sml on c.CampId = sml.CampId WHERE c.CampId = ?', [campId])
    //取得開放日
    const row3 = await req.mysql.queryAsync('SELECT cod.CampOpenDayId, cod.CampOpenDay FROM `camp open day lists` AS codl JOIN `camp open days` AS cod ON cod.CampopenDayId = codl.CampopenDayId WHERE CampId = ?', [campId])
    //取得tag
    const row4 = await req.mysql.queryAsync('SELECT CampId as campId, ctl.CampTagId AS campTagId,CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ?', [campId])

    const row5 = await req.mysql.queryAsync('SELECT * FROM `camp photos` WHERE CampId = ?', [campId])
    const row6 = await req.mysql.queryAsync('SELECT a.AreaId ,a.AreaName, a.WeekdayPrice, a.WeekendPrice, a.AreaIntroduction, a.AreaMaxCount, a.AreaAvailableCount, a.AreaStyleId FROM `camps` AS c JOIN areas AS a on a.CampId = c.CampId WHERE c.CampId = ?', [campId])

    const row7 = await req.mysql.queryAsync('SELECT ap.AreaPhotoId, ap.areaId, ap.areaPhoto from camps As c JOIN `areas` AS a ON a.CampId = c.CampId JOIN `area phtots` AS ap ON ap.areaId = a.areaId WHERE c.CampId = ?', [campId])
    data['campInfo'] = JSON.parse(JSON.stringify(row1));
    data['socialMedia'] = JSON.parse(JSON.stringify(row2));
    data['campOpenDay'] = JSON.parse(JSON.stringify(row3));
    data['tag'] = JSON.parse(JSON.stringify(row4));
    data['photo'] = JSON.parse(JSON.stringify(row5));
    data['Areas'] = JSON.parse(JSON.stringify(row6));
    data['areasPhoto'] = JSON.parse(JSON.stringify(row7));
    res.send(data)
})


// //!修改營區資訊
router.post('/campInfo/edit', async (req, res) => {
    const CampId = req.body.campId
    const CampName = req.body.campName
    const CampPhone = req.body.campPhone
    const CampAddress = req.body.campAddress
    const CampAltitude = req.body.campAltitude
    const CampGuide = req.body.campGuide

    const query1 = "UPDATE camps SET CampName=?, CampPhone=?, CampAddress=?, CampAltitude=?, CampGuide=? WHERE CampId=?"
    await req.mysql.query(query1, [CampName, CampPhone, CampAddress, CampAltitude, CampGuide, CampId])
    res.send("修改完成")
    // CampAddress, CampAltitude, CampGuide
    // UPDATE camps SET CampName='手漢瀑布露營區', CampPhone="09999999", CampAddress="", CampAltitude="", CampGuide="" WHERE CampId=1
})

router.post('/campInfo/delete/image/:campPhotoId', async (req, res) => {

    const campPhotoId = req.params.campPhotoId
    console.log(req.params)
    const query = "DELETE FROM `camp photos` WHERE `camp photos`.`CampPhotoId` = ?"
    await req.mysql.queryAsync(query, [campPhotoId])
    res.send("刪除成功")
    // console.log(`delete: ${campPhotoId}`)
})
//body版
router.post('/campInfo/delete/image', (req, res) => {
    // /:campPhotoId
    const campPhotoId = req.body.campPhotoId
    console.log(req.params)
    const query = "DELETE FROM `camp photos` WHERE `camp photos`.`CampPhotoId` = ?"
    req.mysql.queryAsync(query, [campPhotoId])
    res.send("刪除成功")
    // console.log(`delete: ${campPhotoId}`)
})
// console.log(`dboard: ${__dirname}`)

//首頁送post需求更新行事曆資訊
router.post('/calendar', async (req, res) => {
    const campId = req.body.campId;
    let selectedDate = req.body.selectedDate;
    console.log(`campId; ${campId}, selectedDate: ${selectedDate}`);

    const text = ""
    const data = {}

    //dailyOrder query
    // const rows1 = await req.mysql.queryAsync('SELECT orderId, campId, fq.areaDailyId, areaId, CONVERT_TZ(orderDate,"-08:00","+8:00") as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, DATE(orderDate) as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? AND DATE(AreaAvaliableDate) = ? ) AS sq ON fq.areaDailyId = sq.areaDailyId', [campId, selectedDate]);
    const rows1 = await req.mysql.queryAsync('SELECT orderId, campId, fq.areaDailyId, areaId, CONVERT_TZ(orderDate,"+00:00","+8:00") as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? AND DATE(AreaAvaliableDate) = ? ) AS sq ON fq.areaDailyId = sq.areaDailyId', [campId, selectedDate]);
    const rows2 = await req.mysql.queryAsync('SELECT campId, areaId, areaName FROM areas where campId = ?', [campId]);
    const rows3 = await req.mysql.queryAsync('SELECT areaId, SUM(reservedCount) AS reservedCount FROM (SELECT orderId, campId, fq.areaDailyId, areaId, orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, DATE(orderDate) as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? AND DATE(AreaAvaliableDate) = ? ) AS sq ON fq.areaDailyId = sq.areaDailyId) as gq GROUP BY areaId ASC', [campId, selectedDate]);

    data["dailyOrder"] = JSON.parse(JSON.stringify(rows1));

    data["areaInfo"] = JSON.parse(JSON.stringify(rows2));
    data["areaCount"] = JSON.parse(JSON.stringify(rows3));

    console.log(data);
    res.send(data);
})

//首頁靜態畫面
router.get('/calendar/:campId', async (req, res) => {
    const campId = req.params.campId;

    const data = {}
    //dailyOrder query
    const rows1 = await req.mysql.queryAsync('SELECT orderId, campId, fq.areaDailyId, areaId, CONVERT_TZ(orderDate,"+00:00","+08:00") as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? AND DATE(AreaAvaliableDate) = CURRENT_DATE ) AS sq ON fq.areaDailyId = sq.areaDailyId', [campId]);
    const rows2 = await req.mysql.queryAsync('SELECT campId, areaId, areaName FROM areas where campId = ?', [campId]);
    const rows3 = await req.mysql.queryAsync('SELECT areaId, SUM(reservedCount) AS reservedCount FROM (SELECT orderId, campId, fq.areaDailyId, areaId, orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, DATE(orderDate) as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? AND DATE(AreaAvaliableDate) = CURRENT_DATE ) AS sq ON fq.areaDailyId = sq.areaDailyId) as gq GROUP BY areaId ASC', [campId]);

    data["dailyOrder"] = JSON.parse(JSON.stringify(rows1));

    data["areaInfo"] = JSON.parse(JSON.stringify(rows2));
    data["areaCount"] = JSON.parse(JSON.stringify(rows3));

    console.log(data);
    res.send(data);
})

//訂單資訊
router.get('/order/:campId', async (req, res) => {
    const campId = req.params.campId;

    let data = {}
    //dailyOrder query
    const rows1 = await req.mysql.queryAsync('SELECT orderId, campId, fq.areaDailyId, areaId, areaName, convert_tz(orderDate,"+00:00","+08:00") as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, totalPrice, paymentStatus, orderStatus FROM (SELECT o.orderId, areaDailyId, DATE(orderDate) as orderDate, purchaserName, purchaserPhone, stayDateRange, reservedCount, (AreaPrice * ReservedCount) AS totalPrice, paymentStatus ,orderStatus  FROM orders AS o JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `order status` AS os ON o.OrderStatusId = os.OrderStatusId) AS fq JOIN (SELECT ad.areaDailyId, ad. AreaId, areaName ,campId FROM `area dailys` AS ad JOIN areas AS a ON a.AreaId=ad.AreaId WHERE campId = ? ) AS sq ON fq.areaDailyId = sq.areaDailyId', [campId]);

    data["dailyOrder"] = JSON.parse(JSON.stringify(rows1));

    console.log(`before: ${data}`);
    let temp = data;
    temp.dailyOrder = temp.dailyOrder.map((item, index) => { item.orderDate = item.orderDate.slice(0, 10); return item });
    data = temp;
    // console.log(data);
    // console.log(temp.dailyOrder);
    res.send(data);
})

//分析頁面更新
router.post('/analysis', async (req, res) => {
    const campId = req.body.campId;
    let start = req.body.start.split("年").join("-").split("月").join("-").split("日").join("");
    let end = req.body.end.split("年").join("-").split("月").join("-").split("日").join("");
    console.log('in');
    let data = {}
    //dailyOrder query
    const rows1 = await req.mysql.queryAsync('SELECT a.areaId, areaName,date(AreaAvaliableDate) as analDate, areaPrice, areaDailyMaxCount, areadailyAvailableCount, areaOrderedCount, avaliableStatus from `area dailys` AS ad JOIN areas AS a ON a.AreaId = ad.AreaId WHERE campId = ? AND date(AreaAvaliableDate)>=? AND date(AreaAvaliableDate)< ?', [campId, start, end]);
    const rows2 = await req.mysql.queryAsync('select areaId, areaName, sumAvaliableCount, sumOrderedCount, ROUND(sumOrderedCount/sumAvaliableCount,2) as orderedPercentage from (select areaId, areaName, sum(areaDailyAvailableCount) as sumAvaliableCount, sum(areaOrderedCount) as sumOrderedCount from (SELECT a.areaId, areaName,date(AreaAvaliableDate) as date, areaPrice, areaDailyMaxCount, areaDailyAvailableCount, areaOrderedCount, avaliableStatus from `area dailys` AS ad JOIN areas AS a ON a.AreaId = ad.AreaId WHERE campId = ? AND date(AreaAvaliableDate)>=? AND date(AreaAvaliableDate)< ?) as fq group by areaId, areaName) as sq', [campId, start, end]);
    const rows3 = await req.mysql.queryAsync('SELECT campId, areaId, areaName FROM areas where campId = ?', [campId]);
    data["areaInfo"] = JSON.parse(JSON.stringify(rows1));

    console.log(`before: ${data}`);
    let temp = data;
    temp.areaInfo = temp.areaInfo.map((item, index) => { item.analDate = item.analDate.slice(0, 10); return item });
    data = temp;

    data["areaOrderedPercentage"] = JSON.parse(JSON.stringify(rows2));
    data["areaName"] = JSON.parse(JSON.stringify(rows3));
    // console.log(data);
    // console.log(temp.dailyOrder);
    res.send(data);
    // res.send('ok');
})

//分析頁面 好像沒用到了？
router.get('/analysis/:campId', async (req, res) => {
    const campId = req.params.campId;
    let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
    let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
    console.log('in');
    let data = {}
    //dailyOrder query
    const rows1 = await req.mysql.queryAsync('SELECT a.areaId, areaName,date(AreaAvaliableDate) as analDate, areaPrice, areaDailyMaxCount, areadailyAvailableCount, areaOrderedCount, avaliableStatus from `area dailys` AS ad JOIN areas AS a ON a.AreaId = ad.AreaId WHERE campId = ? AND date(AreaAvaliableDate)>=? AND date(AreaAvaliableDate)< ?', [campId, start, end]);
    const rows2 = await req.mysql.queryAsync('select areaId, areaName, sumAvaliableCount, sumOrderedCount, ROUND(sumOrderedCount/sumAvaliableCount,2) as orderedPercentage from (select areaId, areaName, sum(areaDailyAvailableCount) as sumAvaliableCount, sum(areaOrderedCount) as sumOrderedCount from (SELECT a.areaId, areaName,date(AreaAvaliableDate) as date, areaPrice, areaDailyMaxCount, areaDailyAvailableCount, areaOrderedCount, avaliableStatus from `area dailys` AS ad JOIN areas AS a ON a.AreaId = ad.AreaId WHERE campId = ? AND date(AreaAvaliableDate)>=? AND date(AreaAvaliableDate)< ?) as fq group by areaId, areaName) as sq', [campId, start, end]);

    data["areaInfo"] = JSON.parse(JSON.stringify(rows1));

    console.log(`before: ${data}`);
    let temp = data;
    temp.areaInfo = temp.areaInfo.map((item, index) => { item.analDate = item.analDate.slice(0, 10); return item });
    data = temp;

    data["areaOrderedPercentage"] = JSON.parse(JSON.stringify(rows2));
    // console.log(data);
    // console.log(temp.dailyOrder);
    res.send(data);
    // res.send('ok');
})


module.exports = router