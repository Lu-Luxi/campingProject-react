const express = require('express');
const router = express.Router();

// 取得主頁資料 : http://localhost:5000/
router.get('/', async function (req, res) {
  //回傳給首頁預設的data object
  let data = {};
  let hotCampIdList = [];
  let recommendedCampIdList = [0, 0, 0, 0, 0];
  //取得所有營區名字以及地址
  //根據訂單銷售找出前五名hotCampId 且在今天到明天仍有空位的 這個要擴充資料庫測試一下(目前日期部分故意用相反)
  const rowsHot = await req.mysql.queryAsync(
    // "SELECT CampId, COUNT(OrderId) as orderCount FROM `order details` as od JOIN `area dailys` as ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a on ad.AreaId = a.AreaId WHERE DATE(ad.AreaAvaliableDate) = CURDATE()  AND ad.AreaDailyAvailableCount > ad.AreaOrderedCount GROUP BY CampId ORDER BY COUNT(OrderId) DESC LIMIT 5", []);
    "SELECT fq.campId AS CampId FROM (SELECT DISTINCT campId FROM `area dailys` AS ad JOIN areas as a ON a.AreaId = ad.AreaId WHERE DATE(ad.AreaAvaliableDate) = CURDATE()  AND ad.AreaDailyAvailableCount > ad.AreaOrderedCount ) AS fq JOIN ( SELECT a.campId, COUNT(o.OrderId) AS count FROM orders AS o JOIN `order details` AS od on o.OrderId = od.OrderId JOIN `order rankings` AS ora ON o.OrderId = ora.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a on ad.AreaId = a.AreaId GROUP BY a.campId ) AS sq ON fq.campId = sq.campId ORDER BY count DESC LIMIT 4", []);
  //將查到的id存在陣列用在接下來的查詢
  JSON.parse(JSON.stringify(rowsHot)).map((item, index) => (hotCampIdList[index] = item.CampId));

  //根據評分找出前五名recommendedCampId 且在今天到明天仍有空位的 這個要擴充資料庫測試一下(目前日期部分故意用相反)
  const rowsRecommended = await req.mysql.queryAsync(
    // "SELECT CampId as campId FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE DATE(ad.AreaAvaliableDate) = CURDATE() AND ad.AreaDailyAvailableCount > ad.AreaOrderedCount GROUP BY CampId ORDER BY SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/COUNT(SceneryRanking) DESC LIMIT 5", []);
    "SELECT fq.campId FROM (SELECT DISTINCT campId FROM `area dailys` AS ad JOIN areas as a ON a.AreaId = ad.AreaId WHERE DATE(ad.AreaAvaliableDate) = CURDATE()  AND ad.AreaDailyAvailableCount > ad.AreaOrderedCount ) AS fq JOIN ( SELECT a.campId,ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking FROM orders AS o JOIN `order details` AS od on o.OrderId = od.OrderId JOIN `order rankings` AS ora ON o.OrderId = ora.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a on ad.AreaId = a.AreaId GROUP BY a.campId ) AS sq ON fq.campId = sq.campId ORDER BY ranking DESC LIMIT 4", []);
  //將查到的id存在陣列用在接下來的查詢
  JSON.parse(JSON.stringify(rowsRecommended)).map((item, index) => (recommendedCampIdList[index] = item.campId));

  //explore
  const rows1 = await req.mysql.queryAsync(
    "SELECT CityName as cityName,cityPhoto, count(CampId) as campCount FROM `city lists` as cl JOIN camps as c on cl.CityId = c.CityId GROUP BY CityName,cityPhoto ORDER BY campCount DESC LIMIT 5", []);

  let hotCampText = "SELECT c.CampId as campId, campName, cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId ";
  let hotCampTagText = "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId ";
  let hotCampRangingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId ";
  let hotCampPhotoText = "SELECT CampId as campId, CampPhoto as campPhoto FROM `camp photos` ";

  for (let i = 0; i < hotCampIdList.length; i++) {
    if (i == 0) {
      hotCampText += "WHERE c.CampId = ? ";
      hotCampTagText += "WHERE CampId = ? ";
      hotCampRangingText += "WHERE CampId = ? ";
      hotCampPhotoText += "WHERE CampId = ? ";
    } else {
      hotCampText += "OR c.CampId = ? ";
      hotCampTagText += "OR CampId = ? ";
      hotCampRangingText += "OR CampId = ? ";
      hotCampPhotoText += "OR CampId = ? ";
    }
  }
  hotCampText += "AND AreaDailyAvailableCount > AreaOrderedCount  GROUP BY CampId,campName,cityName ORDER BY CampId, AreaPrice LIMIT 4";
  hotCampRangingText += "GROUP BY CampId";
  hotCampPhotoText += "ORDER BY campPhotoId DESC ";

  //hotCamp
  const rows2 = await req.mysql.queryAsync(hotCampText, hotCampIdList);
  //hotCampTag
  const rows3 = await req.mysql.queryAsync(hotCampTagText, hotCampIdList);
  //hotCampRanking
  const rows4 = await req.mysql.queryAsync(hotCampRangingText, hotCampIdList);
  //hotCampPhoto
  const rows5 = await req.mysql.queryAsync(hotCampPhotoText, hotCampIdList);
  //recommendedCamp
  const rows6 = await req.mysql.queryAsync(
    "SELECT c.CampId as campId, c.CampName as campName, cl.CityName AS cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId WHERE c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? AND AreaDailyAvailableCount > AreaOrderedCount GROUP BY c.CampId,c.CampName,cl.CityName ORDER BY CampId, AreaPrice LIMIT 4", recommendedCampIdList);
  //recommendedCampTag
  const rows7 = await req.mysql.queryAsync(
    "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ?", recommendedCampIdList);
  //recommendedCampRanking
  const rows8 = await req.mysql.queryAsync(
    "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? GROUP BY CampId", recommendedCampIdList);
  //recommendedCampPhoto
  const rows9 = await req.mysql.queryAsync(hotCampPhotoText, recommendedCampIdList);
  data['explore'] = JSON.parse(JSON.stringify(rows1));
  data['hotCamp'] = JSON.parse(JSON.stringify(rows2));
  data['hotCampTag'] = JSON.parse(JSON.stringify(rows3));
  data['hotCampRanking'] = JSON.parse(JSON.stringify(rows4));
  data['hotCampPhoto'] = JSON.parse(JSON.stringify(rows5));
  data['recommendedCamp'] = JSON.parse(JSON.stringify(rows6));
  data['recommendedCampTag'] = JSON.parse(JSON.stringify(rows7));
  data['recommendedCampRanking'] = JSON.parse(JSON.stringify(rows8));
  data['recommendedCampPhoto'] = JSON.parse(JSON.stringify(rows9));
  res.send(data);

  console.log(data);
  console.log(hotCampIdList);
  // console.log(recommendedCampIdList);
  //   {
  //     explore: [
  //         { cityName: '新竹縣', campCount: 38 },
  //         { cityName: '南投縣', campCount: 54 },
  //         { cityName: '苗栗縣', campCount: 27 },
  //         { cityName: '宜蘭縣', campCount: 18 },
  //         { cityName: '桃園市', campCount: 62 },
  //     ],
  //     cityImg: [],
  //     hotCamp: [
  //         { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
  //         { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
  //         { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
  //         { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
  //     ],
  //     hotCampTag: [
  //         { campId: 1, tagName: '近水源喔' },
  //         { campId: 1, tagName: '雲海雲' },
  //         { campId: 1, tagName: '雲海喔' },
  //         { campId: 1, tagName: '雲海海' },
  //         { campId: 2, tagName: '雲海雲' },
  //         { campId: 2, tagName: '近水源喔' },
  //         { campId: 2, tagName: '雲海喔' },
  //         { campId: 2, tagName: '雲海海' },
  //         { campId: 3, tagName: '雲海雲' },
  //         { campId: 3, tagName: '雲海喔' },
  //         { campId: 3, tagName: '近水源喔' },
  //         { campId: 3, tagName: '雲海海' },
  //         { campId: 4, tagName: '雲海雲' },
  //         { campId: 4, tagName: '雲海喔' },
  //         { campId: 4, tagName: '雲海海' },
  //         { campId: 4, tagName: '近水源喔' },
  //     ],
  //     hotCampRanking: [
  //         { campId: 1, ranking: 4.3, count: 45 },
  //         { campId: 2, ranking: 4.7, count: 200 },
  //         { campId: 3, ranking: 4.8, count: 150 },
  //         { campId: 4, ranking: 4.4, count: 125 },
  //     ],
  //     recommendedCamp: [
  //         { campId: 1, campName: '喜洋洋露營區', cityName: '桃園市', areaPrice: 1200 },
  //         { campId: 2, campName: '鐵獅玉玲瓏露營區', cityName: '桃園市', areaPrice: 1300 },
  //         { campId: 3, campName: '台中資策會露營區', cityName: '桃園市', areaPrice: 1400 },
  //         { campId: 4, campName: '長興山水靜露營區', cityName: '桃園市', areaPrice: 1500 },
  //     ],
  //     recommendedCampTag: [
  //         { campId: 1, tagName: '近水源喔' },
  //         { campId: 1, tagName: '雲海雲' },
  //         { campId: 1, tagName: '雲海喔' },
  //         { campId: 1, tagName: '雲海海' },
  //         { campId: 2, tagName: '雲海雲' },
  //         { campId: 2, tagName: '近水源喔' },
  //         { campId: 2, tagName: '雲海喔' },
  //         { campId: 2, tagName: '雲海海' },
  //         { campId: 3, tagName: '雲海雲' },
  //         { campId: 3, tagName: '雲海喔' },
  //         { campId: 3, tagName: '近水源喔' },
  //         { campId: 3, tagName: '雲海海' },
  //         { campId: 4, tagName: '雲海雲' },
  //         { campId: 4, tagName: '雲海喔' },
  //         { campId: 4, tagName: '雲海海' },
  //         { campId: 4, tagName: '近水源喔' },
  //     ],
  //     recommendedCampRanking: [
  //         { campId: 1, ranking: 4.3, count: 45 },
  //         { campId: 2, ranking: 4.7, count: 200 },
  //         { campId: 3, ranking: 4.8, count: 150 },
  //         { campId: 4, ranking: 4.4, count: 125 },
  //     ]
  // }
});




module.exports = router;

