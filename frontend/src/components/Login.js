import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState("");
  const [OTP, setOTP] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //OTP Generator
  const OTPhandler = (e) => {
    e.preventDefault();
    const generatedOTP = Math.floor(Math.random() * 9000) + 1000;
    setOTP(generatedOTP);
    setShowOTP(true);
  };
  
  //Backend API Calling
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if OTP and verifyOTP are equal
    if (OTP != verify) {
      alert("OTP verification failed");
      return; // Exit the function if OTPs do not match
    }

    try {
      const response = await fetch(
        "https://inbulk-assignment.onrender.com/api/v1/upload/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        
        // Handle successful login (e.g., redirect, show success message)
        dispatch(addUser(data.data));
        alert("Login successful");
        navigate("/home");
        // Redirect or perform other actions as needed
      } else {
        // Handle unsuccessful login (e.g., show error message)
        alert("Login failed");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error (e.g., show error message)
      alert("There was a problem with the login operation");
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center h-[100vh] items-center">
        {/* random number container*/}
        {showOTP && (
          <div className="bg-black text-white font-semibold p-4 animate-bounce w-[25%] rounded-xl">
            <h1>Your OTP is {OTP} </h1>
          </div>
        )}
        <div className="login  flex flex-col justify-center gap-2 bg-black text-white p-4 rounded-xl w-[20rem]">
          <h1 className="text-2xl font-semibold mb-5 text-center">Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-3"
          >
            <input
              className="w-[90%] px-4 py-2 border border-gray focus:outline-none focus:border-teal-500 focus:border-2 rounded-xl text-black "
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            {showOTP && (
              <input
                className="w-[90%] px-4 py-2 border border-gray focus:outline-none focus:border-teal-500 focus:border-2 rounded-xl text-black "
                type="number"
               
                onChange={(e) => setVerify(e.target.value)}
                placeholder="Enter Your OTP"
              />
            )}
            {showOTP ? (
              <button
                type="submit"
                className="p-3 bg-teal-300 w-28 text-lg rounded-3xl text-black font-semibold "
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                onClick={OTPhandler}
                className="p-3 bg-teal-300 w-28 text-base rounded-3xl text-black font-semibold "
              >
                Send OTP
              </button>
            )}
          </form>
          <Link to={"/signup"}>
            <h1 className="text-center text-gray-300 ">New User SignUp</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
