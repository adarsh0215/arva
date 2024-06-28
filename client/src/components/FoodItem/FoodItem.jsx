import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FeatherIcon from "feather-icons-react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg border bg-white transition-all duration-300 animate-fadeIn ">
      <div className="relative ">
        <img
          className="w-full rounded-t-lg object-cover p-1"
          src={`${url}/images/${image}`}
          alt={name}
        />
      </div>
      <div className="p-2 ">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-700">{name}</p>
        </div>
        <div className="flex justify-between ">
          <p className=" text-lg font-medium my-2.5 text-[#164e63]">₹{price}</p>
          <div>
            {!cartItems[id] ? (
              <div
                className="my-2 p-1 border bg-[#ecfeff]  cursor-pointer rounded-full"
                onClick={() => addToCart(id)}
              >
                <FeatherIcon icon="plus" color='#0891b2'  />
              </div>
            ) : (
              <div className="flex items-center border my-2 gap-2 p-1 rounded-full bg-white">
                <div
                  className="p-1 bg-[#ffe4e6] rounded-full cursor-pointer"
                  onClick={() => removeFromCart(id)}
                >
                  <FeatherIcon icon="minus" size="18" color="#e11d48" />
                </div>
                <p>{cartItems[id]}</p>
                <div
                  className="p-1 bg-[#ccfbf1] rounded-full cursor-pointer"
                  onClick={() => addToCart(id)}
                >
                  <FeatherIcon icon="plus" size="18" color="#0d9488" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
