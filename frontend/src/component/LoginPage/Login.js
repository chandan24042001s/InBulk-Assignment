import React, { useState } from 'react'
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';

const Login = () => {
  const [phoneNumber, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOTP,setShowOTP]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    });
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/upload/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Handle successful login (e.g., redirect, show success message)
        dispatch(addUser(data.data))
        alert('Login successful');
        // Redirect or perform other actions as needed
      } else {
        // Handle unsuccessful login (e.g., show error message)
        alert('Login failed');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error (e.g., show error message)
      alert('There was a problem with the login operation');
    }
  };
  

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }
  
  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6 && window.confirmationResult) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
        navigate("/home");
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }
  return (
    <div className="container flex justify-center items-center">
    <div className="login mt-10 flex flex-col justify-center gap-2 bg-black text-white p-4 rounded-xl w-[20rem]">
        <h1 className='text-2xl font-semibold mb-5 text-center'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col items-center gap-3'>
            <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none focus:border-teal-500 focus:border-2 rounded-xl text-black ' type="number" placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
            <button onClick={(e)=>{
            setShowOTP(true);
            handleSend();
            e.preventDefault(); 
            }}>Send OTP</button>
           {showOTP &&  <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none focus:border-teal-500 focus:border-2 rounded-xl text-black ' type="number" placeholder="Enter Your OTP" value={otp} onChange={verifyOtp} />}
            <button type="submit" className='p-3 bg-teal-300 w-28 text-lg rounded-3xl text-black font-semibold '>Login</button>
        </form>
        <div id="recaptcha"></div>
        <Link to={"/signup"}>
        <h1 className='text-center text-gray-300 '>New User SignUp</h1>
        </Link>
        
    </div>
</div>
  )

}

export default Login

