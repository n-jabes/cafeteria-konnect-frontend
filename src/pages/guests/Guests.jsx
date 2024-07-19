import React, { useState } from 'react';
import TableComponent from './../../components/table/TableComponent';
import {
  GuestButtons,
  MainButton,
  SendAllNewGuestsToCBMButton,
} from '../../components/buttons/Buttons';
import EmailTemplate from '../../components/email/EmailTemplate';
import Toast from '../../components/toast/Toast';
import { Bounce, toast } from 'react-toastify';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';

function Guests(props) {
  const [showForm, setShowForm] = useState(false);
  const [sendGuestsToCBM, setSendGuestsToCBM] = useState(false);
  const [uploadFormat, setUploadFormat] = useState('form');
  const [sendToCBM, setSendToCBM] = useState('no');
  const token = sessionStorage.getItem('token');

  const allGuests = [
    {
      id: 1,
      name: 'John Doe',
      purpose: 'intern',
      status: 'Pending',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      purpose: 'Consultant',
      status: 'Approved',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      purpose: 'intern',
      status: 'New',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 4,
      name: 'Imanzi Kenny',
      purpose: 'Consultant',
      status: 'New',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 1,
      name: 'John Doe',
      purpose: 'intern',
      status: 'Pending',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      purpose: 'Consultant',
      status: 'Approved',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      purpose: 'intern',
      status: 'Declined',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 4,
      name: 'Bizy Henriette',
      purpose: 'Consultant',
      status: 'New',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 1,
      name: 'John Doe',
      purpose: 'intern',
      status: 'Pending',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      purpose: 'Consultant',
      status: 'Approved',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      purpose: 'intern',
      status: 'Declined',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 4,
      name: 'Nshuti Ruranga Jabes',
      purpose: 'Consultant',
      status: 'New',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 1,
      name: 'John Doe',
      purpose: 'intern',
      status: 'Pending',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      purpose: 'Consultant',
      status: 'Approved',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      purpose: 'intern',
      status: 'Declined',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
    {
      id: 4,
      name: 'Nshuti Ruranga Jabes',
      purpose: 'Consultant',
      status: 'New',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    },
  ];

  const guestHeaders = ['Id', 'Name', 'Purpose', 'Status', 'Actions'];
  const guestData = allGuests.map((guest) => [
    guest.id,
    guest.name,
    guest.purpose,
    guest.status,
    <GuestButtons guest={guest} />,
  ]);

  // filter the all guests array to find the newly created guests and send them to the CBM
  const sendToCBMHeaders = ['Id', 'Name', 'Purpose'];
  const sendToCBMData = allGuests
    .filter((guest) => guest.status === 'New')
    .map((guest) => [guest.id, guest.name, guest.purpose]);

  const handleSubmitCreateGuest = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Gather form data
      const formData = new FormData(event.target);
      const names = formData.get('name');
      const purpose = formData.get('purpose');
      const email = formData.get('email');
      const startingDate = formData.get('startDate');
      const endDate = formData.get('endDate');

      // Determine attendanceStatus based on sendToCBM
      const attendanceStatus = sendToCBM === 'yes' ? 'New' : 'Approved';

      console.log('sendToCbm: ', sendToCBM);
      console.log('status: ', attendanceStatus);

      // Prepare data for API call
      const guestData = {
        names,
        email,
        purpose,
        startingDate,
        endDate,
        attendanceStatus,
      };

      // console.log('guestData: ', guestData)

      // Make API call
      const response = await axios.post(
        `${API_BASE_URL}/users/addGuest`,
        guestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('Guest created:', response.data);
      toast.success(response.message || 'Guest added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });

      // Optionally, reset the form or update your guest list
      // event.target.reset();
    } catch (error) {
      console.error('Error creating guest:', error);
      toast.error(error.response?.data?.message || error.message, {
        position: 'top-right',
        autoClose: 3000,
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

  return (
    <div className="">
      <Toast />
      {sendGuestsToCBM && (
        <div className=" fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className=" relative bg-white w-[90%] lg:w-[55%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setSendGuestsToCBM(false)}
            >
              x
            </button>
            {/* <h1 className="text-mainBlue font-semibold text-xl">
              Send All Guests To CBM
            </h1>
            <p className="text-sm text-mainGray">
              Role: <span className="text-mainBlue">Guest</span>
            </p>
            <div className="h-[75vh] md:h-[60vh] mt-2 flex flex-col-reverse md:flex-row md:items-center md:justify-center">
              <div className="overflow-x-auto w-full md:w-8/12  md:h-[100%] border border-3 border-gray my-2 rounded-md pt-2 pl-2">
                <TableComponent
                  title=""
                  headers={sendToCBMHeaders}
                  data={sendToCBMData}
                  showCheckBox={false}
                />
              </div>
              <div className="w-full md:w-4/12 md:h-[60vh] md:pl-4 ">
                <div className="w-full flex md:flex-col items-center gap-2 justify-between text-center md:h-full ">
                  <div className="border border-3 w-full border-gray p-4 rounded-md text-sm">
                    <p>TOTAL NUMBER OF ALL NEW GUESTS</p>
                    <p className="mt-4 flex flex-col items-center">
                      <span className="font-bold text-4xl md:text-8xl text-gray-400 flex flex-col md:flex-row">
                        16
                      </span>
                      Guests
                    </p>
                  </div>
                  <button className="my-4 w-full h-full md:h-max text-white bg-mainGreen border-2 border-mainGreen rounded-md py-2 hover:bg-white hover:text-mainGreen">
                    Send All Guest To CBM
                  </button>
                </div>
              </div>
            </div> */}

            <EmailTemplate headers={sendToCBMHeaders} guests={sendToCBMData} />
          </div>
        </div>
      )}

      {showForm && (
        <div className=" fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className=" relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowForm(false)}
            >
              x
            </button>
            <h1 className="text-[#078ECE] font-semibold text-xl">
              Add New Guest
            </h1>

            {/* choosing upload format */}
            <div className="w-full flex items-center justify-center border-b-2 border-b-gray my-5 md:my-2">
              <button
                className={`w-1/2 py-2 ${
                  uploadFormat === 'form' ? 'text-white bg-[#078ECE]' : ''
                }`}
                onClick={() => setUploadFormat('form')}
              >
                Form
              </button>
              <button
                className={`w-1/2 py-2 ${
                  uploadFormat === 'file' ? 'text-white bg-[#078ECE]' : ''
                }`}
                onClick={() => setUploadFormat('file')}
              >
                Upload From File
              </button>
            </div>

            {/* upload from form inputs  */}
            {uploadFormat === 'form' && (
              <form
                action="#"
                className="w-full"
                onSubmit={handleSubmitCreateGuest}
              >
                <div className="flex flex-col mb-2">
                  <label htmlFor="name" className="text-xs text-gray">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter guest full name"
                    name="name"
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col mb-2">
                  <label htmlFor="email" className="text-xs text-gray">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="guest@gmail.com"
                    name="email"
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
                    id="purpose"
                    placeholder="Enter guest purpose: e.g. consultant"
                    name="purpose"
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
                      id="startDate"
                      placeholder="Arrival"
                      name="startDate"
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
                      id="endDate"
                      placeholder="Departure"
                      name="endDate"
                      className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                      required
                    />
                  </div>
                </div>

                <fieldset className="my-2">
                  <legend className="text-xs text-gray">
                    Will send to CBM?
                  </legend>
                  <div className="flex gap-8 border-[1px] border-gray-300 w-max py-2 px-4 rounded-md">
                    <label>
                      <input
                        type="radio"
                        name="sendToCBM"
                        value="yes"
                        onChange={(e) => setSendToCBM(e.target.value)}
                      ></input>
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sendToCBM"
                        value="no"
                        onChange={(e) => setSendToCBM(e.target.value)}
                      ></input>
                      No
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="btn border-2 border-[#078ECE] bg-[#078ECE] font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-[#078ECE] mt-3"
                >
                  Create Guest
                </button>
              </form>
            )}

            {/* upload from csv file  */}
            {uploadFormat === 'file' && (
              <div>
                <input type="file" accept=".csv" className="py-4" />
                <button className="btn border-2 border-{#078ECE} bg-[#078ECE] font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-[#078ECE] mt-3">
                  Upload CSV File
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="md:flex md:align-center md:justify-between text-white font-medium mb-3">
        <div className="w-max" onClick={() => setSendGuestsToCBM(true)}>
          <SendAllNewGuestsToCBMButton />
        </div>
        <div className="w-max" onClick={() => setShowForm(true)}>
          <MainButton text={'+ Add Guest(s)'} />
        </div>
      </div>
      <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
        <TableComponent
          headers={guestHeaders}
          data={guestData}
          title="Guests"
          showCheckBox={true}
        />
      </div>
    </div>
  );
}

export default Guests;
