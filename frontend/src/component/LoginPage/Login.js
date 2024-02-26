import React, { useState } from 'react'
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    });
  }

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
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

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }

if(!hasFilled){
  return (
    <div class="flex justify-center items-center">
    <div class="signup mt-20 flex flex-col justify-center bg-black text-white p-4 rounded-xl w-[20rem]">
        <h1 className='text-2xl font-semibold mb-5 text-center'>Login</h1>
        <form className='flex flex-col justify-center items-center gap-3' onSubmit={handleSend}>
           
           <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="tel" placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>

         
           {/* <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="number" placeholder="Enter Your OTP Buddy"/> */}
        
           <button type="submit" className='p-3 bg-teal-300 w-24 rounded-xl'>Send OTP</button>
       </form>
      </div>
</div>
  )
}
else{
  return (
    <div class="flex justify-center items-center">
    <div class="signup mt-20 flex flex-col justify-center bg-black text-white p-4 rounded-xl w-[20rem]">
        <h1 className='text-2xl font-semibold mb-5 text-center'>Login</h1>
        <form className='flex flex-col justify-center items-center gap-3'>
           
           {/* <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="number" placeholder="Phone Number"/> */}

         
           <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="tel" placeholder="Enter Your OTP Buddy" value={otp} onChange={verifyOtp}/>
        
           
       </form>
      </div>
</div>
  )
}
}

export default Login

