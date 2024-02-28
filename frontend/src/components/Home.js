import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showProfile, setShowProfile]=useState(false)
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const store=useSelector(state=>state.user.User);
  const profileHandler=()=>{
    setShowProfile(!showProfile)
  }
 console.log(store);
  const logout=()=>{
    dispatch(removeUser());
    navigate("/login")
  }
  return (
    <>
     <div className="flex justify-end m-5">
    <button
          onClick={logout}
          type="submit"
          className="px-3 py-2 text-end bg-[#0766ff] text-white font-semibold rounded-xl"
        >
          Logout
    </button>
    </div>
      <div className="flex flex-col gap-5 mt-20 items-center h-[100vh]">
      <div className="text-white bg-[#0766ff] text-3xl px-4 py-2 rounded-xl tracking-wider "><h1>Welcome {store.name}</h1></div>
        <button
          onClick={profileHandler}
          type="submit"
          className="px-3 py-2  bg-[#0766ff] text-white font-semibold rounded-xl"
        >
          View Your Profile
        </button>
        {showProfile && (<div className=" flex flex-col justify-center items-center  p-5 gap-4 font-medium text-white bg-black rounded-xl bg-opacity-50">
          <img
            className="user-img"
            src={require("../Images/chandan.jpeg")}
            alt=""
          />
          <div>
          <p>Name: {store.name}</p>
          <p>Phone Number: {store.phoneNumber} </p>
          <p>Email: {store.email} </p>
          </div>
        </div>)}
      </div>
    </>
  );
};

export default Home;
