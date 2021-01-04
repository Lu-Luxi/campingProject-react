const express = require('express');
const router = express.Router();

// 取得主頁資料 : http://localhost:5000/
router.get('/', async function (req, res) {
  //要有判斷是判斷是否有query 沒有則帶入預設值？
  // console.log(req.query); //typeof object
  // {
  //   place: '台中',
  //   start: '2020年11月20日',
  //   end: '2020年11月22日',
  //   campAmount: '2'
  // }
  // let page = ;
  let place = req.query.place;
  let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
  let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
  let campAmount = req.query.campAmount;
  // let tags = req.query.tags.split(",");
  // console.log(`tag: ${tags}, typeof tag: ${typeof tags}`);
  console.log(place);
  //初始化回傳給搜尋頁的data object
  let data = {};
  let searchCampIdList = [];
  // let searchText = "SELECT  campId, campName, cityName, min(totalPrice) AS minTotalPrice FROM (SELECT c.CampId as campId, c.CampName as campName, CityName AS cityName, SUM(AreaPrice) AS totalPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` as ad ON a.AreaId = ad.areaId JOIN `city lists` AS cl ON cl.CityId = c.CityId WHERE DATE(ad.areaAvaliableDate) >= ? AND ad.areaAvaliableDate < ? AND AreaDailyAvailableCount > (AreaOrderedCount + ?) AND CampName LIKE concat('%',?,'%') OR CityName LIKE concat('%',?,'%') GROUP BY c.CampId, c.CampName, CityName, a.AreaName) AS totalPrices GROUP BY campId, campName, cityName";
  // let searchText = "SELECT  campId, campName, cityName, sum(orderCount) AS orderCount, min(totalPrice) AS minTotalPrice, ROUND(AVG(ranking),1) AS avgRanking FROM (SELECT c.CampId as campId, c.CampName as campName, CityName AS cityName, COUNT(OrderDetailId) as orderCount,SUM(ad.AreaPrice) AS totalPrice, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` as ad ON a.AreaId = ad.areaId JOIN `city lists` AS cl ON cl.CityId = c.CityId JOIN `order details` as od on ad.AreaDailyId = od.AreaDailyId JOIN `order rankings` AS ora ON od.OrderId = ora.OrderId WHERE DATE(ad.areaAvaliableDate) >= ? AND ad.areaAvaliableDate < ? AND AreaDailyAvailableCount > (AreaOrderedCount + ?) AND AvaliableStatus = true AND (CampName LIKE concat('%',?,'%') OR CityName LIKE concat('%',?,'%')) GROUP BY c.CampId, c.CampName, CityName, a.AreaName) AS totalPrices GROUP BY campId, campName, cityName";
  let searchText = "SELECT fq.campId, fq.campName, fq.cityName, fq.minPrice AS minTotalPrice, sq.count, sq.ranking FROM (SELECT c.campId, campName, cityName, MIN(areaPrice) AS minPrice FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl.cityId JOIN areas AS a ON c.CampId=a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId WHERE areaAvaliableDate >= ? AND areaAvaliableDate < ? AND avaliableStatus = 1 AND areaDailyAvailableCount - areaOrderedCount > ? AND (CampName LIKE concat('%',?,'%') OR cityName LIKE concat('%',?,'%') OR campAddress LIKE concat('%',?,'%')) GROUP BY c.campId, campName, cityName) AS fq JOIN (SELECT a.campId, COUNT(o.OrderId) AS count, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking FROM orders AS o JOIN `order details` AS od on o.OrderId = od.OrderId JOIN `order rankings` AS ora ON o.OrderId = ora.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a on ad.AreaId = a.AreaId GROUP BY a.campId) AS sq on fq.campId = sq.campId";
  //根據營區名稱或是地點找包含place內容 且 日期在start及end之間有 campAmount數量的帳篷之營區
  const rowsSearch = await req.mysql.queryAsync(
    searchText, [start, end, campAmount, place, place, place]);

  //將查到的id存在陣列用在接下來的查詢
  JSON.parse(JSON.stringify(rowsSearch)).map((item, index) => (searchCampIdList[index] = item.campId));
  // console.log(searchCampIdList);
  //searchCampTag sql query敘述
  let searchTagText = "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId ";
  let searchRankingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId ";
  let searchPhotoText = "SELECT DISTINCT CampId as campId, CampPhoto as campPhoto FROM `camp photos`";
  // for迴圈用來變更query長度 對應到[]
  for (let i = 0; i < searchCampIdList.length; i++) {
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
  console.log(`searchPhotoText: ${searchPhotoText}`);

  //searchCampTag
  const rows3 = await req.mysql.queryAsync(searchTagText, searchCampIdList);
  // searchCampRanking
  const rows4 = await req.mysql.queryAsync(searchRankingText, searchCampIdList);
  //searchCampPhoto
  const rows5 = await req.mysql.queryAsync(searchPhotoText, searchCampIdList);
  //search頁面靜態資料
  data['searchCount'] = searchCampIdList.length;
  data['searchCamp'] = JSON.parse(JSON.stringify(rowsSearch));
  data['searchCampTag'] = JSON.parse(JSON.stringify(rows3));
  data['searchCampRanking'] = JSON.parse(JSON.stringify(rows4));
  data['searchCampPhoto'] = JSON.parse(JSON.stringify(rows5));

  // //explore
  // const rows1 = await req.mysql.queryAsync(
  //   "SELECT CityName as cityName, count(CampId) as campCount FROM `city lists` as cl JOIN camps as c on cl.CityId = c.CityId GROUP BY CityName ORDER BY campCount DESC LIMIT 5", []);
  // //hotCamp
  // const rows2 = await req.mysql.queryAsync(
  //   "SELECT c.CampId as campId, campName, cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId WHERE c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? AND AreaDailyAvailableCount > AreaOrderedCount  GROUP BY CampId,campName,cityName ORDER BY CampId, AreaPrice LIMIT 4", hotCampIdList);
  // //hotCampTag
  // const rows3 = await req.mysql.queryAsync(
  //   "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ?", hotCampIdList);
  // //hotCampRanking
  // const rows4 = await req.mysql.queryAsync(
  //   "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? GROUP BY CampId", hotCampIdList);
  // //recommendedCamp
  // const rows5 = await req.mysql.queryAsync(
  //   "SELECT c.CampId as campId, c.CampName as campName, cl.CityName AS cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId WHERE c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? AND AreaDailyAvailableCount > AreaOrderedCount GROUP BY c.CampId,c.CampName,cl.CityName ORDER BY CampId, AreaPrice LIMIT 4", recommendedCampIdList);
  // //recommendedCampTag
  // const rows6 = await req.mysql.queryAsync(
  //   "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ?", recommendedCampIdList);
  // //recommendedCampRanking
  // const rows7 = await req.mysql.queryAsync(
  //   "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? GROUP BY CampId", recommendedCampIdList);

  // data['explore'] = JSON.parse(JSON.stringify(rows1));
  // data['hotCamp'] = JSON.parse(JSON.stringify(rows2));
  // data['hotCampTag'] = JSON.parse(JSON.stringify(rows3));
  // data['hotCampRanking'] = JSON.parse(JSON.stringify(rows4));
  // data['recommendedCamp'] = JSON.parse(JSON.stringify(rows5));
  // data['recommendedCampTag'] = JSON.parse(JSON.stringify(rows6));
  // data['recommendedCampRanking'] = JSON.parse(JSON.stringify(rows7));
  res.send(data);

  // console.log(data);
  // console.log(hotCampIdList);
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



router.get('/tag', async function (req, res) {
  //要有判斷是判斷是否有query 沒有則帶入預設值？
  // console.log(req.query); //typeof object
  // {
  //   place: '台中',
  //   start: '2020年11月20日',
  //   end: '2020年11月22日',
  //   campAmount: '2'
  // }
  // let page = ;
  let place = req.query.place;
  let start = req.query.start.split("年").join("-").split("月").join("-").split("日").join("");
  let end = req.query.end.split("年").join("-").split("月").join("-").split("日").join("");
  let campAmount = req.query.campAmount;
  let tags = ''
  if (!!req.query.tags) {
    tags = req.query.tags.split(',');
  }
  // let tags = req.query.tags.split(",");
  // console.log(`tag: ${tags}, typeof tag: ${typeof tags}`);
  console.log(place);
  //初始化回傳給搜尋頁的data object
  let data = {};
  let searchCampIdList = [];
  // let searchText = "SELECT  campId, campName, cityName, min(totalPrice) AS minTotalPrice FROM (SELECT c.CampId as campId, c.CampName as campName, CityName AS cityName, SUM(AreaPrice) AS totalPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` as ad ON a.AreaId = ad.areaId JOIN `city lists` AS cl ON cl.CityId = c.CityId WHERE DATE(ad.areaAvaliableDate) >= ? AND ad.areaAvaliableDate < ? AND AreaDailyAvailableCount > (AreaOrderedCount + ?) AND CampName LIKE concat('%',?,'%') OR CityName LIKE concat('%',?,'%') GROUP BY c.CampId, c.CampName, CityName, a.AreaName) AS totalPrices GROUP BY campId, campName, cityName";
  // let searchText = "SELECT  campId, campName, cityName, sum(orderCount) AS orderCount, min(totalPrice) AS minTotalPrice, ROUND(AVG(ranking),1) AS avgRanking FROM (SELECT c.CampId as campId, c.CampName as campName, CityName AS cityName, COUNT(OrderDetailId) as orderCount,SUM(ad.AreaPrice) AS totalPrice, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` as ad ON a.AreaId = ad.areaId JOIN `city lists` AS cl ON cl.CityId = c.CityId JOIN `order details` as od on ad.AreaDailyId = od.AreaDailyId JOIN `order rankings` AS ora ON od.OrderId = ora.OrderId WHERE DATE(ad.areaAvaliableDate) >= ? AND ad.areaAvaliableDate < ? AND AreaDailyAvailableCount > (AreaOrderedCount + ?) AND AvaliableStatus = true AND (CampName LIKE concat('%',?,'%') OR CityName LIKE concat('%',?,'%')) GROUP BY c.CampId, c.CampName, CityName, a.AreaName) AS totalPrices GROUP BY campId, campName, cityName";
  let searchText = "SELECT fq.campId, fq.campName, fq.cityName, fq.minPrice AS minTotalPrice, sq.count, sq.ranking FROM (SELECT c.campId, campName, cityName, MIN(areaPrice) AS minPrice FROM camps AS c JOIN `city lists` AS cl ON c.CityId = cl.cityId JOIN areas AS a ON c.CampId=a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId WHERE areaAvaliableDate >= ? AND areaAvaliableDate < ? AND avaliableStatus = 1 AND areaDailyAvailableCount - areaOrderedCount > ? AND (CampName LIKE concat('%',?,'%') OR cityName LIKE concat('%',?,'%') OR campAddress LIKE concat('%',?,'%')) GROUP BY c.campId, campName, cityName) AS fq JOIN (SELECT a.campId, COUNT(o.OrderId) AS count, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking FROM orders AS o JOIN `order details` AS od on o.OrderId = od.OrderId JOIN `order rankings` AS ora ON o.OrderId = ora.OrderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a on ad.AreaId = a.AreaId GROUP BY a.campId) AS sq on fq.campId = sq.campId JOIN ( SELECT * FROM (SELECT campId, GROUP_CONCAT(CampTagName) AS tags FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId GROUP BY CampId) AS tq ";
  for (let i = 0; i < tags.length; i++) {
    if (i == 0) {
      searchText += "WHERE tags LIKE concat('%',?,'%') ";
    } else {
      searchText += "AND tags LIKE concat('%',?,'%') ";
    }
  }
  searchText += ") as fqq on fq.campId = fqq.campId ";

  //根據營區名稱或是地點找包含place內容 且 日期在start及end之間有 campAmount數量的帳篷之營區
  const rowsSearch = await req.mysql.queryAsync(
    searchText, [start, end, campAmount, place, place, place, ...tags]);

  //將查到的id存在陣列用在接下來的查詢
  JSON.parse(JSON.stringify(rowsSearch)).map((item, index) => (searchCampIdList[index] = item.campId));
  // console.log(searchCampIdList);
  //searchCampTag sql query敘述
  let searchTagText = "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId ";
  let searchRankingText = "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId ";
  let searchPhotoText = "SELECT CampId as campId, CampPhoto as campPhoto FROM `camp photos`";
  // for迴圈用來變更query長度 對應到[]
  for (let i = 0; i < searchCampIdList.length; i++) {
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
  searchRankingText += "GROUP BY CampId ";
  searchPhotoText += "ORDER BY campPhotoId DESC ";

  // console.log(searchTagText);
  // console.log(searchRankingText);
  console.log(`searchPhotoText: ${searchPhotoText}`);

  //searchCampTag
  const rows3 = await req.mysql.queryAsync(searchTagText, searchCampIdList);
  // searchCampRanking
  const rows4 = await req.mysql.queryAsync(searchRankingText, searchCampIdList);
  //searchCampPhoto
  const rows5 = await req.mysql.queryAsync(searchPhotoText, searchCampIdList);
  //search頁面靜態資料
  data['searchCount'] = searchCampIdList.length;
  data['searchCamp'] = JSON.parse(JSON.stringify(rowsSearch));
  data['searchCampTag'] = JSON.parse(JSON.stringify(rows3));
  data['searchCampRanking'] = JSON.parse(JSON.stringify(rows4));
  data['searchCampPhoto'] = JSON.parse(JSON.stringify(rows5));

  // //explore
  // const rows1 = await req.mysql.queryAsync(
  //   "SELECT CityName as cityName, count(CampId) as campCount FROM `city lists` as cl JOIN camps as c on cl.CityId = c.CityId GROUP BY CityName ORDER BY campCount DESC LIMIT 5", []);
  // //hotCamp
  // const rows2 = await req.mysql.queryAsync(
  //   "SELECT c.CampId as campId, campName, cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId WHERE c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? AND AreaDailyAvailableCount > AreaOrderedCount  GROUP BY CampId,campName,cityName ORDER BY CampId, AreaPrice LIMIT 4", hotCampIdList);
  // //hotCampTag
  // const rows3 = await req.mysql.queryAsync(
  //   "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ?", hotCampIdList);
  // //hotCampRanking
  // const rows4 = await req.mysql.queryAsync(
  //   "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? GROUP BY CampId", hotCampIdList);
  // //recommendedCamp
  // const rows5 = await req.mysql.queryAsync(
  //   "SELECT c.CampId as campId, c.CampName as campName, cl.CityName AS cityName, MIN(ad.AreaPrice) as areaPrice FROM camps AS c JOIN areas AS a ON c.CampId = a.CampId JOIN `area dailys` AS ad ON a.AreaId = ad.AreaId JOIN `city lists` AS cl ON c.CityId = cl.cityId WHERE c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? OR c.CampId = ? AND AreaDailyAvailableCount > AreaOrderedCount GROUP BY c.CampId,c.CampName,cl.CityName ORDER BY CampId, AreaPrice LIMIT 4", recommendedCampIdList);
  // //recommendedCampTag
  // const rows6 = await req.mysql.queryAsync(
  //   "SELECT Campid AS campId, CampTagName AS tagName FROM `camp tag lists` AS ctl JOIN `camp tags` AS ct ON ctl.CampTagId = ct.CampTagId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ?", recommendedCampIdList);
  // //recommendedCampRanking
  // const rows7 = await req.mysql.queryAsync(
  //   "SELECT CampId as campId, ROUND(SUM(BathroomRanking+TransportRanking+FacilityRanking+ServiceRanking+SceneryRanking)/count(ServiceRanking)/5,1) as ranking , count(ServiceRanking) as 'count' FROM `order rankings` AS ora JOIN orders AS o ON ora.OrderId = o.OrderId JOIN `order details` AS od ON o.OrderId = od.orderId JOIN `area dailys` AS ad ON od.AreaDailyId = ad.AreaDailyId JOIN areas AS a ON ad.AreaId = a.AreaId WHERE CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? OR CampId = ? GROUP BY CampId", recommendedCampIdList);

  // data['explore'] = JSON.parse(JSON.stringify(rows1));
  // data['hotCamp'] = JSON.parse(JSON.stringify(rows2));
  // data['hotCampTag'] = JSON.parse(JSON.stringify(rows3));
  // data['hotCampRanking'] = JSON.parse(JSON.stringify(rows4));
  // data['recommendedCamp'] = JSON.parse(JSON.stringify(rows5));
  // data['recommendedCampTag'] = JSON.parse(JSON.stringify(rows6));
  // data['recommendedCampRanking'] = JSON.parse(JSON.stringify(rows7));
  res.send(data);

  // console.log(data);
  // console.log(hotCampIdList);
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

