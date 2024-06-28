import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
      return acc;
    }, []);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again later.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to place an order.");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <div className="container mx-auto px-4 mt-10">
      <form onSubmit={placeOrder} className="flex flex-col md:flex-row gap-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              className="mb-4 p-4 border rounded outline-none"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="mb-4 p-4 border rounded outline-none"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              className="mb-4 p-4 border rounded outline-none"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />
            <input
              type="text"
              placeholder="Street"
              className="mb-4 p-4 border rounded outline-none"
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="mb-4 p-4 border rounded outline-none"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="mb-4 p-4 border rounded outline-none"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
            <input
              type="text"
              placeholder="Zip code"
              className="mb-4 p-4 border rounded outline-none"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="mb-4 p-4 border rounded outline-none"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="mb-4 p-4 border rounded outline-none"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              required
            />
          </div>
        </div>
        <div className="w-full max-w-md">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-semibold">
                ₹{getTotalCartAmount()}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-800 font-semibold">
                ₹{getTotalCartAmount() === 0 ? 0 : 50}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-bold">Total</span>
              <span className="text-[#0891b2] text-xl font-bold">
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </span>
            </div>
            <button
              type="submit"
              className={`bg-[#10b981] text-white py-2 px-4 rounded-lg w-full ${
                cartItems.length === 0 && "cursor-not-allowed opacity-50"
              }`}
              disabled={cartItems.length === 0}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
