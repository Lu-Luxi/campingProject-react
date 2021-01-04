import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const OrderManagementMain = (props) => {
    const { orders } = props;
    return (
        <React.Fragment>
            <main className="col-10">

                {/* <!--訂單明細 --> */}
                <div className="row">

                    <div className="mt-5 mx-4 w-100">
                        <FontAwesomeIcon icon={faTree} style={{ fontSize: 25 }}></FontAwesomeIcon>
                        <h3 className=" d-inline title-style ml-1">訂單管理</h3>
                        <div className="mt-3">
                            <MaterialTable
                                icons={tableIcons}
                                // title="Basic Filtering Preview"
                                columns={[
                                    { title: '編號', field: 'orderId', headerStyle: { fontSize: 16 } },
                                    { title: '訂單日期', field: 'orderDate', headerStyle: { fontSize: 16 }, cellStyle: { width: 140 } },
                                    { title: '訂購人', field: 'purchaserName', headerStyle: { fontSize: 16 } },
                                    { title: '聯絡電話', field: 'purchaserPhone', headerStyle: { fontSize: 16 } },
                                    { title: '預定日期', field: 'stayDateRange', headerStyle: { fontSize: 16 }, cellStyle: { width: 200 } },
                                    { title: '區域', field: 'areaName', headerStyle: { fontSize: 16 } },
                                    { title: '數量(帳)', field: 'reservedCount', headerStyle: { fontSize: 16 } },
                                    { title: '金額(元)', field: 'totalPrice', headerStyle: { fontSize: 16 } },
                                    // { title: '付款狀態', field: 'paymentStatus', headerStyle: { fontSize: 16 }, lookup: { 1: '已付款', 2: '尚未付款' } },
                                    // { title: '訂單狀況', field: 'orderStatus', headerStyle: { fontSize: 16 } },
                                ]}
                                data={orders}
                                options={{
                                    filtering: true,
                                    showTitle: false,
                                }}
                            />
                        </div>
                        {/* <table className="table my-3 table-color tableStyle ">
                            <thead>

                                <tr>
                                    <th scope="col">訂單編號</th>
                                    <th scope="col">訂單日期</th>
                                    <th scope="col">訂購人</th>
                                    <th scope="col">電話</th>
                                    <th scope="col">預定日期</th>
                                    <th scope="col">區域</th>
                                    <th scope="col">帳數</th>
                                    <th scope="col">金額</th>
                                    <th scope="col">付款狀態</th>
                                    <th scope="col">訂單狀況</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                                <tr>
                                    <td >B612000000</td>
                                    <td >2020/10/08</td>
                                    <td >狗狗</td>
                                    <td >0988376457</td>
                                    <td >2020/10/8-2020/10/9</td>
                                    <td >A區</td>
                                    <td >1</td>
                                    <td >2400</td>
                                    <td >已付款</td>
                                    <td >成立</td>

                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default OrderManagementMain;