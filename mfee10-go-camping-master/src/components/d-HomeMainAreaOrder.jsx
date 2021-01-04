import React from 'react';

const HomeMainAreaOder = (props) => {
    const { areaName, orders } = props;
    console.log(orders);
    return (
        <React.Fragment>
            <span className="ml-1  small-title">區域：</span>
            <span className="small-title">{areaName}</span>
            <table className="table table-color tableStyle mt-2 ">
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">訂購人</th>
                        <th scope="col">電話</th>
                        <th scope="col">預定日期</th>
                        <th scope="col">帳數</th>
                        <th scope="col">金額</th>
                        <th scope="col">付款狀態</th>
                        <th scope="col">訂單狀況</th>
                    </tr>
                </thead>
                <tbody>
                    {!!orders.length ? orders.map((item, index) =>
                        <React.Fragment key={index}>
                            <tr>
                                <td>{item.orderId}</td>
                                <td>{!!item.orderDate ? item.orderDate.slice(0, 10) : null}</td>
                                <td>{item.purchaserName}</td>
                                <td>{item.purchaserPhone}</td>
                                <td>{item.stayDateRange}</td>
                                <td>{item.reservedCount}</td>
                                <td>{item.totalPrice}</td>
                                <td>{item.paymentStatus === 1 ? "已付款" : "尚未付款"}</td>
                                <td>{item.orderStatus}</td>
                            </tr>
                        </React.Fragment>
                    ) :
                        <React.Fragment>
                            <tr>
                                <td colSpan="9">此區域沒有訂單</td>
                            </tr>
                        </React.Fragment>
                    }
                </tbody>
            </table>
        </React.Fragment>
    );

}

export default HomeMainAreaOder;