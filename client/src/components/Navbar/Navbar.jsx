import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import FeatherIcon from "feather-icons-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar py-5 flex justify-between items-center mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 px-4">
      <Link to="/">
        <img className="logo w-24 md:w-28" src={assets.Kaffee} alt="" />
      </Link>
      <div className="navbar-right flex items-center gap-10 md:gap-7 lg:gap-5">
        <Link to="/cart" className="navbar-search-icon relative">
          <FeatherIcon icon="shopping-bag" stroke="#0891b2" />
          {getTotalCartAmount() > 0 && (
            <div className="dot absolute min-w-[10px] min-h-[10px] bg-[#FF4C24] rounded-full top-[-8px] right-[-8px]"></div>
          )}
        </Link>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-lg text-white bg-[#06b6d4] border border-[#dbeafe] px-7 py-2.5 rounded-full cursor-pointer transition duration-300 hover:bg-[#0891b2]"
          >
            sign in
          </button>
        ) : (
          <div className=" relative group">
            {/* <img src={assets.profile_icon} alt="" /> */}
            <FeatherIcon icon="user" stroke="#0891b2" />
            <ul className="navbar-profile-dropdown absolute hidden group-hover:flex flex-col gap-2 bg-[#ecfeff] p-3 px-4 border border-tomato rounded outline outline-2 outline-white right-0 z-10  ">
              <li
                onClick={() => navigate("/myorders")}
                className="flex items-center gap-2 cursor-pointer hover:text-[#67e8f9]"
              >
                {" "}
                <FeatherIcon icon="layers" size="14" stroke="#0891b2" />{" "}
                <p>Orders</p>
              </li>
              <hr className="bg-gray-500 h-px" />
              <li
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:text-[#67e8f9]"
              >
                {" "}
                <FeatherIcon icon="log-out" size="14" stroke="#0891b2" />{" "}
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
