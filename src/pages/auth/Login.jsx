// src/routes/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

   
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('public/login.png')`}}>

      <div className='flex flex-col w-[43%] bg-white h-[27rem] rounded-md shadow-md items-center justify-content '>
        
      <div className=' flex items-center w-[75%] mt-4 justify-center'>
        <div className='mr-3'>
          <h1 className='font-black text-2xl'>Welcome to </h1>
          </div>
          <div className=''>
          <img className="w-8rem] h-[4rem]"    src="/public/BlueLogo.png" alt="" />
          </div>
        </div>


        <div className=' flex flex-col  items-center w-[70%] h-[17rem]  justify-center'>

          <input type="email" name="" id="" placeholder='Username' className='w-full text-sm border border-[8F8F8F] px-2 py-3 m-3' />
          <input type="password" name="" id="" placeholder='Password' className='w-full text-sm border border-[8F8F8F] px-2 py-3 m-3' />
          <input type="button" value="Login" className='w-full px-2 text-sm py-3 bg-red-200 m-3 bg-[#078ECE] text-white font-semibold ' />
        </div>

        <div className='w-[70%]'>
          <p className='text-sm text-[#8F8F8F]'>Forgot your password?</p>
        </div>

      </div>

      <div className='w-[20%] mt-4'>
        <div className='w-full  '>
        <p className='text-white text-xs capitalize'>Powered by rwanda coding academy</p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
