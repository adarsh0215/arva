import React, { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay.jsx/FoodDisplay";
import ShopDisplay from "../../components/ShopDisplay/ShopDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.length > 0;

  return (
    <div className="">
      <div className="search-bar my-4 mx-auto max-w-2xl px-6">
        <input
          type="text"
          placeholder="Search for shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {!isSearching && (
        <ExploreMenu category={category} setCategory={setCategory} />
      )}

      {!isSearching && (
        <FoodDisplay category={category} searchQuery={searchQuery} />
      )}

      <ShopDisplay searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
