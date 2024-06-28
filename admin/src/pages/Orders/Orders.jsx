import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 w-full">
      <h3 className="text-3xl font-semibold mb-6">Order Page</h3>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-item flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border rounded-lg"
          >
            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
              <img src={assets.parcel_icon} alt="" className="w-16 h-16 mr-4" />
              <div className="flex-1">
                <p className="order-item-food font-semibold mb-1">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="order-item-name text-lg font-medium">{order.address.firstName} {order.address.lastName}</p>
                <div className="order-item-address text-gray-500">
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </div>
                <p className="order-item-phone text-gray-500">{order.address.phone}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6">
              <p className="text-gray-700">Items: {order.items.length}</p>
              <p className="text-gray-700">Amount: ₹{order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="mt-2 md:mt-0 p-2 border border-gray-300 rounded-md"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
