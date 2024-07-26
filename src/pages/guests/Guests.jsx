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
import Papa from 'papaparse';

function Guests(props) {
  const [showForm, setShowForm] = useState(false);
  const [sendGuestsToCBM, setSendGuestsToCBM] = useState(false);
  const [uploadFormat, setUploadFormat] = useState('form');
  const [sendToCBM, setSendToCBM] = useState('no');
  const [csvData, setCsvData] = useState([]);
  const [allGuests, setallGuests] = useState(
    JSON.parse(sessionStorage.getItem('allGuests')) || []
  );
  const token = sessionStorage.getItem('token');
  const roles = JSON.parse(sessionStorage.getItem('roles'));
  const departments = JSON.parse(sessionStorage.getItem('departments'));

  // console.log('all guests: ', allGuests)

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
    .filter((guest) => guest.status === 'new')
    .map((guest) => [guest.id, guest.name, guest.purpose]);

  const handleSubmitCreateGuest = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // console.log('creating a guest')
    try {
      // Gather form data
      const formData = new FormData(event.target);
      const names = formData.get('name');
      const purpose = formData.get('purpose');
      const email = formData.get('email');
      const startingDate = formData.get('startingDate');
      const endDate = formData.get('endDate');

      // Determine attendanceStatus based on sendToCBM
      const attendanceStatus = sendToCBM === 'yes' ? 'new' : 'approved';

      // Prepare data for API call
      const guestData = {
        names,
        email,
        purpose,
        startingDate,
        endDate,
        attendanceStatus,
      };

      // console.log('guestData: ', guestData);

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
      // console.log('Guest created:', response.data);
      toast.success(response.message || 'Guest added successfully', {
        position: 'top-right',
        autoClose: 2000,
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
        autoClose: 2000,
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

  const handleCreateGuestsFromBatch = async () => {
    console.log('Csv Data: ', csvData);

    const batchData = csvData
      .filter((data) => data.names != null && data.email != null)
      .map((filteredData) => {
        const department = departments.filter(
          (dept) => dept.department === filteredData.department
        )[0];
        const role = roles.filter((role) => role.role === filteredData.role)[0];

        return {
          names: String(filteredData.names),
          email: String(filteredData.email),
          nationalId: String(filteredData.nationalId),
          departmentId: department ? String(department.id) : null,
          roleId: role ? String(role.id) : null,
          password: String(filteredData.password) || null,
        };
      });

    console.log('batch data: ', batchData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/register-batch`,
        { users: batchData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Response: ', response);
      toast.success(response.message || 'Batch added successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      console.error('Error creating batch:', error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        }
      );
    }
  };

  const handleReadFromCsv = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
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
            <h1 className="text-mainBlue font-semibold text-xl">
              Add New Guest
            </h1>

            {/* choosing upload format */}
            <div className="w-full flex items-center justify-center border-b-2 border-b-gray my-5 md:my-2">
              <button
                className={`w-1/2 py-2 ${
                  uploadFormat === 'form' ? 'text-white bg-mainBlue' : ''
                }`}
                onClick={() => setUploadFormat('form')}
              >
                Form
              </button>
              <button
                className={`w-1/2 py-2 ${
                  uploadFormat === 'file' ? 'text-white bg-mainBlue' : ''
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
                      id="startingDate"
                      placeholder="Arrival"
                      name="startingDate"
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
                        defaultChecked
                        onChange={(e) => setSendToCBM(e.target.value)}
                      ></input>
                      No
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="btn border-2 border-mainBlue bg-mainBlue font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3"
                >
                  Create Guest
                </button>
              </form>
            )}

            {/* upload from csv file  */}
            {uploadFormat === 'file' && (
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    type="file"
                    accept=".csv"
                    className="py-4"
                    onChange={handleReadFromCsv}
                  />
                  <a
                    href="https://docs.google.com/spreadsheets/d/1h4FuZrxelBbpRAPgv9i3uIpMJDKfoOc0xc1-Hzl0kyo/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 btn btn-primary text-center text-white float-right bg-mainBlue border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]"
                  >
                    Get Template
                  </a>
                </div>
                <button
                  className="btn border-2 border-{#078ECE} bg-mainBlue font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3"
                  onClick={handleCreateGuestsFromBatch}
                >
                  Upload CSV File
                </button>
                {/* {csvData && <p>{csvData}</p>} */}
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
