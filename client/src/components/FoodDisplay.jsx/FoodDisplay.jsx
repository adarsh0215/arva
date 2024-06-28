import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mx-auto max-w-2xl py-8 sm:px-6  lg:max-w-7xl lg:px-8 px-4">
      <h1 className="text-xl font-medium tracking-tight text-[#111111] ">
        Top rated near you
      </h1>
      <div className="mt-6 flex space-x-2 overflow-x-auto hide-scrollbar">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div className="shrink-0 w-1/2 lg:w-3/12  p-1 cursor-pointer">
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
