const express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

const router = express.Router()



//取得使用者資料 ： http://localhost:5000/api/account/
router.get('/register', (req, res) => {
  res.send("account");
})

router.post('/register', async (req, res) => {
  const memberEmail = req.body.memberEmail;
  const memberPassword = req.body.memberPassword;
  const memberName = req.body.memberName;
  const memberPhone = req.body.memberPhone;
  // console.log(memberEmail, memberPassword, memberName)
  await req.mysql.query("SELECT * FROM `members` WHERE MemberEmail = ?", [memberEmail], (err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    }

    if (result.length > 0) {
      console.log(result)
      res.send({ registered: false, msg: "Email已註冊，請更換Email" })
    } else {
      //將密碼加密
      bcrypt.hash(memberPassword, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
        req.mysql.query("INSERT INTO members (MemberEmail, MemberPassword, MemberName, MemberPhone) VALUES (?, ?, ?, ?)", [memberEmail, hash, memberName, memberPhone], (err, rows) => {
          if (err) {
            res.send(err)
            console.log(err)
          } else {
            res.send({ registered: true, msg: "註冊成功" })
          }
        }
        )
      })
    }
  })
})

//確認使用者是否登入使用者
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post('/login', async (req, res) => {
  const memberEmail = req.body.memberEmail;
  const memberPassword = req.body.memberPassword;
  const token = uuidv4()

  // SELECT * FROM `members` WHERE MemberEmail = "abeChen@gmail.com"
  //輸入帳號或email 皆可
  await req.mysql.query(
    "SELECT * FROM `members` WHERE MemberEmail = ?",
    [memberEmail],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }

      // console.log(result[0])
      if (result.length > 0) {
        bcrypt.compare(memberPassword, result[0].MemberPassword, (error, response) => {
          if (response) {
            // let Auth = {}
            req.session.user = result;
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
        res.send({ message: "帳號或密碼錯誤" })
        // res.send({message: "User doesn't exist"})
      }
    }
  );
});

router.get('/logout', (req, res) => {
  res.cookie("userId", "", { expires: new Date() })
  req.session.destroy(function () {
    req.session = null;
  });
  console.log(req.session)
  res.send("Logout!")
})

//!修改使用者資料
router.patch('/edit', async (req, res) => {
  const memberName = req.body.memberName;
  const memberPhone = req.body.memberPhone;
  const memberId = req.body.memberId;

  const query1 = "UPDATE `members` SET  `membername` = ?, `memberphone` = ?  WHERE `memberid` = ?  ;"
  await req.mysql.queryAsync(query1, [memberName, memberPhone, memberId])

  const query2 = "SELECT * FROM `members` WHERE MemberId = ?"
  await req.mysql.query(query2, [memberId], (err, result) => {
    if (err) {
      res.send(err)
    }
    req.session.user = result
    res.send(result)
  })

  // res.send("修改完成")
})


// 取得使用者的訂單
// router.get('/order', async (req, res) => {
//   const memberId = req.body.memberId;
//   const data = {};
//   const orderCampIdList = [];
//   const orderCampText = 'SELECT o.orderId, o.OrderDate, o.PurchaserName, o.StayDateRange, od.ReservedCount, pm.PaymentMethod, o.PaymentAmount, c.CampId,c.CampName, c.CampAddress,c.CampPhone, co.CampOwnerName, cl.cityName,  ork.RankingText, a.AreaName from orders AS o JOIN `order details` as od ON o.OrderId = od.OrderId JOIN `area dailys` as ad ON ad.AreaDailyId = od.AreaDailyId JOIN areas as a ON a.AreaId = ad.AreaId JOIN camps as c ON a.CampId = c.CampId JOIN `camp owners` as co ON c.CampOwnerId = co.CampOwnerId JOIN `city lists` as cl ON c.CityId = cl.CityId JOIN `payment methods` as pm ON pm.PaymentMethodId = o.PaymentMethodId JOIN `order rankings` as ork ON ork.orderId = o.OrderId WHERE MemberId = ?'
//   const row1 = await req.mysql.queryAsync(orderCampText, [memberId]);
//   data["orders"] = JSON.parse(JSON.stringify(row1));
//   //將查到的id存在陣列用在接下來的查詢
//   JSON.parse(JSON.stringify(row1)).map((item, index) => (orderCampIdList[index] = item.CampId));
//   let result = orderCampIdList.filter(function (element, index, arr) {
//     return arr.indexOf(element) === index;
//   });
//   console.log(result)
// console.log(orderCampIdList.length)
router.get('/order/:memberId', async (req, res) => {
  const memberId = req.params.memberId;
  console.log(memberId)
  const data = {};
  const orderCampIdList = [];
  const orderCampText = 'SELECT DISTINCT o.orderId, o.OrderDate, o.PurchaserName, o.StayDateRange, od.ReservedCount, pm.PaymentMethod, o.PaymentAmount, c.CampId,c.CampName, c.CampAddress,c.CampPhone, co.CampOwnerName, cl.cityName, a.AreaName from orders AS o JOIN `order details` as od ON o.OrderId = od.OrderId JOIN `area dailys` as ad ON ad.AreaDailyId = od.AreaDailyId JOIN areas as a ON a.AreaId = ad.AreaId JOIN camps as c ON a.CampId = c.CampId JOIN `camp owners` as co ON c.CampOwnerId = co.CampOwnerId JOIN `city lists` as cl ON c.CityId = cl.CityId JOIN `payment methods` as pm ON pm.PaymentMethodId = o.PaymentMethodId WHERE MemberId = ? AND DATE(AreaAvaliableDate) > CURRENT_DATE'
  // JOIN `order rankings` as ork ON ork.orderId = o.OrderId
  const row1 = await req.mysql.queryAsync(orderCampText, [memberId]);
  data["orders"] = JSON.parse(JSON.stringify(row1));
  //將查到的id存在陣列用在接下來的查詢
  JSON.parse(JSON.stringify(row1)).map((item, index) => (orderCampIdList[index] = item.CampId));
  let result = orderCampIdList.filter(function (element, index, arr) {
    return arr.indexOf(element) === index;
  });

  console.log(`type of result: ${typeof result}`)
  console.log(result)
  console.log(`orderCampIdList:${orderCampIdList}`);
  console.log(`result(filter same id): ${result}`);
  // if (result.length === 0) {
  //   res.send("無訂單資訊")
  // }
  // console.log(orderCampIdList.length)
  //若無訂單資料則回傳無訂單
  if (result.length > 0) {
    let orderRankingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking, COUNT(*) as count FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId "
    let orderCampTagText = 'SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId '
    let orderCampPhotoText = 'SELECT DISTINCT CampId as campId, CampPhoto as campPhoto FROM `camp photos`'
    for (let i = 0; i < result.length; i++) {
      if (i == 0) {
        orderCampTagText += "WHERE CampId = ? ";
        orderRankingText += "WHERE CampId = ? ";
        orderCampPhotoText += "WHERE CampId = ? ";
      } else {

        orderCampTagText += "OR CampId = ? ";
        orderRankingText += "OR CampId = ? ";
        orderCampPhotoText += "OR CampId = ? ";
      }
    }
    orderRankingText += "GROUP BY CampId"
    console.log(orderRankingText);
    const row2 = await req.mysql.queryAsync(orderCampTagText, result);
    const row3 = await req.mysql.queryAsync(orderRankingText, result);
    const row4 = await req.mysql.queryAsync(orderCampPhotoText, result);

    data['orderCampTag'] = JSON.parse(JSON.stringify(row2));
    data['orderRanking'] = JSON.parse(JSON.stringify(row3));
    data['orderCampPhoto'] = JSON.parse(JSON.stringify(row4));
  }

  //過去訂單
  const pastOrderCampIdList = [];
  const pastOrderCampText = 'SELECT DISTINCT o.orderId, o.OrderDate, o.PurchaserName, o.StayDateRange, od.ReservedCount, pm.PaymentMethod, o.PaymentAmount, c.CampId,c.CampName, c.CampAddress,c.CampPhone, co.CampOwnerName, cl.cityName, a.AreaName, AreaAvaliableDate from orders AS o JOIN `order details` as od ON o.OrderId = od.OrderId JOIN `area dailys` as ad ON ad.AreaDailyId = od.AreaDailyId JOIN areas as a ON a.AreaId = ad.AreaId JOIN camps as c ON a.CampId = c.CampId JOIN `camp owners` as co ON c.CampOwnerId = co.CampOwnerId JOIN `city lists` as cl ON c.CityId = cl.CityId JOIN `payment methods` as pm ON pm.PaymentMethodId = o.PaymentMethodId WHERE MemberId = ? AND DATE(AreaAvaliableDate) <= CURRENT_DATE'
  const row5 = await req.mysql.queryAsync(pastOrderCampText, [memberId]);
  data["pastOrders"] = JSON.parse(JSON.stringify(row5));
  JSON.parse(JSON.stringify(row5)).map((item, index) => (pastOrderCampIdList[index] = item.CampId));
  let pastResult = pastOrderCampIdList.filter(function (element, index, arr) {
    return arr.indexOf(element) === index;
  });

  console.log(`pastOrderCampIdList: ${pastOrderCampIdList}`);
  console.log(`pastResult(filtered same id): ${pastResult}`);

  if (pastResult.length > 0) {
    let pastOrderRankingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking, COUNT(*) as count FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId "
    let pastOrderCampTagText = 'SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId '
    let pastOrderCampPhotoText = 'SELECT DISTINCT CampId as campId, CampPhoto as campPhoto FROM `camp photos`'
    let pastOrderCamprankedText = 'SELECT o.orderId, rankingName, rankingTime, RankingText FROM `order rankings` AS ora JOIN orders AS o ON o.OrderId = ora.OrderId WHERE memberId = ?'
    for (let i = 0; i < pastResult.length; i++) {
      if (i == 0) {
        pastOrderCampTagText += "WHERE CampId = ? ";
        pastOrderRankingText += "WHERE CampId = ? ";
        pastOrderCampPhotoText += "WHERE CampId = ? ";
      } else {

        pastOrderCampTagText += "OR CampId = ? ";
        pastOrderRankingText += "OR CampId = ? ";
        pastOrderCampPhotoText += "OR CampId = ? ";
      }
    }
    pastOrderRankingText += "GROUP BY CampId"
    console.log(pastOrderRankingText);
    const row6 = await req.mysql.queryAsync(pastOrderCampTagText, pastResult);
    const row7 = await req.mysql.queryAsync(pastOrderRankingText, pastResult);
    const row8 = await req.mysql.queryAsync(pastOrderCampPhotoText, pastResult);
    const row9 = await req.mysql.queryAsync(pastOrderCamprankedText, [memberId]);

    data['pastOrderCampTag'] = JSON.parse(JSON.stringify(row6));
    data['pastOrderRanking'] = JSON.parse(JSON.stringify(row7));
    data['pastOrderCampPhoto'] = JSON.parse(JSON.stringify(row8));
    data['pastOrderCampRanked'] = JSON.parse(JSON.stringify(row9));
  }


  res.send(data);
  // console.log(JSON.parse(JSON.stringify(row1)));
})

// 新增 order review
router.post('/review', async (req, res) => {

})

// SELECT * FROM `favorites` f JOIN camps c ON f.campid = c.CampId where MemberId = 1
//SELECT * FROM `favorites` f JOIN camps c ON f.campid = c.CampId JOIN `city lists` cl on c.CityId = cl.cityid where MemberId = 2

// 取得所有wish
router.get('/wish/:memberId', async (req, res) => {
  console.log(req.query);
  console.log(req.params);
  const memberId = req.params.memberId;
  let start;
  let end;
  if (!!req.query.start) { start = req.query.start.split("年").join("-").split("月").join("-").split("日").join(""); }
  if (!!req.query.end) { end = req.query.end.split("年").join("-").split("月").join("-").split("日").join(""); }
  console.log(memberId, start, end);
  const data = {};
  let favoriteCampIdList = [];
  const row2 = await req.mysql.queryAsync("SELECT campId FROM favorites WHERE MemberId = ?", [memberId]);
  const row3 = await req.mysql.queryAsync("SELECT cityName, cityPhoto,COUNT(*) AS campCount, c.cityId FROM camps AS c JOIN favorites AS f ON c.CampId = f.CampId JOIN `city lists` AS cl ON c.CityId = cl.CityId WHERE memberId = ? GROUP BY cityName,cityPhoto, c.cityId", [memberId]);
  data['favoriteId'] = JSON.parse(JSON.stringify(row2));
  data['lists'] = JSON.parse(JSON.stringify(row3));
  favoriteCampIdList = data.favoriteId.map((item, index) => item.campId);

  let wishText = "SELECT fq.campId, fq.campName, fq.cityId, fq.cityName, fq.minPrice AS areaPrice FROM (SELECT c.campId, campName, c.cityId,cityName, MIN(areaPrice) AS minPrice FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl.cityId JOIN areas AS a ON c.CampId=a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `favorites` AS f ON f.campId = c.campId WHERE areaAvaliableDate >= ? AND areaAvaliableDate < ? AND avaliableStatus = 1  AND f.memberId = ? GROUP BY c.campId, campName, cityId, cityName) AS fq";
  //根據營區名稱或是地點找包含place內容 且 日期在start及end之間有 campAmount數量的帳篷之營區
  const rowsWish = await req.mysql.queryAsync(wishText, [start, end, memberId]);
  console.log(wishText);
  //searchCampTag sql query敘述
  let searchTagText = "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId ";
  let searchRankingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId ";
  let searchPhotoText = "SELECT DISTINCT CampId as campId, CampPhoto as campPhoto FROM `camp photos`";
  // for迴圈用來變更query長度 對應到[]
  for (let i = 0; i < favoriteCampIdList.length; i++) {
    if (i == 0) {
      searchTagText += "WHERE CampId = ? ";
      searchRankingText += "WHERE CampId = ? ";
      searchPhotoText += "WHERE CampId = ? ";
    } else {
      searchTagText += "OR CampId = ? ";
      searchRankingText += "OR CampId = ? ";
      searchPhotoText += "OR CampId = ? ";
    }
  }
  searchRankingText += "GROUP BY CampId";

  // console.log(searchTagText);
  // console.log(searchRankingText);

  //searchCampTag
  const rows3 = await req.mysql.queryAsync(searchTagText, favoriteCampIdList);
  // searchCampRanking
  const rows4 = await req.mysql.queryAsync(searchRankingText, favoriteCampIdList);
  //searchCampPhoto
  const rows5 = await req.mysql.queryAsync(searchPhotoText, favoriteCampIdList);
  //search頁面靜態資料
  data['wishCamp'] = JSON.parse(JSON.stringify(rowsWish));
  data['wishCampTag'] = JSON.parse(JSON.stringify(rows3));
  data['wishCampRanking'] = JSON.parse(JSON.stringify(rows4));
  data['wishCampPhoto'] = JSON.parse(JSON.stringify(rows5));



  res.send(data);
})

// {
//   "favoriteId": [
//       {
//           "campId": 1
//       },
//       {
//           "campId": 2
//       },
//       {
//           "campId": 3
//       },
//       {
//           "campId": 4
//       },
//       {
//           "campId": 5
//       },
//       {
//           "campId": 9
//       },
//       {
//           "campId": 10
//       },
//       {
//           "campId": 11
//       },
//       {
//           "campId": 12
//       }
//   ],
//   "lists": [
//       {
//           "cityName": "台中市",
//           "campCount": 1,
//           "cityId": 4
//       },
//       {
//           "cityName": "新北市",
//           "campCount": 1,
//           "cityId": 2
//       },
//       {
//           "cityName": "桃園市",
//           "campCount": 7,
//           "cityId": 3
//       }
//   ],
//   wishCamp: [
//     { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
//     { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
//     { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
//     { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
// ],
// wishCampPhoto: [
//     { campId: 1, campPhoto: 'https://picsum.photos/id/128/300/200' },
//     { campId: 2, campPhoto: 'https://picsum.photos/id/128/300/200' },
//     { campId: 3, campPhoto: 'https://picsum.photos/id/128/300/200' },
//     { campId: 4, campPhoto: 'https://picsum.photos/id/128/300/200' },
// ],
// wishCampTag: [
//     { campId: 1, tagName: '近水源喔' },
//     { campId: 1, tagName: '雲海雲' },
//     { campId: 1, tagName: '雲幹喔' },
//     { campId: 1, tagName: '雲海海' },
//     { campId: 2, tagName: '雲海雲' },
//     { campId: 2, tagName: '近水源喔' },
//     { campId: 2, tagName: '雲海喔' },
//     { campId: 2, tagName: '雲海海' },
//     { campId: 3, tagName: '雲海雲' },
//     { campId: 3, tagName: '雲海喔' },
//     { campId: 3, tagName: '近水源喔' },
//     { campId: 3, tagName: '雲海海' },
//     { campId: 4, tagName: '雲海雲' },
//     { campId: 4, tagName: '雲海喔' },
//     { campId: 4, tagName: '雲海海' },
//     { campId: 4, tagName: '近水源喔' },
// ],
// wishCampRanking: [
//     { campId: 1, ranking: 4.3, count: 45 },
//     { campId: 2, ranking: 4.7, count: 200 },
//     { campId: 3, ranking: 4.8, count: 150 },
//     { campId: 4, ranking: 4.4, count: 125 },
// ]
// }

router.get('/wish/campId/:memberId', async (req, res) => {
  const memberId = req.params.memberId;

  console.log(memberId);
  const data = {};

  const row2 = await req.mysql.queryAsync("SELECT campId FROM favorites WHERE MemberId = ?", [memberId]);
  data['favoriteId'] = JSON.parse(JSON.stringify(row2));


  res.send(data);
})


// 新增wish
router.post('/wish/add', async (req, res) => {
  const memberId = req.body.memberId;
  const campId = req.body.campId;
  await req.mysql.queryAsync('INSERT INTO `favorites` (`MemberId`, `CampId`) VALUES (?, ?);', [memberId, campId]);
  res.send(`add ${campId} into favorite list for member ${memberId}`);
})

// 刪除wish
router.post('/wish/delete', async (req, res) => {
  const memberId = req.body.memberId;
  const campId = req.body.campId;
  await req.mysql.queryAsync('DELETE FROM `favorites` WHERE MemberId = ? AND CampId = ?;', [memberId, campId]);
  res.send(`remove ${campId} from favorite list for member ${memberId}`);
})


// http://localhost:5000/account/api/comment
//新增評價
router.post("/comment", async (req, res) => {
  const orderId = req.body.orderId
  const rankingName = req.body.rankingName // string
  const bathroomRanking = req.body.bathroomRanking // int(1)
  const transportRanking = req.body.transportRanking // int(1)
  const facilityRanking = req.body.facilityRanking // int(1)
  const serviceRanking = req.body.serviceRanking // int(1)
  const sceneryRanking = req.body.sceneryRanking // int(1)
  const rankingText = req.body.rankingText  // string

  queryText = "INSERT INTO `order rankings` (OrderId, RankingName, BathroomRanking, TransportRanking, FacilityRanking, ServiceRanking, SceneryRanking, RankingText) VALUES (?, ?, ?, ?, ?, ? ,?, ?);"

  await req.mysql.queryAsync(queryText, [orderId, rankingName, bathroomRanking, transportRanking, facilityRanking, serviceRanking, sceneryRanking, rankingText])
  res.send(`add orderId: ${orderId} comment`)
})



module.exports = router