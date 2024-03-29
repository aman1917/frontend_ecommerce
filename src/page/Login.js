import React, { useState } from "react";
import SignImage from "../assest/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state);
  console.log(userData.user);

  const dispatch = useDispatch();

  const handleShowPass = () => {
    setShowPass((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(userData.user.firstName + dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      alert("Please Enter Required Feilds");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl'>Signup</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={SignImage} alt="Signup logo" className="w-full " />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            autoComplete="username"
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500"
            value={data.email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-2 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              className="w-full bg-slate-200  outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowPass}>
              {showPass ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full m-auto max-w-[150px] text-xl text-white text-center px-1 rounded-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer">
            Sign UP
          </button>
          <p className="text text-sm my-3">
            Not Register it?{" "}
            <Link to={"/signup"} className="text-blue-500 underline">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
