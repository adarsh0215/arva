import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="mx-auto max-w-2xl py-4 sm:px-6  lg:max-w-7xl lg:px-8 px-4">
      <h1 className="text-xl font-medium tracking-tight text-[#111111] ">
        WHAT'S ON YOUR MIND ?
      </h1>

      <div className="mt-6 flex space-x-4 overflow-x-auto hide-scrollbar">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center p-1 cursor-pointer"
          >
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                className={`w-24 h-24 sm:w-32 sm:h-32 object-cover ${
                  category === item.menu_name
                    ? "border-4 border-[#bde0fe] p-0.5 rounded-full"
                    : ""
                }`}
                alt={item.menu_name}
              />
            </div>
            <p className="mt-2 sm:mt-4 text-slate-500  text-center cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
