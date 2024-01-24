import React, { useState } from "react";
import SignImage from "../assest/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImageToBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigator = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
    image: "",
  });
  const handleShowPass = () => {
    setShowPass((preve) => !preve);
  };
  const handleShowConfirmPass = () => {
    setShowConfirmPass((preve) => !preve);
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
    const { firstname, lastname, email, password, confirm } = data;
    if (firstname && lastname && email && password && confirm) {
      if (password === confirm) {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchData.json();
        alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigator("/login");
        }
      } else {
        alert("Check Password & Confirm Password Must Same");
      }
    } else {
      alert("Please Enter Required Feilds");
    }
  };

  const handleProfile = async (e) => {
    // console.log(e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md cursor-pointer">
          <img
            src={data.image ? data.image : SignImage}
            alt="Signup logo"
            className="w-full h-full "
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden course-pointer"
              onChange={handleProfile}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstname">FirstName</label>
          <input
            type={"text"}
            id="firstname"
            name="firstname"
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-2 rounded focus-within:outline-blue-500"
            value={data.firstname}
            onChange={handleOnChange}
          />
          <label htmlFor="lastname">LastName</label>
          <input
            type={"text"}
            id="lastname"
            name="lastname"
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500"
            value={data.lastname}
            onChange={handleOnChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            autoComplete="username"
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500"
            value={data.username}
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
          <label htmlFor="confirm">Confirm Password</label>
          <div className="flex px-2 py-2 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showConfirmPass ? "text" : "password"}
              id="confirm"
              name="confirm"
              autoComplete="new-password"
              className="w-full bg-slate-200 border-none outline-none "
              value={data.confirm}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowConfirmPass}>
              {showConfirmPass ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full m-auto max-w-[150px] text-xl text-white text-center px-1 rounded-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer">
            Sign UP
          </button>
          <p className="text text-sm my-3">
            Already Have Account ?{" "}
            <Link to={"/login"} className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
