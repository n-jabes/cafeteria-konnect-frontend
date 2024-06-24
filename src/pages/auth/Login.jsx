// src/routes/Login.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem('isAuthenticated', true);
    navigate('/hr/statistics');
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('/public/login.png')` }}
    >
      <div className="flex flex-col w-[90%] sm:w-[55%] lg:w-[43%] bg-white h-[27rem] rounded-md shadow-md items-center justify-content ">
        <div className=" flex flex-col md:flex-row items-center w-[90%] md:w-[75%] mt-4 justify-center">
          <div className="mr-3">
            <h1 className="font-black text-2xl">Welcome to </h1>
          </div>
          <div className="">
            <img
              className="w-[8rem] h-[4rem]"
              src="/public/BlueLogo.png"
              alt=""
            />
          </div>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            //logic
          }}
        >
          <Form className="flex flex-col  items-center w-[90%] md:w-[80%] lg:w-[70%] h-[17rem]  justify-center">
            <Field
              name="email"
              type="email"
              placeholder="Username"
              className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-3"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full text-sm border border-[8F8F8F] px-2 py-3 m-3"
            />
            <button
              type="submit"
              className="w-full px-2 text-sm py-3 m-3 bg-[#078ECE] text-white font-semibold "
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </Form>
        </Formik>
        <div className="w-[90%] md:w-[70%]">
          <p className="text-sm text-[#8F8F8F]">Forgot your password?</p>
        </div>
      </div>

      <div className="w-max mt-4">
        <div className="w-full  ">
          <p className="text-white text-xs capitalize">
            Powered by rwanda coding academy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
