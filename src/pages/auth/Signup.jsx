// src/routes/Signup.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import BlueLogo from '../../assets/BLueLogo.png';
import Coat_of_arms from '/Coat_of_arms.png';
import LoginBg from '../../assets/Login.png';
import { toast } from 'react-toastify';
import Toast from '../../components/toast/Toast';

const validationSchema = Yup.object().shape({
  names: Yup.string().required('Full names are required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  nationalId: Yup.string()
    .length(16, 'National ID must be 16 characters')
    .required('National ID is required'),
  departmentId: Yup.string().required('Department is required'),
  roleId: Yup.string().required('Role is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const { names, email, nationalId, password } = values;
    console.log("Submitted values: ", names, email, nationalId, password )
    // try {
    //   await axios.post(API_BASE_URL + '/users/signup', {
    //     names,
    //     email,
    //     nationalId,
    //     departmentId,
    //     roleId,
    //     password,
    //   });

    //   setError(null);
    //   navigate('/login');
    // } catch (error) {
    //   console.error('Signup failed:', error);
    //   setError(error.response?.data?.message || 'Signup failed');
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="relative pb-4 max-h-[80vh] overflow-y-auto flex flex-col w-[90%] sm:w-[55%] lg:w-[43%] bg-white h-auto rounded-md shadow-md items-center justify-content">
        <div className="flex flex-col md:flex-row items-center w-[90%] md:w-[75%] mt-4 justify-center">
          <div className="">
            <img className="w-[4rem] h-[4rem] mr-3" src={Coat_of_arms} alt="" />
          </div>
          <div className="mr-3">
            <h1 className="font-black text-2xl">Join Us</h1>
          </div>
          <div className="">
            <img className="w-[8rem] h-[4rem]" src={BlueLogo} alt="" />
          </div>
        </div>

        <Formik
          initialValues={{
            names: '',
            email: '',
            nationalId: '',
            // departmentId: '',
            // roleId: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" flex flex-col items-center w-[90%] md:w-[80%] lg:w-[70%] h-auto justify-center">
              <Field
                name="names"
                type="text"
                placeholder="Full Names"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-2 outline-none"
              />
              <ErrorMessage
                name="names"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-2 outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                name="nationalId"
                type="text"
                placeholder="National ID"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-2 outline-none"
              />
              <ErrorMessage
                name="nationalId"
                component="div"
                className="text-red-500 text-xs"
              />

              {/* <Field
                name="departmentId"
                type="text"
                placeholder="Department ID"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-2 outline-none"
              />
              <ErrorMessage
                name="departmentId"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                name="roleId"
                type="text"
                placeholder="Role ID"
                className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-2 outline-none"
              />
              <ErrorMessage
                name="roleId"
                component="div"
                className="text-red-500 text-xs"
              /> */}

              <div className="relative w-full">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full text-sm border border-[8F8F8F] px-2 py-3 my-2 outline-none"
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
                {isSubmitting ? 'Submitting' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-[90%] md:w-[70%]">
          <p className="text-sm text-[#8F8F8F]">
            Already have an account?
            <Link
              to={'/login'}
              className="text-blue-500 cursor-pointer font-semibold ml-4"
            >
              Log in
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

export default Signup;
