const express = require('express');
const router = express.Router();

const getDays = (fromDate, toDate) => {
  let tempFrom = fromDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
  let tempTo = toDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
  let dt1 = new Date(tempFrom[0], tempFrom[1], tempFrom[2]);
  let dt2 = new Date(tempTo[0], tempTo[1], tempTo[2]);
  return ((dt2 - dt1) / (1000 * 60 * 60 * 24));
}


// 取得營區介紹頁的資料 : http://localhost:5000/camps/:req.params.campid
router.get('/camp/:campId', async function (req, res) {

  let campId = req.params.campId
  let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
  let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
  let campAmount = req.query.campAmount;
  console.log(`campId: ${campId}, start: ${start}, end: ${end}, campAmount: ${campAmount}`);

  const data = {}

  //campImage query
  const rows1 = await req.mysql.queryAsync('SELECT CampId as campId, CampPhotoId as campPhotoId, CampPhoto as campPhoto FROM `camp photos` WHERE CampId = ? ORDER BY CampPhotoId DESC', [campId]);
  //campInfo query
  const rows2 = await req.mysql.queryAsync('SELECT CampId AS campId, CampName AS campName, CityName AS cityName, CampPhone AS campPhone, CampAltitude AS campAltitude, CampAddress AS campAddress FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl. CityId WHERE campId = ?', [campId]);
  //campBussinessDay query 
  const rows3 = await req.mysql.queryAsync('SELECT CampId AS campId, campOpenDay AS day FROM `camp open day lists` AS codl JOIN `camp open days`AS cod ON codl.CampOpenDayId = cod.CampOpenDayId WHERE CampId = ?', [campId]);
  //campTag
  const rows4 = await req.mysql.queryAsync('SELECT CampId as campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ?', [campId]);
  //campRanking
  const rows5 = await req.mysql.queryAsync('SELECT campId, ROUND(AVG(ranking),1) AS ranking, ROUND(AVG(bathroomRanking),1) AS bathroomRanking, ROUND(AVG(transportRanking),1) AS transportRanking, ROUND(AVG(facilityRanking),1) AS facilityRanking, ROUND(AVG(serviceRanking),1) AS serviceRanking, ROUND(AVG(sceneryRanking),1) AS sceneryRanking, COUNT(*) as count FROM (SELECT campId, ROUND((BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/5,1) AS ranking, bathroomRanking, transportRanking, facilityRanking, serviceRanking, sceneryRanking FROM `order rankings`AS ora JOIN `order details` AS od ON ora.OrderId = od.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE campId = ?) AS subQuery GROUP BY campId', [campId]);
  //campMap

  //areaInfo
  // const rows7 = await req.mysql.queryAsync("SELECT * FROM (SELECT CampId AS campId, a.AreaId AS areaId, AreaName AS areaName, AreaStyle as areaStyle, min(areaDailyAvailableCount) AS areaLeft, count(areaDailyAvailableCount) AS dateCount, sum(areaPrice) AS totalPrice FROM areas AS a JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `area styles` AS ast ON a.AreaStyleId = ast.AreaStyleId WHERE campId = ? AND (AreaDailyAvailableCount - AreaOrderedCount) >= ? AND DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? GROUP BY CampId, a.AreaId, AreaName, AreaStyle) AS sub WHERE dateCount >= ? ", [campId, campAmount, start, end, campAmount]);
  const rows7 = await req.mysql.queryAsync('SELECT * FROM (SELECT CampId AS campId, a.AreaId AS areaId, AreaName AS areaName, AreaStyle as areaStyle, MIN(areaDailyAvailableCount) AS areaLeft, COUNT(DATE(AreaAvaliableDate)) AS dateCount, SUM(areaPrice) AS totalPrice FROM areas AS a JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `area styles` AS ast ON a.AreaStyleId = ast.AreaStyleId WHERE DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? AND CampId = ? GROUP BY CampId, a.AreaId, AreaName, AreaStyle) AS subQuery WHERE areaLeft >= ? AND dateCount = ?', [start, end, campId, campAmount, getDays(req.query.start, req.query.end)]);
  //areaImage
  const rows8 = await req.mysql.queryAsync("SELECT campId, a.AreaId, AreaPhoto FROM `area phtots` AS ap JOIN areas AS a ON ap.AreaId = a.AreaId WHERE campId = ?", [campId]);
  //campRankingDetail
  const rows9 = await req.mysql.queryAsync("SELECT campId, orderRankingId, DATE(rankingTime) rankingTime, rankingName, ROUND((BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/5,1) AS ranking, rankingText FROM `order rankings` AS ora JOIN `orders` AS o ON ora.orderId = o.orderId JOIN `order details` AS od ON o.orderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE campId = ? ORDER BY OrderRankingId DESC", [campId]);
  //campGuide
  const rows10 = await req.mysql.queryAsync("SELECT campId, campGuide FROM camps WHERE campId = ?", [campId]);
  //area image
  const rows11 = await req.mysql.queryAsync('SELECT campId, a.areaId, areaPhoto FROM `area phtots` AS ap JOIN areas AS a ON ap.AreaId = a.AreaId where campId = ?', [campId]);

  data["campImage"] = JSON.parse(JSON.stringify(rows1));
  data["campInfo"] = JSON.parse(JSON.stringify(rows2));
  data["campBussinessDay"] = JSON.parse(JSON.stringify(rows3));
  data["campTag"] = JSON.parse(JSON.stringify(rows4));
  data["campRanking"] = JSON.parse(JSON.stringify(rows5));
  // data["campMap"] = JSON.parse(JSON.stringify(rows6));
  data["areaInfo"] = JSON.parse(JSON.stringify(rows7));
  data["areaImage"] = JSON.parse(JSON.stringify(rows8));
  data["campRankingDetail"] = JSON.parse(JSON.stringify(rows9));
  data["campGuide"] = JSON.parse(JSON.stringify(rows10));
  data["areaImage"] = JSON.parse(JSON.stringify(rows11));



  res.send(data);
  console.log(data);

});

// {
//   campImage: [
//       { campId: 1, campPhotoId: 1, campPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId: 1, campPhotoId: 2, campPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId: 1, campPhotoId: 3, campPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId: 1, campPhotoId: 4, campPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId: 1, campPhotoId: 5, campPhoto: 'https://picsum.photos/id/237/300/200' },
//   ],
//   campInfo: [
//       {
//           campId: 1,
//           campName: '喜洋洋露營區',
//           cityName: '桃園市',
//           campPhone: '04-22223333',
//           campAltitude: 500,
//           campAddress: '台中市北屯區皮卡路二段511號',
//           campParking: '倒車入庫',
//           campFacility: '麻將桌',
//           campBathroom: '沒有廁所',
//           campSignal: '中華電信有訊號'
//       }
//   ],
//   campBussinessDay: [
//       { campId: 1, day: '星期五' },
//       { campId: 1, day: '星期六' },
//       { campId: 1, day: '星期日' },
//   ],
//   campTag: [
//       { campId: 1, tagName: '近水源喔' },
//       { campId: 1, tagName: '雲海雲' },
//       { campId: 1, tagName: '雲海喔' },
//       { campId: 1, tagName: '雲海海' }
//   ],
//   campRanking: [
//       { campId: 1, ranking: 4.3, bathroomRanking: 4.3, transportRanking: 4.5, facilityRanking: 4.2, serviceRanking: 4.5, sceneryRanking: 4.1, count: 45 },
//   ],
//   campMap: [

//   ],
//   areaInfo: [
//       { campId: 1, areaId: 1, areaName: 'A區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3000 },
//       { campId: 1, areaId: 2, areaName: 'B區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3400 },
//       { campId: 1, areaId: 3, areaName: 'C區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3800 },
//   ],
//   areaImage: [
//       { campId:1, areaId: 1, areaPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId:1, areaId: 2, areaPhoto: 'https://picsum.photos/id/237/300/200' },
//       { campId:1, areaId: 3, areaPhoto: 'https://picsum.photos/id/237/300/200' },
//   ],
//   campRankingDetail: [
//       { campId: 1, orderRankingId: 1, rankingTime: '2020-10-10', rankingName: '小明', ranking: 4.5, rankingText: '這是一個不錯的霧營區' },
//       { campId: 1, orderRankingId: 2, rankingTime: '2020-10-12', rankingName: '小滑', ranking: 4.4, rankingText: '這是一個不錯的霧營區2' },
//       { campId: 1, orderRankingId: 3, rankingTime: '2020-10-13', rankingName: '小陳', ranking: 4.3, rankingText: '這是一個不錯的霧營區3' },
//       { campId: 1, orderRankingId: 4, rankingTime: '2020-10-14', rankingName: '小王', ranking: 4.6, rankingText: '這是一個不錯的霧營區4' },
//   ],
//   campGuide: [
//       "進退營區時間假日進場時間：上午10:00以後。/假日退場時間：下午14:00以前。 ★ 連續假期(三天以上) 三天兩夜以上連續假日之期間凡有營位銜接需要，敬請露友配合當日進退場時間。 例如：連續假日第一天進場時間為上午10:00 以後，第二天離場時間中午13:00前。 連續假日第二天進場時間為下午14:00後，最後一天離場時間為14:00前。 ★ 週五(或前一晚) 提前進場 (限隔日續住者) 17:00~22:00 可入營，酌收每帳半價(現場收費)，17:00前到場，以整日收費計算，請於23:00前搭營完成，避免打擾已就寢露友。請於露營日2天前電話聯絡0937-723539營主確認是否有營位。 ★★連續假日期間、星期六晚上不提供夜衝服務★★"
//   ],
// }

router.post('/area/:areaId', async function (req, res) {

  let areaId = req.params.areaId
  console.log(`campId: ${areaId}`);

  const data = {}

  //campImage query
  const rows1 = await req.mysql.queryAsync('SELECT areaId, areaPhoto FROM `area phtots` WHERE areaId = ?', [areaId]);

  data["areaImage"] = JSON.parse(JSON.stringify(rows1));

  res.send(data)
  console.log(data)

})

router.get('/order', async function (req, res) {

  let campId = req.query.id;
  let areaId = req.query.areaid;
  let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
  let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
  let campAmount = req.query.campAmount;
  let paymentMethod = req.query.payMethod;
  console.log(`campId: ${campId}, areaId: ${areaId}, start: ${start}, end: ${end}, campAmount: ${campAmount}`);

  const data = {}

  // //campInfo query
  const rows1 = await req.mysql.queryAsync('SELECT CampId AS campId, CampName AS campName, CityName AS cityName, CampPhone AS campPhone, CampAltitude AS campAltitude, CampAddress AS campAddress FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl. CityId WHERE campId = ?', [campId]);
  // //areaInfo
  const rows2 = await req.mysql.queryAsync('SELECT * FROM (SELECT CampId AS campId, a.AreaId AS areaId, AreaName AS areaName, AreaStyle as areaStyle, MIN(areaDailyAvailableCount) AS areaLeft, COUNT(DATE(AreaAvaliableDate)) AS dateCount, SUM(areaPrice) AS totalPrice FROM areas AS a JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `area styles` AS ast ON a.AreaStyleId = ast.AreaStyleId WHERE DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? AND CampId = ? AND a.AreaId = ? GROUP BY CampId, a.AreaId, AreaName, AreaStyle) AS subQuery WHERE areaLeft >= ? AND dateCount = ?', [start, end, campId, areaId, campAmount, getDays(req.query.start, req.query.end)]);
  // //campOwnerInfo
  const rows3 = await req.mysql.queryAsync('SELECT campName, campAddress, campOwnerName, campOwnerPhone FROM `camp owners` AS co JOIN camps AS c ON co.CampOwnerId = c.CampOwnerId WHERE campId = ?', [campId]);


  data["campInfo"] = JSON.parse(JSON.stringify(rows1));
  data["areaInfo"] = JSON.parse(JSON.stringify(rows2));
  data["campOwnerInfo"] = JSON.parse(JSON.stringify(rows3));
  data["searchInfo"] = [{ "start": req.query.start, "end": req.query.end, "campAmount": campAmount, "dateCount": getDays(req.query.start, req.query.end), "paymentMethod": paymentMethod }];

  res.send(data);
  console.log(data);

});

router.post('/order', async (req, res) => {
  const purchaserName = req.body.purchaserName;
  const purchaserPhone = req.body.purchaserPhone;
  const purchaserEmail = req.body.purchaserEmail;
  const memberId = req.body.memberId;
  const paymentMethodId = req.body.paymentMethodId;
  const paymentStatusId = req.body.paymentStatusId;
  const paymentAmount = req.body.paymentAmount;
  const orderStatusId = req.body.orderStatusId;
  const start = req.body.start;
  const end = req.body.end;
  const areaId = req.body.areaId;
  const campAmount = req.body.campAmount;
  const dateCount = req.body.purchaserEmail
  let startQuery = req.body.start.split("年").join("-").split("月").join("-").split("日").join("");
  let endQuery = req.body.end.split("年").join("-").split("月").join("-").split("日").join("");

  console.log(`purchaserName:${purchaserName}, purchaserPhone: ${purchaserPhone}, purchaserEmail: ${purchaserEmail} `);
  console.log(`memberId:${memberId}, paymentMethodId: ${paymentMethodId}, paymentAmount: ${paymentAmount} `);
  console.log(`orderStatusId:${orderStatusId}, start: ${start}, end: ${end} `);
  console.log(`areaId:${areaId}, campAmount: ${campAmount}, startQuery: ${startQuery}, endQuery: ${endQuery}`);

  //用當前時間到小時加上兩碼當成目前訂單編號 初始值
  let date = new Date();
  console.log(date);
  let currentDateTime = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);

  let orderId = parseInt(date.getFullYear().toString().slice(2, 4) + ('00' + (date.getMonth() + 1)).slice(-2) + ('00' + date.getDate()).slice(-2) + (date.getHours() + 100).toString().substring(1) + '01');
  console.log(orderId);
  //transaction
  await req.mysql.queryAsync("SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED", []);
  await req.mysql.queryAsync("start transaction", []);

  //檢查目前最大的訂單編號
  let rows1 = await req.mysql.queryAsync('SELECT MAX(OrderId) AS maxOrderId FROM `orders` FOR UPDATE', []);
  let checkOrderId = JSON.parse(JSON.stringify(rows1));
  console.log(`目前最大訂單編號為${checkOrderId[0].maxOrderId}`);
  //如果序號比最大訂單號碼還小就用最大的為基礎加一
  if (orderId <= checkOrderId[0].maxOrderId) {
    orderId = checkOrderId[0].maxOrderId + 1;
  }
  console.log(orderId);

  //加入訂單
  await req.mysql.queryAsync('INSERT INTO orders (OrderId, MemberId, PurchaserName, PurchaserPhone, PurchaserEmail, OrderDate, PaymentMethodId, PaymentStatus, PaymentAmount, StayDateRange, OrderStatusId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)', [orderId, memberId, purchaserName, purchaserPhone, purchaserEmail, currentDateTime, paymentMethodId, paymentStatusId, paymentAmount, `${start} - ${end}`, orderStatusId]);
  //查詢area dailys相對應的項目
  let data = await req.mysql.queryAsync("SELECT * FROM `area dailys` WHERE AreaId = ? AND DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? for update", [areaId, startQuery, endQuery]);

  //陣列用來儲存areaId and areaPrice
  let areaDailyIdList = [];
  let areaDailyPriceList = [];

  //將訂單日期範圍指定的區域預約數量加一 可預約數量減一 (area dailys table)
  for (let i = 0; i < data.length; i++) {
    let AreaDailyId = data[i].AreaDailyId;
    let AreaDailyAvailableCount = data[i].AreaDailyAvailableCount;
    let AreaOrderedCount = data[i].AreaOrderedCount;

    console.log(`AreaDailyId: ${AreaDailyId}`);
    console.log(`Before: AreaDailyAvailableCount: ${AreaDailyAvailableCount}`);
    console.log(`Before: AreaOrderedCount: ${AreaOrderedCount}`);

    areaDailyIdList.push(data[i].AreaDailyId);
    areaDailyPriceList.push(data[i].AreaPrice);
    AreaDailyAvailableCount -= campAmount;
    await req.mysql.queryAsync(
      "UPDATE `area dailys` SET AreaDailyAvailableCount = ? where AreaDailyId = ?",
      [AreaDailyAvailableCount, AreaDailyId]);

    AreaOrderedCount += campAmount;
    await req.mysql.queryAsync(
      "UPDATE `area dailys` SET AreaOrderedCount = ? where AreaDailyId = ?",
      [AreaOrderedCount, AreaDailyId]);

    console.log(`After: AreaDailyAvailableCount: ${AreaDailyAvailableCount}`);
    console.log(`After: AreaOrderedCount: ${AreaOrderedCount}`);
  }

  //將訂單訊息加入訂單詳細資料表
  for (let i = 0; i < areaDailyIdList.length; i++) {
    let areaDailyId = areaDailyIdList[i];
    let areaPrice = areaDailyPriceList[i];
    await req.mysql.queryAsync("INSERT INTO `order details` (`OrderId`, `AreaDailyId`, `AreaPrice`, `ReservedCount`) VALUES (?, ?, ?, ?)", [orderId, areaDailyId, areaPrice, campAmount]);
    console.log('INSERT INTO done, order details ');
  }

  await req.mysql.queryAsync("COMMIT", []);
  res.send(`${orderId}`);

})

module.exports = router;

