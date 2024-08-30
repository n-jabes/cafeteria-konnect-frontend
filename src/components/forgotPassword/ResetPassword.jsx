import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Coat_of_arms from '/Coat_of_arms.png';
import LoginBg from '../../assets/Login.png';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must include a special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

function ResetPassword(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSubmit = async (values) => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="flex flex-col w-[90%] sm:w-[55%] lg:w-[43%] bg-white h-[29rem] rounded-md shadow-md items-center justify-content">
        <div className="flex flex-col md:flex-row items-center w-[90%] md:w-[75%] mt-4 justify-center">
          <div className="">
            <img className="w-[4rem] h-[4rem] mr-3" src={Coat_of_arms} alt="" />
          </div>
          <div className="mr-3">
            <h1 className="font-black text-xl">Reset Password</h1>
          </div>
        </div>

        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="flex flex-col items-center w-[90%] md:w-[80%] lg:w-[70%] h-[17rem] justify-center">
              <div className="relative w-full">
                <Field
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  className="w-full text-sm border border-[#8F8F8F] px-2 py-3 my-3"
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
                name="newPassword"
                component="div"
                className="text-red-500 text-xs"
              />

              <div className="relative w-full">
                <Field
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full text-sm border border-[#8F8F8F] px-2 py-3 my-3"
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
                name="confirmPassword"
                component="div"
                className="w-full text-red-500 text-xs"
              />

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <button
                type="submit"
                className={`w-full px-2 text-sm py-3 m-3 font-semibold ${
                  isSubmitting || values.newPassword !== values.confirmPassword
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-mainBlue text-white'
                } transition-all duration-300 ease-in-out`}
                disabled={
                  isSubmitting || values.newPassword !== values.confirmPassword
                }
              >
                {isSubmitting ? 'Reseting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="w-[90%] md:w-[70%]">
          <p className="text-sm text-[#8F8F8F]">
            Go back?
            <Link
              to={'/login'}
              className="text-blue-500 cursor-pointer font-semibold ml-4"
            >
              Login
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
}

export default ResetPassword;
