import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    coffeeShop: ""
  });

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(`${url}/api/coffee-shops/list`);
        setCoffeeShops(response.data);
      } catch (error) {
        console.error("Error fetching coffee shop data:", error);
      }
    };

    fetchCoffeeShops();
  }, [url]);

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("coffeeShop", data.coffeeShop);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
          coffeeShop: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("Failed to add food");
    }
  };

  return (
    <div className='w-9/12 ml-6 mt-12 text-[#083344]  text-base px-10 pb-20 '>
      <form className='gap-5 flex flex-col' onSubmit={onsubmitHandler}>
        <div className='w-32 flex flex-col gap-3'>
          <p className=''>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Select Coffee Shop</p>
          <select onChange={onChangehandler} value={data.coffeeShop} name='coffeeShop' className='p-3 border' required>
            <option value="" disabled>Select a coffee shop</option>
            {coffeeShops.map((shop) => (
              <option key={shop._id} value={shop._id}>{shop.name}</option>
            ))}
          </select>
        </div>
        <div className='w-72 flex flex-col gap-3'>
          <p>Product Name</p>
          <input onChange={onChangehandler} value={data.name} className='p-3 border' type="text" name='name' placeholder='Type here' />
        </div>
        <div className="w-72 flex flex-col gap-3">
          <p>Product Description</p>
          <textarea onChange={onChangehandler} value={data.description} className='p-3 border' name="description" cols="" rows="6" placeholder='Write content here'></textarea>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 ">
            <p>Product Category</p>
            <select onChange={onChangehandler} value={data.category} className='p-3 border' name="category">
              <option value="Espresso Beverages">Espresso Beverages</option>
              <option value="Cold Brew">Cold Brew</option>
              <option value="Tea">Tea</option>
              <option value="Sandwiches & Wraps">Sandwiches & Wraps</option>
              <option value="Salads">Salads</option>
              <option value="Smoothies & Juices">Smoothies & Juices</option>
              <option value="Specialty Drinks">Specialty Drinks</option>
              <option value="Bakery">Bakery</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <p>Product Price</p>
            <input onChange={onChangehandler} value={data.price} className='p-3 border' type="number" name='price' placeholder='₹20' />
          </div>
        </div>
        <button type='submit' className='lg:w-32 border-none p-3 bg-black text-white cursor-pointer'>ADD</button>
      </form>
    </div>
  );
};

export default Add;

// import React from 'react'
// import {assets} from '../../assets/assets'
// import { useState } from 'react'
// import axios from "axios"
// import { toast } from 'react-toastify'


// const Add = ({url}) => {
  
//   const [image, setImage] = useState(false)
//   const [data,setData] = useState({
//     name:"",
//     description:"",
//     price:"",
//     category:"Salad",
//     coffeeShop : ""
//   })

//   const onChangehandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data=>({...data,[name]:value}))
//   }

//   const onsubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name)
//     formData.append("description", data.description)
//     formData.append("price", Number(data.price))
//     formData.append("category", data.category)
//     formData.append("image", image)
//     formData.append("coffeeShop", data.coffeeShop)
//     const response = await axios.post(`${url}/api/food/add`, formData);
//     console.log(response.data.success);
//     console.log('Response:', response);
//   if (response.data.success) {
//     setData({
//       name:"",
//       description:"",
//       price:"",
//       category:"Salad",
//       coffeeShop: "",
//     })
//     setImage(false)
//     toast.success(response.data.message)
//   }  
//   else {
//     alert("Failed to add food")
//     toast.error(response.data.message)
//   }
// }
//   return (
//     <div className='w-9/12 ml-6 mt-12 text-[#6d6d6d] text-base'>
//       <form className=' gap-5 flex flex-col ' onSubmit={onsubmitHandler}>
//         <div className=' w-32 flex flex-col gap-3'>
//           <p>Upload Image</p>
//           <label htmlFor='image'>
//             <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
//           </label>
//           <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
//         </div>
//         <div className=' w-72 flex flex-col gap-3'>
//           <p>Coffee Shop ID</p>
//           <input onChange={onChangehandler} value={data.coffeeShop}  className=' p-3 border' type="text" name='coffeeShop' placeholder='coffee shop id' />
//         </div>
//         <div className=' w-72 flex flex-col gap-3'>
//           <p>Product name</p>
//           <input onChange={onChangehandler} value={data.name}  className=' p-3 border' type="text" name='name' placeholder='Type here' />
//         </div>
//         <div className=" w-72 flex flex-col gap-3">
//           <p>Product description</p>
//           <textarea onChange={onChangehandler}  value={data.description} className=' p-3 border' name="description" id="" cols="" rows="6" placeholder='write content here'></textarea>
//         </div>
//         <div className="flex gap-8">
//           <div className="flex flex-col gap-3 ">
//             <p>Product Category</p>
//             <select onChange={onChangehandler}  className=' p-3 border' name="category">
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Desert">Desert</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pure Veg">Pure Veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>
//           <div className="flex flex-col gap-3">
//             <p>Product Price</p>
//             <input onChange={onChangehandler}  value={data.price} className='p-3 border' type="number" name='price' placeholder='₹20' />
//           </div>
//         </div>
//         <button type='Submit' className=' lg:w-32 border-none p-3 bg-black text-white cursor-pointer'>ADD</button>
//       </form>
//     </div>
//   )
// }

// export default Add