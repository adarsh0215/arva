import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShopItem from "../ShopItem/ShopItem";
import axios from "axios";

const ShopDisplay = ({ searchQuery = "" }) => {
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/coffee-shops/list`
        );
        setShopList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredShopList = Array.isArray(shopList) ? shopList.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="mx-auto max-w-2xl py-8 px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-xl font-medium tracking-tight text-[#111111]">
        Explore Coffee Shops
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8 auto-cols-min">
        {filteredShopList.map((shop, index) => (
          <Link to={`/shop/${shop._id}`} key={shop._id} className="shrink-0 w-full">
            <ShopItem
              id={shop._id}
              name={shop.name}
              address={shop.address}
              description={shop.description}
              rating={shop.rating}
              image={shop.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopDisplay;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ShopItem from "../ShopItem/ShopItem";
// import axios from "axios";

// const ShopDisplay = () => {
//   const [shopList, setShopList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/coffee-shops/list"
//         );
//         setShopList(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching shop data:", error);
//         setLoading(false);
//       }
//     };

//     fetchShops();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="mx-auto max-w-2xl py-20 px-6 lg:max-w-7xl lg:px-8 ">
//       <h2 className="text-xl font-medium tracking-tight text-[#111111] ">
//         Top coffee shops near you
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8 auto-cols-min">
//         {shopList.map((shop, index) => (
//           <Link to={`/shop/${shop._id}`} key={shop._id} className="shrink-0 w-full">
//             <ShopItem
//               id={shop._id}
//               name={shop.name}
//               address={shop.address}
//               description={shop.description}
//               rating={shop.rating}
//               image={shop.image}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopDisplay;


// // src/components/ShopDisplay/ShopDisplay.jsx

// import React, { useEffect, useState } from "react";
// import ShopItem from "../ShopItem/ShopItem";
// import axios from "axios";

// const ShopDisplay = () => {
//   const [shopList, setShopList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/coffee-shops/list"
//         );
//         setShopList(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching shop data:", error);
//         setLoading(false);
//       }
//     };

//     fetchShops();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="mx-auto max-w-2xl py-16 px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
//       <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//         Top coffee shops near you
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8 auto-cols-min">
//         {shopList.map((shop, index) => (
//           <div className="shrink-0 w-full">
//             <ShopItem
//               key={index}
//               id={shop._id}
//               name={shop.name}
//               address={shop.address}
//               description={shop.description}
//               rating={shop.rating}
//               image={shop.image}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopDisplay;
