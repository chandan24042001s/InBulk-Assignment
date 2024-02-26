import React from 'react'

const SignUp = () => {
  return (
      <div class="flex justify-center items-center">
        <div class="signup mt-20 flex flex-col justify-center items-center bg-black text-white p-4 rounded-xl w-[20rem]">
            <h1 className='text-2xl font-semibold mb-5'>Sign Up</h1>
            <form className='flex flex-col items-center justify-center gap-3'>
                <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="text" placeholder="Full Name"/>
                <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="text" placeholder="Email Address"/>
                <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-black ' type="number" placeholder="Phone Number"/>
                <input className='w-[90%] px-4 py-2 border border-gray focus:outline-none rounded-xl text-white ' type="file"/>
                <button type="submit" className='p-3 bg-teal-300 w-24 rounded-xl'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp