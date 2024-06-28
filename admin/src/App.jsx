import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCoffeeShop from "./pages/Shop/AddShop";

const App = () => {
  const url = import.meta.env.VITE_API_URL;


  return (
    <div>
      <ToastContainer />
      <hr />
      <div class="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/addshop" element={<AddCoffeeShop url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
