import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import ShopPage from "./pages/ShopPage/ShopPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/shop/:shopId" element={<ShopPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
