import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const MemberEdit = (props) => {
    const {user, handleUserEdit} = props
    // const memberId = user.memberId
    // const [memberId, setMemberId] = useState(user.memberId)
    const [memberName, setMemberName] = useState(user.MemberName)
    const [memberPhone, setMemberPhone] = useState(user.MemberPhone)
    console.log(user.MemberId)
    // console.log(memberId)
    

    // const memberBirth = user.MemberBirth.slice(0, 10)

    //use user.MemberSex
    // useEffect(() => {
    //     sex()
    // }, [])
//     const handleUserEdit = async (memberName, memberPhone, memberId) 
    

    return (
        <React.Fragment>
            {/* <!-- member_message_page --> */}
            <div className="col-9">
                {/* <!-- user_message --> */}
                <div className="card mt-5">
                    <div class="card-header border-0" style={{ backgroundColor: "var(--titleColor)" }}>
                        <div className="row">
                            <div className="col-11">
                                <h4 className="m-0 font-weight-bold">修改個人資料</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex flex-column align-items-center">
                            <form className="col-8">
                                <div className="form-group row">
                                    <label for="memberEmail" className="col-2 col-form-label font-weight-bolder">帳號</label>
                                    <div className="col-10">
                                        <input className="form-control" type="email" defaultValue={user.MemberEmail}
                                            readOnly="readonly" id="memberEmail" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="menberName" className="col-2 col-form-label font-weight-bolder">姓名</label>
                                    <div className="col-10">
                                        <input className="form-control" type="text" defaultValue={user.MemberName} id="menberName" onChange={(e)=> {
                                            setMemberName(e.target.value)
                                        }} />
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label for="memberGender" className="col-2 col-form-label font-weight-bolder">性別</label>
                                    <div className="col-10">
                                        <select className="form-control" id="memberGender" name="memberSex">
                                            <option value="男" selected={user.MemberSex === "男"}>男生</option>
                                            <option value="女" selected={user.MemberSex === "女"}>女生</option>
                                        </select>
                                    </div>
                                </div> */}
                                {/* <div className="form-group row">
                                    <label for="memberEmail"
                                        className="col-2 col-form-label font-weight-bolder">Email</label>
                                    <div className="col-10">
                                        <input className="form-control" type="email" value="tree8888@gmail.com"
                                            readonly="readonly" id="memberEmail" />
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <label for="memberTelephone"
                                        className="col-2 col-form-label font-weight-bolder">電話</label>
                                    <div className="col-10">
                                        <input className="form-control" type="tel" defaultValue={user.MemberPhone} id="memberTelephone" onChange={(e)=> {
                                            setMemberPhone(e.target.value)
                                        }}/>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label for="example-date-input"
                                        className="col-2 col-form-label font-weight-bolder">生日</label>
                                    <div className="col-10">
                                        <input className="form-control" type="date" 
                                            id="example-date-input" value={memberBirth}/>
                                    </div>
                                </div> */}
                                <div className="d-flex justify-content-end">
                                    <a className="btn text-white"  role="button" style={{ backgroundColor: "var(--btnColor)", letterSpacing: 2 }} onClick={()=> {handleUserEdit(memberName, memberPhone, user.MemberId)}}>確認修改</a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                {/* <!-- end_user_message --> */}

                {/* <!-- end_row --> */}
            </div>
            {/* <!-- end_main_area --> */}
            {/* </div> */}
            {/* </div> */}
        </React.Fragment>
    );
}

export default MemberEdit;