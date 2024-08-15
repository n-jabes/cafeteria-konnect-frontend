import React, { useEffect, useState } from 'react';
import TableComponent from './../../components/table/TableComponent';
import {
  GuestButtons,
  MainButton,
  SendAllNewGuestsToCBMButton,
} from '../../components/buttons/Buttons';
import EmailTemplate from '../../components/email/EmailTemplate';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';
import Papa from 'papaparse';
import { firestoreDB } from '../../utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Bounce, toast } from 'react-toastify';
import Toast from '../../components/toast/Toast';

function Guests(props) {
  const [showForm, setShowForm] = useState(false);
  const [creatingGuest, setCreatingGuest] = useState(false);
  const [creatingGuests, setCreatingGuests] = useState(false);
  const [sendGuestsToCBM, setSendGuestsToCBM] = useState(false);
  const [uploadFormat, setUploadFormat] = useState('form');
  const [sendToCBM, setSendToCBM] = useState('no');
  const [csvData, setCsvData] = useState([]);
  const [allAttendeesErrorMessage, setAllAttendeesErrorMessage] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem('token');
  // const roles = JSON.parse(sessionStorage.getItem('roles'));
  // const departments = JSON.parse(sessionStorage.getItem('departments'));
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Format the date as yyyy-mm-dd
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Set the default value
    setDefaultDate(formattedDate);
  }, []);

  //fetching all attendees
  const getAllAttendees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //filter users with the role of guest and store them in the sessionStorage
      //in order to display them on the guests page
      const guests = response.data.data
        .filter((attendee) => attendee.role?.role === 'GUEST')
        .map((guest, index) => ({
          id: index + 1,
          userId: guest.id || '',
          name: guest.names || '',
          email: guest.email || '',
          roleId: guest.role?.id || '',
          roleName: guest.role?.role || '',
          departmentId: guest.department?.id || '',
          departmentName: guest.department?.department || '',
          status: guest.attendanceStatus || '',
          nationalId: guest.nationalId || '',
          purpose: guest?.purpose || '',
          startingDate: guest?.startingDate || '',
          endDate: guest?.endDate || '',
          onLeaveEndDate: guest?.onLeaveEndDate || '',
          onLeaveStartDate: guest?.onLeaveStartDate || '',
        }));

      setAllGuests(guests);
      // console.log('all guests: ', guests)
    } catch (error) {
      console.log(
        'Failed to fetch all people',
        error.response?.data?.message || error.message
      );
      setAllAttendeesErrorMessage(
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

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
  const sendToCBMData = allGuests.filter((guest) => guest.status === 'new');

  // console.log('new guests: ', sendToCBMData)

  const handleSubmitCreateGuest = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setCreatingGuest(true);

    // console.log('creating a guest')
    try {
      // Gather form data
      const formData = new FormData(event.target);
      const names = formData.get('name');
      const purpose = formData.get('purpose');
      const email = formData.get('email');
      const startingDate = formData.get('startingDate');
      const endDate = formData.get('endDate');


      // Check if endDate is greater than startingDate
      if (new Date(startingDate) >= new Date(endDate)) {
        toast.error('End date must be greater than the starting date.', {
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
        setCreatingGuest(false);
        return;
      }

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

      console.log('guestData: ', guestData);

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
      toast.success(response?.data?.message || 'Guest added successfully', {
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
      toast.error(error?.response?.data?.message || error?.message, {
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
    } finally {
      setCreatingGuest(false);
    }
  };

  const handleCreateGuestsFromBatch = async () => {
    setCreatingGuests(true);
    // console.log('roles:', roles);
    // console.log('departments:', departments);
    // console.log('Csv Data: ', csvData);

    const batchData = csvData
      .filter((data) => data.names != null && data.email != null)
      .map((filteredData) => {
        const department = departments.filter(
          (dept) => dept.department === filteredData.department
        )[0];
        const role = roles.filter((role) => role.role === filteredData.role)[0];

        // const attendanceStatus = filteredData.sendToCBM === 'Yes' ? 'new' : 'approved';

        console.log('sendToCBM', filteredData.sendToCBM);

        return {
          names: String(filteredData.names),
          email: String(filteredData.email),
          nationalId: String(filteredData.nationalId),
          departmentId: department ? String(department.id) : null,
          roleId: role ? String(role.id) : null,
          password: String(filteredData.password) || null,
          purpose: String(filteredData.purpose),
          attendanceStatus: String(
            filteredData.sendToCBM === 'Yes' ? 'new' : 'approved'
          ),
        };
      });

    console.log('batch data: ', batchData);

    if (batchData.length <= 0) {
      console.log('file is empty');
      toast.error('Empty File', {
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

      setCreatingGuests(false);
    } else {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/register-batch`,
          { users: batchData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Response: ', response);
        toast.success(response?.data?.message || 'Batch added successfully', {
          position: 'top-center',
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
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message,
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
      } finally {
        setCreatingGuests(false);
      }
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

  // Fetch the roles and departments when the component mounts
  useEffect(() => {
    getAllDepartments();
    getAllRoles();
  }, []);
  useEffect(() => {
    getAllAttendees(); // Initial data load from API

    // Create a reference to the 'users' collection
    const usersCollectionRef = collection(firestoreDB, 'users');

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        // When Firestore updates, trigger a refresh from the API
        getAllAttendees();
      },
      (error) => {
        console.error('Error listening to Firestore: ', error);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      {sendGuestsToCBM && (
        <div className=" fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <Toast />
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
          <Toast />
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
                      defaultValue={defaultDate}
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
                  className={`btn border-2 font-semibold text-white py-2 px-4 rounded-md w-full  mt-3 ${
                    creatingGuest
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'cursor-pointer border-mainBlue bg-mainBlue hover:bg-white hover:text-mainBlue'
                  }`}
                  disabled={creatingGuest}
                >
                  {creatingGuest ? 'Creating...' : 'Create Guest'}
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
                    required
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
                  type="submit"
                  className={`btn border-2 font-semibold text-white py-2 px-4 rounded-md w-full  mt-3 ${
                    creatingGuests
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'cursor-pointer border-mainBlue bg-mainBlue hover:bg-white hover:text-mainBlue'
                  }`}
                  disabled={creatingGuests}
                  onClick={handleCreateGuestsFromBatch}
                >
                  {creatingGuests ? 'Loading...' : 'Upload CSV File'}
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

      {isLoading ? (
        <div className="md:w-4/5 w-full overflow-x-auto h-[40vh] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-mainBlue"></div>
          <p className="mt-4 text-sm font-light text-gray-400">
            Hang tight, we're almost done ...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
          <TableComponent
            headers={guestHeaders}
            data={guestData}
            title="Guests"
            showCheckBox={true}
          />
        </div>
      )}
    </div>
  );
}

export default Guests;
