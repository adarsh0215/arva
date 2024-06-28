import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="overflow-hidden bg-white border rounded-lg">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Items in Cart</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {food_list.map((item) => (
              cartItems[item._id] > 0 && (
                <div key={item._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <img src={`${url}/images/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <p className="text-gray-800 font-semibold">{item.name}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="text-gray-500 hover:text-red-500 focus:outline-none"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="mx-2 text-gray-700">Quantity: {cartItems[item._id]}</p>
                    <p className="text-gray-800 font-semibold">₹{item.price * cartItems[item._id]}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-semibold">₹{getTotalCartAmount()}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-800 font-semibold">₹{getTotalCartAmount() === 0 ? 0 : 50}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-bold">Total</span>
            <span className="text-[#0891b2] text-xl font-bold">₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</span>
          </div>
          <button
            className={`bg-[#10b981] text-white py-2 px-4 rounded-lg w-full ${cartItems.length === 0 && 'cursor-not-allowed opacity-50'}`}
            onClick={() => cartItems.length !== 0 && navigate('/order')}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


// import React, { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from 'react-router-dom'

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   return (
//     <div class="mt-24">
//       <div>
//         <div class="grid grid-cols-6 items-center text-gray-500 lg:text-[1vw] md:text-[12px]">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div>
//                 <div class="grid grid-cols-6 items-center lg:text-[1vw] md:text-[12px]  m-3 text-black  ">
//                   <img class=" w-14" src={url+"/images/"+item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>₹{item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>{item.price * cartItems[item._id]}</p>
//                   <p
//                     class="cursor-pointer"
//                     onClick={() => removeFromCart(item._id)}
//                   >
//                     x
//                   </p>
//                 </div>
//                 <hr class="h-1 bg-[#e2e2e2] border-none" />
//               </div>
//             );
//           }
//         })}
//       </div>
//       <div class="mt-20 flex justify-between gap-5 flex-col-reverse sm:flex-row">
//         <div class="flex flex-col  ">
//           <h2>Cart Totals</h2>
//           <div class="flex  justify-between text-[#555]">
//             <p>Subtotal</p>
//             <p>₹{getTotalCartAmount()}</p>
//           </div>
//           <hr class="mx-3 my-0" />
//           <div class="flex  justify-between text-[#555]">
//             <p>Delivery Fee</p>
//             <p>₹{getTotalCartAmount()===0?0:50}</p>

//           </div>
//           <hr class="mx-3 my-0" />
//           <div class="flex justify-between text-[#555]">
//             <b>Total</b>
//             <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
//           </div>
//           <button class="border-none text-white bg-red-400  w-auto px-10 py-1 rounded cursor-pointer" onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div class="flex">
//           <div>
//             <p class="text-[#555] ">If you have promo code, Enter it here</p>
//             <div class=" mt-1 flex justify-between items-center bg-[#eaeaea] rounded">
//               <input class="bg-transparent border-none outline-none pl-3" type="text" placeholder="promo code" />
//               <button class=" w-36 px-6 py-2 bg-black border-none text-white rounded">Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
