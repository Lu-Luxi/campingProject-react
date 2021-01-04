import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import camping from '../img/camping.jpg';
import Stars from './Stars';
import { faCommentDots, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import MemberOrder from './MemberOrder'
import ReactStars from "react-rating-stars-component";


// orId${orderId}

const MemberOrderComment = (props) => {

  const { orderId, ranking, tag, campId, campName, orderDate, purchaserName, stayDateRange, reservedCount, paymentMethod, paymentAmount, campAddress, campPhone, campOwnerName, cityName, areaName, rankCount, status } = props

  // [orderId, rankingName, bathroomRanking, transportRanking, facilityRanking, serviceRanking, sceneryRanking, rankingText]

  const [rankingName, setRankingName] = useState(purchaserName)
  const [bathroomRanking, setBathroomRanking] = useState("")
  const [transportRanking, setTransportRanking] = useState("")
  const [facilityRanking, setFacilityRanking] = useState("")
  const [serviceRanking, setServiceRanking] = useState("")
  const [sceneryRanking, setSceneryRanking] = useState("")
  const [rankingText, setRankingText] = useState("")


  const clickHandler = () => {
    axios.post('http://localhost:5000/account/api/comment', {
      orderId: orderId,
      rankingName: rankingName,
      bathroomRanking: bathroomRanking,
      transportRanking: transportRanking,
      facilityRanking: facilityRanking,
      serviceRanking: serviceRanking,
      sceneryRanking: sceneryRanking,
      rankingText: rankingText
    }).then((res) => {
      console.log(res)
    })
  }

  const bathroomRankingStar = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "gray",
    activeColor: "#eec749",
    // a11y: true,
    emptyIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    onChange: newValue => {
      setBathroomRanking(newValue);
      console.log(`setBathroomRanking: new value is ${newValue}`);
    }
  };

  const transportRankingStar = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "gray",
    activeColor: "#eec749",
    emptyIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    onChange: newValue => {
      setTransportRanking(newValue);
      console.log(`setTransportRanking: new value is ${newValue}`);
    }
  };

  const facilityRankingStar = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "gray",
    activeColor: "#eec749",
    emptyIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    onChange: newValue => {
      setFacilityRanking(newValue);
      console.log(`setFacilityRanking: new value is ${newValue}`);
    }
  };

  const serviceRankingStar = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "gray",
    activeColor: "#eec749",
    emptyIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    onChange: newValue => {
      setServiceRanking(newValue);
      console.log(`setServiceRanking: new value is ${newValue}`);
    }
  };

  const sceneryRankingStar = {
    size: 20,
    count: 5,
    isHalf: false,
    value: 0,
    color: "gray",
    activeColor: "#eec749",
    emptyIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
    onChange: newValue => {
      setSceneryRanking(newValue)
      console.log(`setSceneryRanking: new value is ${newValue}`);
    }
  };

  return (
    <div class="modal " id={`orId${orderId}cm`} data-backdrop="static" data-keyboard="false" tabIndex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class=" pb-0 px-3 pt-2">
            <h3 class="modal-title font-weight-bold" id="staticBackdropLabel">露營評價</h3>
            {/* {`orId${orderId}cm`} */}
          </div>

          <div class="modal-body px-3 pb-0 pt-1">
            <div class="row">
              <div class="col-12 d-flex align-items-center">
                <label for="firstName" class="font-weight-bold">評價暱稱</label>
              </div>
              <div class="col-12 pl-3">
                <input type="text" class="form-control " id="firstName" placeholder="留下您的姓名或暱稱" style={{ border: "1.5px solid black" }}
                  onChange={(e) => setRankingName(e.target.value)}
                  defaultValue={rankingName}
                // onFocus={(e) => { setRankingName("王愛咪") }}
                />
              </div>
            </div>

            <div class="col-12 d-flex align-items-center px-0 mt-2">
              <label for="firstName" class="font-weight-bold">營區評價</label>
            </div>

            <div class="rating-box rounded px-2 pt-2 pb-2" style={{ border: "1.5px solid black" }}>
              <div class="row d-flex justify-content-between ">

                <div className="col-6">
                  <p class="pl-1 mb-0">浴廁</p>
                  <div class="rating">
                    <ReactStars {...bathroomRankingStar} />
                  </div>
                </div>

                <div className="col-6">
                  <p class="pl-1 mb-0">設施</p>
                  <div class="rating">
                    <ReactStars {...facilityRankingStar} />
                  </div>
                </div>
              </div>


              <div class="row d-flex justify-content-between">
                <div className="col-6">
                  <p class="pl-1 mb-0">服務</p>
                  <div class="rating">
                    <ReactStars {...serviceRankingStar} />
                  </div>
                </div>

                <div className="col-6">
                  <p class="pl-1 mb-0">交通</p>
                  <div class="rating">
                    <ReactStars {...transportRankingStar} />
                  </div>
                </div>
              </div>

              <div class="row d-flex justify-content-between">
                <div className="col-6">
                  <p class="pl-1 mb-0">景觀</p>
                  <div class="rating">
                    <ReactStars {...sceneryRankingStar} />
                  </div>
                </div>
                <div className="col-6">

                </div>
              </div>
            </div>


            <div class="row mt-2 ">
              <div class="col-12 pb-0">
                <form>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1" className="font-weight-bold">留下訊息</label>
                    <textarea class="form-control"
                      onChange={(e) => setRankingText(e.target.value)}
                      id="exampleFormControlTextarea1" rows="4" style={{ border: "1.5px solid black" }}
                      onFocus={(e) => setRankingText("草皮保養的不錯，而且離溪邊很近，可以玩水！！！超讚的露營體驗，推薦大家來玩喔。")}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>

          </div>

          <div class="pt-0 d-flex pr-3">
            <div className="ml-auto">
              <button
                type="button"
                class="btn text-white mr-1"
                style={{ backgroundColor: "var(--btnColor)" }}
                onClick={() => clickHandler()}
                data-dismiss="modal"
              >送出</button>
              <button type="button" class="btn btn-secondary " data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberOrderComment