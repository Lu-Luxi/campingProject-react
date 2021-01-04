import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";

const AreaManagementMain = (props) => {
    return (
        <React.Fragment>
            <main className="col-10 ">
                <div className="p-5">
                    <div>
                        <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon>

                        <h3 className=" d-inline title-style ml-1">區域狀態管理</h3>

                        <input className="float-right d-inline " type="date" />
                    </div>
                    <table className="table table-color tableStyle mt-3 ">
                        <thead>
                            <tr>
                                <th scope="col">區域名稱</th>
                                <th scope="col">區域數量上限</th>
                                <th scope="col">區域開放數量</th>
                                <th scope="col">定價</th>
                                <th scope="col">折扣</th>
                                <th scope="col">狀態</th>
                                <th scope="col">編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>草皮A區</td>
                                <td>15</td>
                                <td>10</td>
                                <td>2550</td>
                                <td></td>
                                <td>開放</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-toggle="modal"
                                        data-target="#areaEditModel"
                                    >
                                        編輯
                        </button>
                                </td>
                            </tr>
                            <tr>
                                <td>草皮B區</td>
                                <td>15</td>
                                <td>10</td>
                                <td>2100</td>
                                <td></td>
                                <td>開放</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-toggle="modal"
                                        data-target="#areaEditModel"
                                    >
                                        編輯
                        </button>
                                </td>
                            </tr>
                            <tr>
                                <td>草皮C區</td>
                                <td>30</td>
                                <td>10</td>
                                <td>2600</td>
                                <td></td>
                                <td>開放</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-toggle="modal"
                                        data-target="#areaEditModel"
                                    >
                                        編輯
                        </button>
                                </td>
                            </tr>
                            <tr>
                                <td>木棧板A區</td>
                                <td>15</td>
                                <td>10</td>
                                <td>2600</td>
                                <td></td>
                                <td>開放</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-toggle="modal"
                                        data-target="#areaEditModel"
                                    >
                                        編輯
                        </button>
                                </td>
                            </tr>
                            <tr>
                                <td>木棧板B區</td>
                                <td>15</td>
                                <td>10</td>
                                <td>1700</td>
                                <td></td>
                                <td>開放</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-toggle="modal"
                                        data-target="#areaEditModel"
                                    >
                                        編輯
                        </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <!-- 區域狀態編輯Modal --> */}
                    <div
                        className="modal fade"
                        id="areaEditModel"
                        tabindex="-1"
                        aria-labelledby="areaEditModelLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="areaEditModelLabel">
                                        編輯區域設置
                        </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="areaName">區域名稱：</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="areaName"
                                            placeholder=""
                                        />
                                        <br />

                                        <label for="areaMaxCount">區域數量上限：</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="areaMaxCount"
                                            placeholder=""
                                        />
                                        <br />

                                        <label for="areaAvailableCount">區域開放數量：</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="areaAvailableCount"
                                            placeholder=""
                                        />
                                        <br />

                                        <label for="areaPrice">定價</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="areaPrice"
                                            placeholder=""
                                        />
                                        <br />

                                        <label for="areaDiscount">折扣</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="areaDiscount"
                                            placeholder=""
                                        />
                                        <br />

                                        <label for="avaliableStatus">狀態</label>
                                        <select
                                            className="form-control w-25"
                                            id="avaliableStatus"
                                        >
                                            <option>請選擇</option>
                                            <option>開放</option>
                                            <option>關閉</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btnstyle"
                                        data-dismiss="modal"
                                    >
                                        取消
                        </button>
                                    <button type="button" className="btnstyle">
                                        儲存
                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default AreaManagementMain;