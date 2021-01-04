import React, { Component } from 'react';
import LeftNav from './d-LeftNav';
import SettingMain from './d-SettingMain';

const Setting = (props) => {
    const { user} = props
    // console.log(user)
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <LeftNav />
                    <SettingMain user={user}/>

                </div>
                {/* row end */}

                {/* <!-- 營主基本資料編輯Modal --> */}
                <div className="modal fade" id="campOwners" tabindex="-1" aria-labelledby="campOwnersLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="campOwnersLabel">
                                    營主基本資料編輯
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label for="campOwnerName">姓名：</label>
                                <input type="text" class="form-control" id="campOwnerName" placeholder="" defaultValue={user.CampOwnerName}/> <br />

                                <label for="campOwnerPhone">電話</label>
                                <input type="tel" class="form-control" id="campOwnerPhone" placeholder="" defaultValue={user.CampOwnerPhone}/><br />

                                <label for="campOwnerEmail">信箱</label>
                                <input type="text" class="form-control" id="campOwnerEmail" defaultValue={user.CampOwnerEmail} placeholder="" /><br />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btnstyle" data-dismiss="modal">
                                    取消
                  </button>
                                <button type="button" className="btnstyle">
                                    儲存
                  </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- 營主基本資料編輯ModalEND --> */}
                <div className="modal fade" id="editPassword" tabindex="-1" aria-labelledby="editPasswordLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editPasswordLabel">
                                    變更密碼
                  </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label for="password">舊密碼</label>
                                <input type="text" class="form-control" id="password" placeholder="" /><br />

                                <label for="newPassword">新密碼</label>
                                <input type="text" class="form-control" id="newPassword" placeholder="" /><br />

                                <label for="confirmPassword">確認密碼</label>
                                <input type="text" class="form-control" id="confirmPassword" placeholder="" /><br />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btnstyle" data-dismiss="modal">
                                    取消
                  </button>
                                <button type="button" className="btnstyle">
                                    儲存
                  </button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* 變更密碼 */}



                {/* 變更密碼 END */}

            </div> {/* container end */}
        </React.Fragment>
    );
}

export default Setting;