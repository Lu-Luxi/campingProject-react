import React, { Component } from 'react';

const SettingMain = (props) => {
    const {user} = props
    return (
        <React.Fragment>
            {/* 營主基本資料 start */}
            <div className="col-10 mt-5 d-flex justify-content-center ">
                <div className="card w-50 c_shasow">
                    <h4 className=" turquoise-bg">營主基本資料</h4>
                    <div className="card-body">
                        <div>
                            <button type="button" className="btnstyle float-right" data-toggle="modal" data-target="#campOwners">
                                編輯</button>
                        </div>
                        <p className="card-text">
                            <span>姓名：</span>
                            <span>{user.CampOwnerName}</span>
                        </p>
                        <p className="card-text">
                            <span>電話：</span>
                            <span>{user.CampOwnerPhone}</span>
                        </p>
                        <p className="card-text">
                            <span>信箱：</span>
                            <span>{user.CampOwnerEmail}</span>
                        </p>
                        <p className="card-text">
                            <span>帳號：</span>
                            <span>{user.CampOwnerAccount}</span>
                        </p>
                        <p className="card-text">
                            <span>密碼：</span>
                            <button
                                type="button"
                                className="btnstyle-big"
                                data-toggle="modal"
                                data-target="#editPassword"
                            >
                                變更密碼
                    </button>
                        </p>
                    </div>
                </div>
            </div>
            {/* 營主基本資料 end */}
        </React.Fragment>
    );
}

export default SettingMain;