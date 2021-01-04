const express = require('express');
const router = express.Router();


// 取得營區介紹頁的資料 : http://localhost:5000/camps/:req.params.campid
router.get('/', async function (req, res) {

  let campId = req.query.id;
  let areaId = req.query.areaid;
  let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
  let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
  let campAmount = req.query.campAmount;
  console.log(`campId: ${campId}, areaId: ${areaId}, start: ${start}, end: ${end}, campAmount: ${campAmount}`);

  const getDays = (fromDate, toDate) => {
    let tempFrom = fromDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
    let tempTo = toDate.split("年").join("-").split("月").join("-").split("日").join("").split("-");
    let dt1 = new Date(tempFrom[0], tempFrom[1], tempFrom[2]);
    let dt2 = new Date(tempTo[0], tempTo[1], tempTo[2]);
    return ((dt2 - dt1) / (1000 * 60 * 60 * 24));
  }

  const data = {}

  //bookingCampInfo query
  const rows1 = await req.mysql.queryAsync('SELECT CampId AS campId, CampName AS campName, CityName AS cityName, CampPhone AS campPhone, CampAltitude AS campAltitude, CampAddress AS campAddress FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl. CityId WHERE campId = ?', [campId]);
  //bookingCampRanking
  const rows2 = await req.mysql.queryAsync('SELECT CampId AS campId,ROUND(AVG(bathroomRanking+transportRanking+facilityRanking+serviceRanking+sceneryRanking)/5,1) AS ranking, count(*) AS count FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ?  GROUP BY CampId', [campId]);
  //bookingCampAreaInfo
  // const rows3 = await req.mysql.queryAsync("SELECT * FROM (SELECT CampId AS campId, a.AreaId AS areaId, AreaName AS areaName, AreaStyle as areaStyle, min(areaDailyAvailableCount) AS areaLeft,count(areaDailyAvailableCount) AS dateCount, sum(areaPrice) AS totalPrice FROM areas AS a JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `area styles` AS ast ON a.AreaStyleId = ast.AreaStyleId WHERE campId = ? AND (AreaDailyAvailableCount - AreaOrderedCount) >= ? AND DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? GROUP BY CampId, a.AreaId, AreaName, AreaStyle) AS sub WHERE dateCount >= ? ", [campId, campAmount, start, end, campAmount]);
  const rows3 = await req.mysql.queryAsync('SELECT * FROM (SELECT CampId AS campId, a.AreaId AS areaId, AreaName AS areaName, AreaStyle as areaStyle, MIN(areaDailyAvailableCount) AS areaLeft, COUNT(DATE(AreaAvaliableDate)) AS dateCount, SUM(areaPrice) AS totalPrice FROM areas AS a JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `area styles` AS ast ON a.AreaStyleId = ast.AreaStyleId WHERE DATE(AreaAvaliableDate) >= ? AND DATE(AreaAvaliableDate) < ? AND CampId = ? AND a.AreaId = ?GROUP BY CampId, a.AreaId, AreaName, AreaStyle) AS subQuery WHERE areaLeft >= ? AND dateCount = ?', [start, end, campId, areaId, campAmount, getDays(req.query.start, req.query.end)]);
  //bookingCampAreaImage
  const rows4 = await req.mysql.queryAsync('SELECT areaId, areaPhoto FROM `area phtots` WHERE areaId = ?', [areaId]);

  data["bookingCampInfo"] = JSON.parse(JSON.stringify(rows1));
  data["bookingCampRanking"] = JSON.parse(JSON.stringify(rows2));
  data["bookingCampAreaInfo"] = JSON.parse(JSON.stringify(rows3));
  data["bookingCampAreaImage"] = JSON.parse(JSON.stringify(rows4));

  res.send(data)
  console.log(data)

})

// {
//   bookingCampInfo: [
//       {
//           campId: 1,
//           campName: '喜洋洋露營區',
//           cityName: '桃園市',
//           campPhone: '04-22223333',
//           campAltitude: 500,
//           campAddress: '台中市北屯區皮卡路二段511號',
//           campFacility: '麻將桌',
//       }
//   ],
//   bookingCampRanking: [
//       { campId: 1, ranking: 4.3, count: 45 },
//   ],
//   bookingCampAreaInfo: [
//       { campId: 1, areaId: 1, areaName: 'A區', areaStyle: '木棧板', areaLeft: 6, totalPrice: 3000 },
//   ],
//   bookingCampAreaImage: [
//       { areaId: 1, areaPhoto: 'https://picsum.photos/id/237/300/200' },
//   ],
// }



module.exports = router;

