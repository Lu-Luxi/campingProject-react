import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftNav from './d-LeftNav';
import OrderManagementMain from './d-OrderManagementMain';

const OrderManagement = (props) => {
    const { campId } = props;
    const [orders, setOrders] = useState([]);
    //一開始進網頁的靜態資料
    useEffect(() => {
        const fetchItem = async () => {
            await axios.get(`http://localhost:5000/dashboard/api/order/${campId}`).then((response) => {
                console.log(response.data);
                setOrders(response.data.dailyOrder);
                // console.log(dailyOrder);
            })
        }
        // selectCanledar();
        fetchItem();
    }, [campId, setOrders])

    return (
        <React.Fragment>

            <div className="container-fluid">
                <div className="row">
                    <LeftNav />
                    <OrderManagementMain
                        orders={orders}
                    />
                </div>  {/* div row end */}

            </div>   {/* container-fluid end */}
        </React.Fragment>
    );
}

export default OrderManagement;