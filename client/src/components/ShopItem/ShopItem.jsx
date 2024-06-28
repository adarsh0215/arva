import React from "react";
import FeatherIcon from "feather-icons-react";

const url = "http://localhost:5000";

const ShopItem = ({ name, address, description, rating, image }) => {
  return (
    <div className="w-full mx-auto rounded-lg border bg-white transition-all duration-300 animate-fadeIn p-1 cursor-pointer ">
      <img
        class="w-full rounded-t-lg"
        src={url + "/images/" + image}
        alt={name}
      />

      <div className="flex justify-between pt-2">
        <h3 className="text-lg text-[#083344] font-medium">{name}</h3>
        <div className="flex space-x-1 p-1">
          <FeatherIcon icon="star" fill="#22d3ee" size="18" stroke="" />
          <p className="font-medium text-[#083344]">{rating} </p>
        </div>
      </div>
      <p className="text-gray-400">{description}</p>
      <p className="text-gray-400">{address}</p>
    </div>
  );
};

export default ShopItem;
