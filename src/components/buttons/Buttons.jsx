import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../table/TableComponent';
import attendeesDb from '../../db/attendee';
import { FaRegEye } from 'react-icons/fa6';
import {
  FaBell,
  FaDownload,
  FaEdit,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';
import InvoiceTable from '../table/InvoiceTable';
import { IoPrint } from 'react-icons/io5';
import { GoTrash } from 'react-icons/go';
import ReactToPrint from 'react-to-print';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BsQrCode } from 'react-icons/bs';
import QRCode from 'qrcode';
import { WhatsappShareButton } from 'react-share';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { Bounce, toast } from 'react-toastify';
import { MdDangerous } from 'react-icons/md';
const token = sessionStorage.getItem('token');

export function MainButton({ text }) {
  return (
    <button className="btn btn-primary text-white float-right bg-mainBlue border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]">
      {text}
    </button>
  );
}

export function SendAllNewGuestsToCBMButton() {
  return (
    <button className="btn btn-primary bg-mainGreen border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-mainGreen hover:border-2 hover:border-mainGreen">
      Send All New Guests To CBM
    </button>
  );
}

export function UpdateAttendeeButton({ attendeeDetails }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = sessionStorage.getItem('token');
  const statuses = [
    { id: 1, name: 'active' },
    { id: 2, name: 'on leave' },
    { id: 3, name: 'on pause' },
  ];
  //fetching all departments
  const getAllDepartments = async () => {
    try {
      const response = await axios.get(API_BASE_URL + '/departments/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allDepartments = response.data.data.map((dept) => ({
        id: dept.id,
        department: dept.department,
      }));
      setDepartments(allDepartments);
    } catch (error) {
      console.log(
        'Failed to fetch departments',
        error.response?.data?.message || error.message
      );
    }
  };

  //fetching all roles
  const getAllRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allRoles = response.data.data.map((role) => ({
        id: role.id,
        role: role.role,
      }));
      setRoles(allRoles);
    } catch (error) {
      console.log(
        'Failed to fetch roles',
        error.response?.data?.message || error.message
      );
    }
  };

  const handleUpdate = () => {
    console.log('Updating');
  };

  // Fetch the roles and departments when the component mounts
  useEffect(() => {
    getAllRoles();
    getAllDepartments();
  }, []);

  return (
    <div>
      {showUpdateForm && (
        <div className="fixed top-0 left-0  bg-bgBlue h-screen w-screen overflow-y-auto z-40 overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] md:left-[7%] lg:w-[40%] md:w-[58%] sm:w-[75%] h-max px-[3.5%] py-[3%] rounded-md overflow-y-auto">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowUpdateForm(false)}
            >
              x
            </button>
            <div className=" flex flex-col gap-3">
              <h1 className="text-mainBlue font-semibold text-md md:text-xl ">
                Update Attendee:
                <span className="text-gray-600">{attendeeDetails.name}</span>
              </h1>

              <Formik
                initialValues={{
                  names: attendeeDetails.name,
                  email: attendeeDetails.email,
                  role: attendeeDetails.role,
                  NID: attendeeDetails.nationalId,
                  department: attendeeDetails.department,
                  status: attendeeDetails.attendanceStatus,
                }}
                onSubmit={(values) => {
                  // Handle form submission logic here (update attendee data)
                  alert(JSON.stringify(values, null, 2));
                  handleUpdate;
                }}
              >
                <Form className="flex flex-col w-full lg:h-max h-max md:h-max justify-center gap-[0.4rem]">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Names
                    </label>
                    <div className="flex md:flex-row flex-col gap-3">
                      <Field
                        name="names"
                        type="text"
                        placeholder="First name"
                        className="w-full text-xs border focus:border-gray-300 focus:outline-none px-2 py-3 "
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email address"
                      className="w-full text-xs border focus:border-gray-300 focus:outline-none px-2 py-3 "
                    />
                  </div>

                  <div className="flex md:flex-row flex-col gap-3">
                    <div className="flex flex-col gap-2 md:w-1/2">
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <Field
                        as="select"
                        id="department"
                        name="department"
                        className="block w-full px-3 py-2 mb-3 text-gray-500 text-xs border  focus:border-gray-300 focus:outline-none rounded shadow-sm overflow-x-none"
                      >
                        {departments.map((dept) => (
                          <option
                            key={dept.id}
                            value={dept.department}
                            className="w-full"
                          >
                            {dept.department}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="block w-full px-3 py-2 mb-3 text-gray-500 text-xs border rounded shadow-sm focus:outline-none"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.role}>
                            {role.role}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="flex flex-col w-full ">
                    <label htmlFor="status" className="text-xs text-gray">
                      Status
                    </label>
                    <Field
                      as="select"
                      id="department"
                      name="department"
                      className="block w-full px-3 py-2 mb-3 text-gray-500 text-xs border focus:border-gray-300 focus:outline-none rounded shadow"
                    >
                      {statuses.map((status) => (
                        <option key={status.id} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="flex md:flex-row flex-col gap-3">
                    <div className="flex flex-col gap-2 md:w-1/2">
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Start Date
                      </label>
                      <Field
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="block w-full cursor-pointer px-3 py-2 mb-3 text-gray-500 text-xs border  focus:border-gray-300 focus:outline-none rounded shadow-sm overflow-x-none"
                      ></Field>
                    </div>

                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        End Date
                      </label>
                      <Field
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="block w-full cursor-pointer px-3 py-2 mb-3 text-gray-500 text-xs border rounded shadow-sm focus:outline-none"
                      ></Field>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      National Id
                    </label>
                    <Field
                      name="NID"
                      type="text"
                      placeholder="Enter your National Id"
                      className="w-full text-xs border focus:border-gray-300 focus:outline-none px-2 py-3 "
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn border-2 border-[#078ECE] bg-[#078ECE] text-md font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3"
                  >
                    Update Guest
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary hover:bg-mainBlue hover:text-white  rounded-[8px] py-1 px-[4px] text-mainBlue font-medium text-lg"
        onClick={() => setShowUpdateForm(true)}
      >
        <FaEdit />
      </button>
    </div>
  );
}

export function UpdateGuestButton({ guest }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div>
      {showUpdateForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowUpdateForm(false)}
            >
              x
            </button>
            <h1 className="text-mainBlue font-semibold text-md md:text-xl">
              Update Guest: <span className="text-gray-400">{guest.id}</span>
            </h1>
            <form action="#" className="w-full">
              <div className="flex flex-col mb-2">
                <label htmlFor="name" className="text-xs text-gray">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter guest full name"
                  name="name"
                  defaultValue={guest.name}
                  className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="purpose" className="text-xs text-gray">
                  Purpose
                </label>
                <input
                  type="text"
                  placeholder="Enter guest purpose: eg. consultant"
                  name="purpose"
                  defaultValue={guest.purpose}
                  className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[48%] flex flex-col mb-2">
                  <label htmlFor="startDate" className="text-xs text-gray">
                    Starting date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={guest.startDate}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
                <div className="w-[48%] flex flex-col mb-2">
                  <label htmlFor="endDate" className="text-xs text-gray">
                    End date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={guest.endDate}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn border-2 border-[#078ECE] bg-[#078ECE] text-md font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3"
              >
                Update Guest
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary hover:bg-mainBlue hover:text-white  rounded-[8px] py-1 px-[4px] text-mainBlue font-medium text-lg"
        onClick={() => setShowUpdateForm(true)}
      >
        <FaEdit />
      </button>
    </div>
  );
}

export function DeleteButton() {
  return (
    <button className="btn btn-primary hover:bg-darkRed hover:text-white rounded-[8px] py-1 px-[4px]  text-darkRed font-medium text-lg">
      <GoTrash />
    </button>
  );
}

export function ViewAttendeeButton({ attendeeDetails }) {
  const [attendeeLastLunch, setAttendeeLastLunch] = useState([]);
  const [lastLunchCount, setLastLunchCount] = useState(0); // State for unique count

  //headers for the table
  const attendeeHeaders = ['lastlunch'];

  //Attendee's data filtered for the table
  useEffect(() => {
    const filteredAttendees = attendeesDb.filter(
      (attendee) => attendee.id === attendeeDetails.id
    );
    const formattedData = filteredAttendees.map((attendee) => [
      attendee.lastLunch,
    ]);
    setAttendeeLastLunch(formattedData);
    setLastLunchCount(countLastLunch(attendeeLastLunch)); // Calculate and store count
  }, [attendeeDetails.id]);

  //the count of data in attendeelastlunch
  function countLastLunch(attendeeLastLunch) {
    return new Set(attendeeLastLunch.map((item) => item[0])).size;
  }
  //form displayed after view button is clicked
  const [showViewForm, setViewButton] = useState(false);

  // formik for finding the information of lunchs an attendee took

  //validation
  const validationSchema = Yup.object({
    startDate: Yup.date().required('Start date is required'),
    finalDate: Yup.date()
      .required('End date is required')
      .when(
        'startDate',
        (startDate, schema) =>
          startDate &&
          schema.min(startDate, 'End date must be after start date')
      ),
  });

  // To handle the submission
  const handleFilterSubmit = (values, { setSubmitting }) => {
    const { startDate: startDateString, finalDate: finalDateString } = values;
    const attendeeId = attendeeDetails.id; // Access attendee ID from props

    // Convert startDate and finalDate strings to Date objects
    const startDate = new Date(startDateString);
    const endDate = new Date(finalDateString);

    // Logic to find dates between start and end date (inclusive)
    const allDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
      allDates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
    }

    // Logic to filter attendee lunches based on the date range
    const filteredLunches = attendeesDb.filter((lunch) => {
      const lunchDate = new Date(lunch.lastLunch);
      return (
        lunch.id === attendeeId &&
        lunchDate >= startDate &&
        lunchDate <= endDate
      );
    });

    // Update the state with filtered lunches
    const formattedData = filteredLunches.map((attendee) => [
      attendee.lastLunch,
    ]);
    setAttendeeLastLunch(formattedData);
    setLastLunchCount(countLastLunch(formattedData));

    setSubmitting(false);
  };
  return (
    <div>
      {showViewForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[84%] sm:w-[75%] md:w-[60%] lg:w-[50%]   h-max px-[2.5%] py-[2.5%] rounded-md">
            <div className="mx-auto flex flex-col h-full gap-4">
              <button
                className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                onClick={() => setViewButton(false)}
              >
                x
              </button>

              <h1 className=" w-[90%] text-gray-500 font-semibold text-md md:text-[1.1rem]">
                Employee Details for:{' '}
                <span className=" text-mainBlue ">{attendeeDetails.name}</span>
              </h1>
              <p className="text-gray-500 text-[1rem]">
                Role :{' '}
                <span className="text-mainBlue font-bold capitalize">
                  {attendeeDetails.role}
                </span>
              </p>

              <Formik
                initialValues={{ startDate: null, finalDate: null }}
                validationSchema={validationSchema}
                onSubmit={handleFilterSubmit}
              >
                {({ values, handleChange, errors, touched, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="w-full flex lg:flex-row flex-col gap-2">
                      <div className="lg:w-[37%] w-full ">
                        <label
                          htmlFor="startDate"
                          className="text-xs text-gray h-3 my-auto pr-1"
                        >
                          From :
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          className={`text-xs lg:w-[8rem] w-full h-[2rem] border-[1px] border-gray rounded-[0.15rem] capitalize ${
                            errors.startDate && touched.startDate
                              ? 'border-red-500'
                              : ''
                          }`}
                          value={values.startDate || ''}
                          onChange={handleChange}
                          required
                        />
                        {errors.startDate && touched.startDate && (
                          <div className="text-red-500 text-xs">
                            {errors.startDate}
                          </div>
                        )}
                      </div>
                      <div className="lg:w-[37%] w-full">
                        <label
                          htmlFor="endDate"
                          className="text-xs text-gray h-3 my-auto pr-1"
                        >
                          To :
                        </label>
                        <input
                          type="date"
                          name="finalDate"
                          value={values.finalDate || ''}
                          className={`outline-none text-xs  lg:w-[8rem] w-full h-[2rem] border-[1px] border-gray rounded-[0.15rem] capitalize ${
                            errors.startDate && touched.startDate
                              ? 'border-red-500'
                              : ''
                          }`}
                          onChange={handleChange}
                          required
                        />
                        {errors.finalDate && touched.finalDate && (
                          <div className="text-red-500 text-xs">
                            {errors.finalDate}
                          </div>
                        )}
                      </div>
                      <div className="lg:w-[20%] w-full text-white">
                        <input
                          type="Submit"
                          value="Filter"
                          className="text-sm text-white lg:w-[8rem] w-full h-[2rem] border-[1px] bg-mainBlue rounded-[0.15rem] capitalize hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </Formik>

              <div className="mt-2 flex sm:flex-row flex-col-reverse w-full gap-3">
                <div className="sm:w-[65%] w-full md  lg:h-[16rem]  md:h-[14rem] border border-3 border-mainBlue rounded-md pt-2 pl-2">
                  <TableComponent
                    title=""
                    headers={attendeeHeaders}
                    data={attendeeLastLunch}
                    showCheckBox={false}
                  />
                </div>
                <div className="sm:w-[34%] w-full md:pl-4 ">
                  <div className="w-full  flex md:flex-col items-center   text-center  ">
                    <div className="h-[17.5rem] h-full border border-1 border-mainBlue w-full border-gray rounded-md text-sm">
                      <p className="mt-4 flex flex-col items-center">
                        <span className="font-bold text-4xl md:text-8xl text-gray-400 flex flex-col md:flex-row">
                          {lastLunchCount}
                        </span>
                      </p>
                      <div className="flex flex-col gap-3">
                        {/* <p className="text-black font-bold text-[1rem]">
                          From
                        </p>
                        <p>01/20/2024</p>
                        <p className="text-black font-bold text-[1rem]">to</p>
                        <p>04/5/2024</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FaRegEye
        className="text-2xl text-gray-600 mx-2 cursor-pointer py-1 px-[4px] hover:bg-gray-400 hover:text-white rounded-md"
        onClick={() => setViewButton(true)}
      />
    </div>
  );
}

export function AttendeeQrCodeButton({ attendeeDetails }) {
  const [showViewCode, setShowViewCode] = useState(false);
  const [src, setSrc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const qrCodeRef = useRef(null);
  const { encryptData, secretKey } = useAuth();
  const token = sessionStorage.getItem('token');

  const generateUniqueIdentifier = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  };

  const handleGenerateCode = async () => {
    const uniqueIdentifier = generateUniqueIdentifier();

    const qrCodeData = {
      userId: `${attendeeDetails.userId}`,
      userEmail: `${attendeeDetails.email}`,
      qrCodeId: `${uniqueIdentifier}`,
    };

    // console.log('qrCodeData: ', qrCodeData);

    const encryptedData = await encryptData(
      JSON.stringify(qrCodeData),
      secretKey
    );

    try {
      const response = await axios.post(
        `${API_BASE_URL}/userQrcodes/save`,
        {
          //remember to use the dynamic data sent form the qrCodeData
          userId: qrCodeData.userId,
          userEmail: qrCodeData.userEmail,
          qrCodeId: qrCodeData.qrCodeId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response: ', response);
      QRCode.toDataURL(encryptedData).then((value) => setSrc(value));
      toast.success('QrCode created successfully', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      console.log(
        'Failed to create QR code',
        error.response.data.message || error.message
      );
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${attendeeDetails.name}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const handleShareViaWhatsApp = () => {
  //   console.log('via whatsapp');
  // };

  const handleShareViaWhatsApp = () => {
    console.log('sharing via whatsapp');
  };

  return (
    <div>
      {showViewCode && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[80%] lg:w-[50%] h-max md:h-[80vh] px-[2.5%] py-[2.5%] rounded-md">
            <div className="mx-auto flex flex-col h-full gap-4">
              <button
                className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                onClick={() => setShowViewCode(false)}
              >
                x
              </button>

              <h1 className="text-gray-500 font-semibold text-md md:text-[1.1rem]">
                Qr Code For:
                <span className=" text-mainBlue pl-2">
                  {attendeeDetails.name}
                </span>
              </h1>
              <button
                className="text-white flex items-center py-2 px-4 gap-2 border-[1px] border-gray-400 bg-gray-400 hover:text-gray-400 hover:bg-white mx-auto"
                onClick={handleGenerateCode}
              >
                Generate Code
              </button>
              <div
                ref={qrCodeRef}
                className="w-[80%] md:w-[60%] h-[25vh] md:h-[40vh] border-[1px] border-gray-300 mx-auto flex items-center justify-center"
              >
                {src === '' ? (
                  "Don't have Qr code yet"
                ) : (
                  <img className="h-[90%] w-[70%] text-mainBlue" src={src} />
                )}
              </div>
              {errorMessage && (
                <div className="error text-red-500 mt-2 relative border-[1px] min-h-[10vh] h-max p-2 flex flex-col md:flex-row gap-2 items-start md:items-center">
                  <button
                    className="close border-[1px] border-mainRed rounded-md px-2 text-mainRed absolute right-2 top-2 text-sm"
                    onClick={() => setErrorMessage()}
                  >
                    x
                  </button>
                  <MdDangerous className="text-6xl" />
                  <p className="w-[80%] text-sm">{errorMessage}</p>
                </div>
              )}
              <div className="my-2 flex w-[80%] md:w-[60%] flex-col md:flex-row items-start md:items-center md:justify-between gap-4 md:gap-8 mx-auto">
                <button
                  className="text-white flex items-center py-2 px-4 gap-2 border-[1px] border-[#078ECE] bg-[#078ECE] hover:bg-white hover:text-[#078ECE]"
                  onClick={handleDownload}
                >
                  <FaDownload /> Download
                </button>
                <div
                  className="text-white flex items-center py-2 px-4 gap-2 border-[1px] border-green-500 bg-green-500 hover:text-green-500 hover:bg-white"
                  onClick={handleShareViaWhatsApp}
                >
                  {/* <FaWhatsapp /> Share via Whatsapp */}
                  <WhatsappShareButton className="flex items-center gap-2">
                    <FaWhatsapp />
                    Share via Whatsapp
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <button
        className="text-xs text-[#078ECE] mx-2 cursor-pointer py-1 px-[4px] hover:bg-gray-400  rounded-md border-[1px] border-green-200 hover:bg-[#078ECE] hover:text-white"
        onClick={() => setShowViewCode(true)}
      >
        Qr Code
      </button> */}

      <button
        className="text-lg text-gray-500 mx-2 cursor-pointer  rounded-md hover:text-[#078ECE] "
        onClick={() => setShowViewCode(true)}
      >
        <BsQrCode />
      </button>
    </div>
  );
}

export function SendToCBMButton({ guest }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(guest.status !== 'New');

  useEffect(() => {
    setIsSent(guest.status !== 'New');
  }, [guest.status]);

  const handleClick = () => {
    setIsLoading(true);

    // Simulate sending to CBM with a delay (replace with actual logic)
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1000);

    console.log('Sending to CBM...');
  };

  return (
    <button
      className={`font-medium text-xs border-[1px] rounded-[8px] py-[2px] px-[6px] text-nowrap ${
        isSent
          ? 'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100'
          : 'text-[#2DB94C] border-[#2DB94C] hover:bg-[#2DB94C] hover:text-white'
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
      disabled={isSent || isLoading} // Disable the button when sent or loading
    >
      {isLoading ? 'Sending...' : isSent ? 'Sent' : 'Send To CBM'}
    </button>
  );
}

export function ApproveButton({ invoice }) {
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    invoice.status !== 'New'
  );

  useEffect(() => {
    setActionPerformed(invoice.status !== 'New');
  }, [invoice.status]);

  return (
    <div>
      {showApproveForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowApproveForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to approve?
            </h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn mt-4 text-white font-semibold btn-primary bg-mainGreen border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-mainGreen border-mainGreen"
                onClick={() => setShowApproveForm(false)}
              >
                Yes, I Approve
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary  border-[1px] rounded-[8px] py-[2px] px-[6px] font-medium text-xs ${
          actionPerfomed
            ? 'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-mainGreen hover:text-white border-mainGreen text-mainGreen'
        }`}
        onClick={() => setShowApproveForm(true)}
        disabled={actionPerfomed}
      >
        approve
      </button>
    </div>
  );
}

export function ApproveReceiptButton({ receipt }) {
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    receipt.status !== 'New'
  );

  useEffect(() => {
    setActionPerformed(receipt.status !== 'New');
  }, [receipt.status]);

  return (
    <div>
      {showApproveForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowApproveForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to approve?
            </h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn mt-4 text-white font-semibold btn-primary bg-mainGreen border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-mainGreen border-mainGreen"
                onClick={() => setShowApproveForm(false)}
              >
                Yes, I Approve
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary  border-[1px] rounded-[8px] py-[2px] px-[6px] font-medium text-xs ${
          actionPerfomed
            ? 'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-mainGreen hover:text-white border-mainGreen text-mainGreen'
        }`}
        onClick={() => setShowApproveForm(true)}
        disabled={actionPerfomed}
      >
        approve
      </button>
    </div>
  );
}

export function DeclineButton({ invoice }) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    invoice.status != 'New' ? true : false
  );

  return (
    <div>
      {showDeclineForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowDeclineForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to decline?
            </h1>
            <form action="#" className="w-full">
              <div className="flex flex-col mb-2">
                <label htmlFor="reason" className="text-md text-gray-800 pb-2">
                  Reason for declining the invoice:
                </label>
                <textarea
                  type="text"
                  placeholder=""
                  name="reason"
                  className="outline-none text-sm py-2 px-2 border-[2px] border-gray rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="btn mt-4 text-white font-semibold btn-primary bg-darkRed border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-darkRed border-darkRed"
                  onClick={() => setShowDeclineForm(false)}
                >
                  Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary border-[1px] rounded-[8px] py-[2px] px-[6px]  font-medium text-xs ${
          actionPerfomed
            ? 'border-[1px] border-gray-400  text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-darkRed hover:text-white border-darkRed text-darkRed'
        }`}
        onClick={() => setShowDeclineForm(true)}
        disabled={actionPerfomed}
      >
        decline
      </button>
    </div>
  );
}

export function DeclineReceiptButton({ receipt }) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    receipt.status != 'New' ? true : false
  );

  return (
    <div>
      {showDeclineForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowDeclineForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to decline?
            </h1>
            <form action="#" className="w-full">
              <div className="flex flex-col mb-2">
                <label htmlFor="reason" className="text-md text-gray-800 pb-2">
                  Reason for declining the invoice:
                </label>
                <textarea
                  type="text"
                  placeholder=""
                  name="reason"
                  className="outline-none text-sm py-2 px-2 border-[2px] border-gray rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="btn mt-4 text-white font-semibold btn-primary bg-darkRed border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-darkRed border-darkRed"
                  onClick={() => setShowDeclineForm(false)}
                >
                  Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary border-[1px] rounded-[8px] py-[2px] px-[6px]  font-medium text-xs ${
          actionPerfomed
            ? 'border-[1px] border-gray-400  text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-darkRed hover:text-white border-darkRed text-darkRed'
        }`}
        onClick={() => setShowDeclineForm(true)}
        disabled={actionPerfomed}
      >
        decline
      </button>
    </div>
  );
}

export function ViewInvoiceButton({ invoice }) {
  const [viewInvoice, setViewInvoice] = useState(false);
  const headers = ['Date', 'Lunch Attendees', 'Price Per Person', 'Total'];
  const data = [['06.06.2024', '400', '............', '............']];
  const receiptRef = useRef();

  return (
    <div>
      {viewInvoice && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center cursor-pointer">
          <div className="relative bg-white w-[90%] lg:w-[50%] h-[90vh] overflow-y-auto px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setViewInvoice(false)}
            >
              x
            </button>

            <div className="bg-white" ref={receiptRef}>
              {/* invoice headings */}
              <div className="w-full flex items-center gap-8 md:justify-between pt-5">
                <img
                  className="w-[5rem]"
                  src="/Coat_of_arms.png"
                  alt="coat of arms logo"
                />
                <div className="text-right">
                  <p className="mb-4 text-xs">Kigali, {invoice.date}</p>
                  <h1 className="text-3xl">INVOICE</h1>
                  <p className="text-xs">Invoice: #{invoice.id}</p>
                </div>
              </div>

              {/* ministry details */}
              <div className="mt-6">
                <p>MINISTRY OF FINANCE AND ECONOMIC PLANNING</p>
                <p>P.O Box 158 Kigali</p>
                <p>
                  <span>Tel: +250 252575756</span>
                  <span className="ml-4">Fax: +250 252 5777581</span>
                </p>
                <p>
                  Email:
                  <span className="text-mainBlue ml-4 hover:cursor-pointer hover:underline hover:underline-offset-1">
                    mfin@minecofin.gov.rw
                  </span>
                </p>
              </div>

              {/* restaurant details */}
              <div className="mt-8 w-[65%]">
                <img
                  src="/Bourbon_Coffee_Logo.png"
                  alt=""
                  className="w-[6.5rem]"
                />
                <p>Tel: +250 789 777 771</p>
                <p>
                  Email:
                  <span className="text-mainBlue ml-4 hover:cursor-pointer hover:underline hover:underline-offset-1">
                    Bourboncoffee@Restaurant.rw
                  </span>
                </p>
              </div>

              {/* table */}
              <div className="my-6">
                <InvoiceTable
                  headers={headers}
                  data={data}
                  showCheckBox={false}
                  title={''}
                />
              </div>
              {/* signatures */}
              <div className="h-[15vh] w-full">
                <p className="font-semibold text-gray-800">Signatures:</p>
              </div>

              {/* parties involved */}
              <div className="w-full flex items-center justify-between">
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">
                    KIMENYI Emmanuel
                  </p>
                  <p className="text-gray-500 text-xs">
                    Human Resource Department
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">JOHN Doe</p>
                  <p className="text-gray-500 text-xs">Bouborn Coffee CEO</p>
                </div>
              </div>
            </div>

            {/* print button */}
            <ReactToPrint
              trigger={() => {
                return (
                  <div className="mt-[3rem] w-full flex items-center justify-center">
                    <button className="btn btn-primary bg-[#28A4E2] border-2 rounded-md mb-2 py-2 px-4 hover:bg-[#2696CD] hover:border-[#2696CD] border-[#28A4E2] text-white flex items-center gap-2">
                      <IoPrint className="text-xl" />
                      Print / Download
                    </button>
                  </div>
                );
              }}
              content={() => receiptRef.current}
            />
          </div>
        </div>
      )}
      <FaRegEye
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewInvoice(true)}
      />
    </div>
  );
}

export function ViewRestaurantReceiptButton({
  receiptData,
  receiptDate,
  receiptHeaders,
}) {
  const [viewReceipt, setViewReceipt] = useState(false);
  const [receiptAttendees, setReceiptAttendees] = useState([]);
  const receiptRef = useRef();

  const getReceiptsAttendees = async (receiptId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/receipts/getAttendees/by-receiptId/${receiptId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReceiptAttendees(response.data.data);
    } catch (error) {
      console.log(
        'Failed to receipt attendees',
        error.response.data.message || error.message
      );
      // setErrorMessage(error.response.data.message);
      // toast.error('Failed to Fetch Stats' + error.response.data.message, {
      //   position: 'top-right',
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      //   transition: Bounce,
      // });
    }
  };

  // console.log('receiptId: ', receiptData.receiptId)
  getReceiptsAttendees(receiptData.receiptId);

  const receiptAttendeesData = receiptAttendees.map((attendee, index) => [
    ++index,
    attendee.names,
    attendee.department,
    attendee.isScanned,
  ]);
  return (
    <div>
      {viewReceipt && (
        <div>
          <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center cursor-pointer">
            <div className="relative bg-white w-[90%] lg:w-[50%] h-[90vh] overflow-y-auto px-[3.5%] py-[4%] rounded-md">
              <button
                className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                onClick={() => setViewReceipt(false)}
              >
                x
              </button>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 mb-3">
                <h2 className="md:w-1/3 text-lg text-gray-500 font-semibold">
                  <span className="text-sm mr-4">Date: </span>
                  {receiptDate}
                </h2>
                <h2 className="flex items-center text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
                  <span className="text-lg mr-4">Total attendees: </span>
                  {receiptAttendees.length}
                </h2>
              </div>
              <div className="w-full border-2 border-gray-200 rounded-md h-[60vh]">
                <TableComponent
                  headers={receiptHeaders}
                  data={receiptAttendeesData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <FaRegEye
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewReceipt(true)}
      />
    </div>
  );
}

export function ViewRestaurantInvoiceButton({
  invoiceData,
  invoice,
  invoiceHeaders,
}) {
  const [viewInvoice, setViewInvoice] = useState(false);
  const invoiceRef = useRef();

  return (
    <div>
      {viewInvoice && (
        <div>
          <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center cursor-pointer">
            <div className="relative bg-white w-[90%] lg:w-[50%] h-[90vh] overflow-y-auto px-[3.5%] py-[4%] rounded-md">
              <button
                className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                onClick={() => setViewInvoice(false)}
              >
                x
              </button>
              <div className="flex flex-col md:flex-row gap-3 md:items-center mb-2">
                <h2 className="md:w-1/3 text-lg text-gray-500 font-semibold">
                  <span className="text-sm mr-4">Month: </span>
                  {invoice.month}
                </h2>
                <h2 className="flex items-center text-mainGray text-3xl px-4 py-4 font-semibold border-[1px] border-gray-200 w-max">
                  <span className="text-sm mr-4">Total receipts: </span>
                  {invoiceData.length}
                </h2>
                <h2 className="flex items-center text-mainGray text-3xl px-4 py-4 font-semibold border-[1px] border-gray-200 w-max">
                  <span className="text-sm mr-4">Total attendence: </span>
                  7890
                </h2>
              </div>
              <div className="w-full border-2 border-gray-200 rounded-md h-[60vh]">
                <TableComponent
                  headers={invoiceHeaders}
                  data={invoiceData}
                  showFilter={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <FaRegEye
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewInvoice(true)}
      />
    </div>
  );
}

export function ViewReceiptButton({
  receiptDate,
  receiptData,
  receiptAttendeesHeaders,
}) {
  const [viewReceipt, setViewReceipt] = useState(false);

  // const receiptRef = useRef();

  return (
    <div>
      {viewReceipt && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center cursor-pointer">
          <div className="relative bg-white w-[90%] lg:w-[50%] h-[90vh] overflow-y-auto px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setViewReceipt(false)}
            >
              x
            </button>
            <div className="flex items-center mb-3">
              <h2 className="w-1/3 text-lg text-gray-500 font-semibold">
                <span className="text-sm mr-4">Date: </span>
                {receiptDate}
              </h2>
              <h2 className="flex items-center text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
                <span className="text-lg mr-4">Total attendees: </span>
                {receiptData.length}
              </h2>
            </div>
            <div className="w-full border-2 border-gray-200 rounded-md h-[60vh]">
              <TableComponent
                headers={receiptAttendeesHeaders}
                data={receiptData}
              />
            </div>
          </div>
        </div>
      )}
      <FaRegEye
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewReceipt(true)}
      />
    </div>
  );
}

export function GuestButtons({ guest }) {
  return (
    <div className="flex gap-2">
      <UpdateGuestButton guest={guest} />
      <DeleteButton />
      {/* <SendToCBMButton guest={guest} /> */}
    </div>
  );
}

export function RestaurantButtons({ invoice }) {
  return (
    <div className="flex gap-2 px-0">
      {/* <ApproveButton invoice={invoice} />
      <DeclineButton invoice={invoice} /> */}
      <ViewInvoiceButton invoice={invoice} />
    </div>
  );
}

export function RestaurantReceiptButtons({ receipt }) {
  return (
    <div className="flex gap-2 px-0">
      <ViewRestaurantReceiptButton receipt={receipt} />
    </div>
  );
}

export function ReceiptsButtons({
  receiptDate,
  receiptData,
  receiptAttendeesHeaders,
  receipt,
}) {
  return (
    <div className="flex gap-2 px-0">
      {/* <ApproveReceiptButton receipt={receipt} />
      <DeclineReceiptButton receipt={receipt} /> */}
      <ViewReceiptButton
        receiptData={receiptData}
        receiptDate={receiptDate}
        receiptAttendeesHeaders={receiptAttendeesHeaders}
      />
    </div>
  );
}

export function AttendeeButtons({ attendeeDetails, departments, roles }) {
  return (
    <div className="flex gap-2 items-center">
      <UpdateAttendeeButton
        attendeeDetails={attendeeDetails}
        departments={departments}
        roles={roles}
      />
      <DeleteButton />
      <ViewAttendeeButton attendeeDetails={attendeeDetails} />
      <AttendeeQrCodeButton attendeeDetails={attendeeDetails} />
    </div>
  );
}

export function Status({ status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'on leave':
        return 'bg-red-200'; // Red for "on leave"
      case 'active':
        return 'bg-green-200'; // Green for "active"
      default:
        return 'bg-gray-200'; // Gray for other statuses
    }
  };

  const statusStyle = getStatusColor(status);

  return (
    <div>
      <div
        className={`h-[1.3rem] w-[5rem] rounded-md flex items-center ${statusStyle}`}
      >
        <p className="mx-auto text-[0.7rem]">{status}</p>
      </div>
    </div>
  );
}

export function AddAttendeeManually({ emailToAddManually }) {
  const handleAddManually = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/attendance/record/manual/${emailToAddManually}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-primary text-white text-sm float-right bg-[#078ECE] border-2 rounded-md border-[1px] py-2 px-3 hover:bg-white hover:text-[#078ECE] hover:border-[1px] hover:border-[#078ECE]"
      onClick={() => handleAddManually()}
    >
      + Add
    </button>
  );
}

export function ViewNotification() {
  const [ViewNotification, SetViewNotification] = useState(false);

  const RoundedIcon = ({ text, style }) => (
    <div
      className={`${style} text-white rounded-full h-10 w-10 flex items-center justify-center`}
    >
      {text}
    </div>
  );

  const initialNotifications = [
    {
      id: 1,
      icon: <RoundedIcon text="R" style="bg-[#008000]" />,
      text: 'Restaurant manager sent a new invoice',
      time: 'just now',
    },
    {
      id: 2,
      icon: <RoundedIcon text="C" style="bg-[#E79602]" />,
      text: 'CPM acted on your request to approve new guests',
      time: '1 week ago',
    },
    {
      id: 3,
      icon: <RoundedIcon text="R" style="bg-[#008000]" />,
      text: 'Restaurant manager sent a new invoice',
      time: '07/06/24',
    },
    {
      id: 4,
      icon: <RoundedIcon text="R" style="bg-[#008000]" />,
      text: 'Restaurant manager sent a new invoice',
      time: '07/06/24',
    },
    {
      id: 5,
      icon: <RoundedIcon text="C" style="bg-[#E79602]" />,
      text: 'CPM acted on your request to approve new guests',
      time: '1 week ago',
    },
    {
      id: 6,
      icon: <RoundedIcon text="R" style="bg-[#008000]" />,
      text: 'Restaurant manager sent a new invoice',
      time: '07/06/24',
    },
    {
      id: 7,
      icon: <RoundedIcon text="R" style="bg-[#008000]" />,
      text: 'Restaurant manager sent a new invoice',
      time: '07/06/24',
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [visibleNotifications, setVisibleNotifications] = useState(4);
  const handleNotificationClose = (id) => {
    const newNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(newNotifications);
    setVisibleNotifications(
      newNotifications.length < 4
        ? newNotifications.length
        : visibleNotifications
    );
  };

  const handleViewMore = () => {
    setVisibleNotifications(notifications.length);
  };

  const handleViewLess = () => {
    setVisibleNotifications(4);
  };

  //notification card
  const NotificationCard = ({ icon, text, time, onClose }) => (
    <div className="relative flex items-start p-2 mb-4 shadow-lg rounded-lg bg-white  bg-opacity-20">
      <div className="mr-4">{icon}</div>
      <div className="flex-1">
        <p className="text-sm w-[85%] text-gray-700">{text}</p>
        <p className="text-xs text-gray-500 mt-1 float-right">{time}</p>
      </div>
      <button
        className="absolute top-2 right-2 text-[#D9E1EF] bg-[#626262] hover:bg-darkRed hover:text-white"
        onClick={onClose}
      >
        <FaTimes size={12} />
      </button>
    </div>
  );

  return (
    <div>
      {ViewNotification && (
        <div className="absolute lg:w-[27%] md:w-[42%] sm:w-[52%] w-[80%]  h-max bg-white z-40 border-2 shadow-md top-[4.5rem] right-10">
          <div className="p-3">
            <h1 className="font-bold text-mainBlue">Notifications</h1>
          </div>
          <button
            className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-2 top-2"
            onClick={() => SetViewNotification(false)}
          >
            x
          </button>

          <div className=" mx-auto">
            {notifications.length > 0 && (
              <div className="w-full lg:w-full mx-auto md:px-4 md:block z-40">
                <div className=" rounded w-full h-full max-h-[60vh] lg:max-h-[55vh] overflow-y-auto">
                  {notifications
                    .slice(0, visibleNotifications)
                    .map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        icon={notification.icon}
                        text={notification.text}
                        time={notification.time}
                        onClose={() => handleNotificationClose(notification.id)}
                      />
                    ))}
                  {notifications.length > 4 &&
                    visibleNotifications < notifications.length && (
                      <p
                        className="float-right text-[#4069B0] cursor-pointer text-sm hover:underline"
                        onClick={handleViewMore}
                      >
                        view more
                      </p>
                    )}
                  {notifications.length > 4 && visibleNotifications > 4 && (
                    <p
                      className="float-left text-[#4069B0] cursor-pointer text-sm hover:underline"
                      onClick={handleViewLess}
                    >
                      view less
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          SetViewNotification(true);
        }}
      >
        <FaBell className="text-black mr-3 text-2xl" />
      </button>
    </div>
  );
}
