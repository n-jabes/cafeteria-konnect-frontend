import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import BlueLogo from '../../assets/BLueLogo.png';
import Coat_of_arms from '/Coat_of_arms.png';
import LoginBg from '../../assets/Login.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

function ForgotPassword(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    // setIsSubmitting(true);
    // const { email } = values;
    // try {
    //   const response = await axios.post(API_BASE_URL + '/sendEmail', {
    //     email,
    //   });

    //   navigate('/');
    // } catch (error) {
    //   console.error('Failed to send Email:', error);
    //   setError(error?.response?.data?.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
    navigate('/reset-password')
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="flex flex-col w-[90%] sm:w-[55%] lg:w-[43%] bg-white h-[29rem] rounded-md shadow-md items-center justify-content ">
        <div className=" flex flex-col md:flex-row items-center w-[90%] md:w-[75%] mt-4 justify-center">
          <div className="">
            <img className="w-[4rem] h-[4rem] mr-3" src={Coat_of_arms} alt="" />
          </div>
          <div className="mr-3">
            <h1 className="font-black text-xl">1. Email Verification</h1>
          </div>
        </div>

        <Formik
          initialValues={{ email: '' }}
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
                {isSubmitting ? 'Verifying' : 'Verify Email'}
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

export default ForgotPassword;
