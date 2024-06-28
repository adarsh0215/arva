import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let new_url = url;
    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }
    const response = await axios.post(new_url, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      loadCartData({ token: response.data.token });
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="absolute bg-[#00000090] grid z-10 w-full h-full">
      <form
        onSubmit={onLogin}
        className="flex place-self-center w-[23vw] min-w-[330px] text-[#808080] bg-white flex-col gap-6 p-6 rounded-lg text-sm animate-fadeIn"
      >
        <div className="flex justify-between items-center text-black font-semibold">
          <h2>{currState}</h2>

          <FeatherIcon
            className="w-4 z-10 cursor-pointer "
            onClick={() => setShowLogin(false)}
            size="18"
            icon="x"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" ? (
            <input
              className="outline-none border p-2 rounded-md"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          ) : (
            <></>
          )}
          <input
            className="outline-none border p-2 rounded-md"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
          />
          <input
            className="outline-none border p-2 rounded-md"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="border-none  p-2 rounded  bg-[#06b6d4] hover:bg-[#0891b2] text-base cursor-pointer text-white">
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="flex items-start gap-2  -mt-4">
          <input className="mt-1" type="checkbox" name="" id="" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-[#22d3ee] font-semibold cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-[#22d3ee] font-semibold cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
