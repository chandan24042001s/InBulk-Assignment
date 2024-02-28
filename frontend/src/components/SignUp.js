import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import { useDispatch } from 'react-redux';


const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
 

  const [phoneNumber,setPhoneNumber]=useState("");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [imageFile, setImageFile] = useState(null);
  const [msg,setMsg]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  //Rendering Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //Backend API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(true);
    // Form data
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('imageFile', imageFile);

    try {
      const response = await fetch('https://inbulk-assignment.onrender.com/api/v1/upload/imageUpload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      
        
      
      if(data.success==true){
        setMsg(false);
        navigate('/login')
      }
      
      // Handle successful signup (e.g., redirect, show success message)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error (e.g., show error message)
    }
  };


  return (
    isLoading ? <Loader /> :   (<div className="container flex flex-col text-white gap-10 justify-center h-[100vh] items-center">
  <div class="signup  flex flex-col gap-2 justify-center  items-center bg-black text-white p-4 rounded-xl w-[20rem]">
      <h1 className='text-2xl font-semibold mb-5'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
          <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black focus:border-teal-500 focus:border-2' type="text" placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
          <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black focus:border-teal-500 focus:border-2' type="text" placeholder="Email Address"
           value={email}
           onChange={(e) => setEmail(e.target.value)}/>
          <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black focus:border-teal-500 focus:border-2' type="number" placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}/>
          <input className='w-[90%] py-2 focus:outline-none rounded-xl text-white file:rounded-lg file:text-base file:border-none file:font-semibold file:bg-teal-300  file:px-4 file:py-2' type="file"
          onChange={(e) => setImageFile(e.target.files[0])}/>
          <button type="submit" className='p-3 bg-teal-300 w-28 text-lg text-black font-semibold rounded-3xl'>Sign Up</button>
      </form>
      <Link to={"/login"}>
      <h1 className='text-gray-300'>Already have account Login</h1>
      </Link>

     
  </div> 
  {msg && <div className='text-xl flex justify-center items-center gap-4'><h1>Processing...</h1><span className="loader-1"></span></div>}
</div>)
  )
}

export default SignUp
