import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((order, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg">
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-8 h-8 mb-2" />
            <p className="text-sm mb-2">
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} x {item.quantity}
                  {index !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="text-lg font-semibold mb-2">
              {currency}
              {order.amount}.00
            </p>
            <p className="text-sm mb-2">Items: {order.items.length}</p>
            <p className="flex items-center mb-2">
              <span className="w-4 h-4 rounded-full bg-green-500 mr-1"></span>
              <b>{order.status}</b>
            </p>
            <button
              onClick={fetchOrders}
              className="bg-[#06b6d4] text-white px-4 py-2 rounded-md hover:bg-[#0891b2] transition duration-200"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
