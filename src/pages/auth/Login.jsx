// src/routes/Login.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import BlueLogo from '../../assets/BLueLogo.png';
import Coat_of_arms from '/Coat_of_arms.png';
import LoginBg from '../../assets/Login.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const { email, password } = values;
    try {
      const response = await axios.post(API_BASE_URL + '/users/login', {
        email,
        password,
      });

      const token = response.data.data.access_token;
      sessionStorage.setItem('token', token);

      login(token);

      setError(null);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="relative flex flex-col w-[90%] sm:w-[55%] lg:w-[43%] bg-white h-[29rem] rounded-md shadow-md items-center justify-content ">
        <div className=" flex flex-col md:flex-row items-center w-[90%] md:w-[75%] mt-4 justify-center">
          <div className="">
            <img className="w-[4rem] h-[4rem] mr-3" src={Coat_of_arms} alt="" />
          </div>
          <div className="mr-3">
            <h1 className="font-black text-2xl">Welcome to </h1>
          </div>
          <div className="">
            <img className="w-[8rem] h-[4rem]" src={BlueLogo} alt="" />
          </div>
        </div>

        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center w-[90%] md:w-[80%] lg:w-[70%] h-[17rem] justify-center">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-3"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
              <div className="relative w-full">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full text-sm border border-[8F8F8F] px-2 py-3 "
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-[50%] transform -translate-y-[50%] cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
              <div className="flex items-center mt-2">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <button
                type="submit"
                className={`w-full px-2 text-sm py-3 m-3 font-semibold ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-mainBlue text-white'
                } transition-all duration-300 ease-in-out`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="w-[90%] md:w-[70%]">
          <p className="text-sm text-[#8F8F8F]">
            Forgot your password?
            <Link
              to={'/forgot-password'}
              className="text-blue-500 cursor-pointer font-semibold ml-4"
            >
              Reset
            </Link>
          </p>
        </div>
        <div className="w-[90%] md:w-[80%] text-center absolute bottom-4">
          <p className="text-xs text-[#8F8F8F]">
            Don't have an account?
            <Link
              to={'/sign-up'}
              className="text-blue-500 cursor-pointer font-semibold ml-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-max mt-4">
        <div className="w-full">
          <p className="text-white text-xs capitalize">
            Powered by Rwanda Coding Academy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
