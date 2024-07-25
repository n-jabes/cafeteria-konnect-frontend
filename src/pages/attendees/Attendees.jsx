import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  AttendeeButtons,
  ReceiptsButtons,
  RestaurantButtons,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';
import { MainButton } from '../../components/buttons/Buttons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Status } from '../../components/buttons/Buttons';
import * as Yup from 'yup';
import { CgDanger } from 'react-icons/cg';
import { API_BASE_URL } from './../../utils/api';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Toast from '../../components/toast/Toast';
import { Bounce, toast } from 'react-toastify';
import { MdDangerous } from 'react-icons/md';
import { ref, onValue } from 'firebase/database';
import { database, firestoreDB } from '../../utils/firebase';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

const validationSchema = Yup.object().shape({
  names: Yup.string()
    .min(2, 'First name and last name must be both more than two characters')
    .required('Names are required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

function Attendees() {
  const [addNewAttendee, setaddNewAttendee] = useState(false);
  const headers = ['Id', 'Name', 'Role', 'Status', 'Actions'];
  const [tab, setTab] = useState('active attendees');
  const [extraPeople, setExtraPeople] = useState(
    parseInt(localStorage.getItem('extraPeople'), 10) || 5
  );
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [allAttendees, setAllAttendees] = useState([]);
  const [activeAttendees, setActiveAttendees] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [creatingAttendee, setCreatingAttendee] = useState(false);
  const [allReceipts, setAllReceipts] = useState([]);
  const [allAttendeesErrorMessage, setAllAttendeesErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { role } = useAuth();
  const token = sessionStorage.getItem('token');

  const options = [
    { role: 'Intern', label: 'Intern' },
    { role: 'Consultant', label: 'consultant' },
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
      sessionStorage.setItem('departments', JSON.stringify(departments));
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
      sessionStorage.setItem('roles', JSON.stringify(roles));
    } catch (error) {
      console.log(
        'Failed to fetch roles',
        error.response?.data?.message || error.message
      );
    }
  };

  //fetching all estimated attendees
  const getEstimatedAttendees = async () => {
    try {
      // setEstimatedAttendees(extraPeople);
      const response = await axios.get(
        `${API_BASE_URL}/users/estimatedAttendees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(
      //   'estimated attendees: ',
      //   response.data.data.estimatedAttendeesCount
      // );

      setTotalEstimatedAttendees(response.data.data.estimatedAttendeesCount);
    } catch (error) {
      console.log(
        'Failed to fetch roles',
        error.response?.data?.message || error.message
      );
    }
  };

  //setting the number all estimated attendees
  const setEstimatedAttendees = async (extraPeople) => {
    // console.log('extra people: ', extraPeople);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/estimatedAttendeesCount`,
        { additionalAttendees: extraPeople },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setTotalEstimatedAttendees(activeAttendeesData.length + extraPeople);
      toast.success(response?.data?.message || 'Updated successfully!', {
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
      console.log(
        'Failed to set estimated attendees',
        error.response?.data?.message || error.message
      );
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

  //fetching all attendees
  const getAllAttendees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('Response data:', response.data.data);

      const allUsers = response.data.data.map((attendee, index) => ({
        id: index + 1,
        userId: attendee.id || '',
        name: attendee.names || '',
        email: attendee.email || '',
        roleId: attendee.role?.id || '',
        roleName: attendee.role?.role || '',
        departmentId: attendee.department?.id || '',
        departmentName: attendee.department?.department || '',
        status: attendee.attendanceStatus || '',
        nationalId: attendee.nationalId || '',
      }));

      // console.log('Processed users:', allUsers);
      setAllAttendees(allUsers);
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

  const attendeesData = allAttendees.map((attendeeDetails) => [
    attendeeDetails.id,
    attendeeDetails.name,
    attendeeDetails.roleName,
    attendeeDetails.status,
    <AttendeeButtons
      attendeeDetails={attendeeDetails}
      departments={departments}
      roles={roles}
    />,
  ]);

  const activeAttendeesData = allAttendees
    .filter(
      (attendee) =>
        (attendee.status === 'active' || attendee.status === 'approved') &&
        attendee.roleName != 'RESTAURANT'
    )
    .map((attendeeDetails, index) => [
      ++index,
      attendeeDetails.name,
      attendeeDetails.roleName,
      attendeeDetails.status,
      <AttendeeButtons attendeeDetails={attendeeDetails} />,
    ]);

  const getAllReceipts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/receipts/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllReceipts(response.data.data);
    } catch (error) {
      console.log('Failed to fetch stats', error.response || error.message);
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

  const [totalEstimatedAttendees, setTotalEstimatedAttendees] = useState(
    activeAttendeesData?.length || 0
  );
  // console.log('totalEstimatedAttendees: ', totalEstimatedAttendees);

  // Fetch the receipts
  useEffect(() => {
    getAllReceipts();

    // Create a reference to the 'receipts' collection
    const usersCollectionRef = collection(firestoreDB, 'receipts');

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        // When Firestore updates, trigger a refresh from the API
        getAllReceipts();
      },
      (error) => {
        console.error('Error listening to Firestore: ', error);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const receiptAttendeesHeaders = ['id', 'Names', 'Department', 'Scanned'];

  const receiptHeaders = ['Receipt Id', 'Date', 'Clients', 'Actions'];

  const receiptsToDisplay = allReceipts.map((receipt) => [
    receipt.receiptId,
    receipt.createdAt,
    receipt.numberOfAttendees,
    <ViewRestaurantReceiptButton
      receipt={receipt}
      receiptHeaders={receiptAttendeesHeaders}
      receiptData={receipt}
      receiptDate={receipt.createdAt}
    />,
  ]);

  //attendance report data to be displayed
  const handleExpectedAttendees = (e) => {
    e.preventDefault();
    const newExtraPeople = isNaN(extraPeople) ? 0 : parseInt(extraPeople, 10);
    setExtraPeople(newExtraPeople);
    localStorage.setItem('extraPeople', newExtraPeople.toString());
    setEstimatedAttendees(newExtraPeople);
  };

  // input for setting estimated people
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    // Remove any leading zero when user starts typing a new number
    const parsedValue = value.replace(/^0+/, '');
    if (parsedValue === '') {
      setExtraPeople(0);
    }
    setExtraPeople(parseInt(parsedValue, 10));
  };

  // Fetch the roles and departments when the component mounts
  useEffect(() => {
    if (role === 'HR') {
      getAllRoles();
      getAllDepartments();
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
    }
  }, []);

  // Get realtime data for estimated attendees
  useEffect(() => {
    const savedExtraPeople = localStorage.getItem('extraPeople');

    if (savedExtraPeople !== null) {
      setExtraPeople(parseInt(savedExtraPeople, 10));
      setEstimatedAttendees(activeAttendees + extraPeople);
    }
    getEstimatedAttendees();
    // Firebase Realtime Database listener
    const estimatedAttendanceRef = ref(database, 'EstimatedAttendees');
    const unsubscribe = onValue(estimatedAttendanceRef, (snapshot) => {
      getEstimatedAttendees(); // Fetch updated data from your API
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const initialValues = {
    names: '',
    role: '',
    department: '',
    NID: '',
    email: '',
    phoneNumber: '',
  };

  // Function to create a new attendee
  const handleCreateAttendee = async (values, { resetForm }) => {
    // Concatenate first name and last name
    const fullName = values.names;

    // Find the role ID and department ID based on the selected role and department names
    const selectedRole = roles.filter((role) => role.role === values.role)[0];
    const selectedDepartment = departments.filter(
      (dept) => dept.department === values.department
    )[0];

    // Convert IDs to strings if they are not already strings
    const roleId = selectedRole ? String(selectedRole.id) : null;
    const departmentId = selectedDepartment
      ? String(selectedDepartment.id)
      : null;

    // Create the attendee object
    const attendeeData = {
      names: fullName,
      email: values.email,
      nationalId: values.NID.toString(),
      roleId: roleId,
      departmentId: departmentId,
      password: '123456',
    };

    console.log('attendeeData: ', attendeeData);
    setCreatingAttendee(true);
    try {
      // Send the POST request to the API endpoint
      const response = await axios.post(
        `${API_BASE_URL}/users/register`,
        attendeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resetForm();
      toast.success('Attendee created successfully', {
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
      setCreatingAttendee(false);
    } catch (error) {
      console.log(
        'Failed to create attendee',
        error.response?.data?.message || error.message
      );
      setErrorMessage(error.response?.data?.message || error.message);
      toast.error('Failed to create attendee', {
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

  const handleSubmit = (values, { resetForm }) => {
    handleCreateAttendee(values, { resetForm });
    setErrorMessage('');
  };

  //fetching attendance by data
  const getAttendanceByDate = async () => {
    const date = Date.now();
    console.log('date: ', date);
    const [year, month, day] = date.split('-');
    const formattedDate = `${month}-${day}-${year}`;

    try {
      const attendanceList = await axios.get(
        `${API_BASE_URL}/attendance/stats/specific-date/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodayAttendance(attendanceList.data.data.attendees.length);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {/* tabs component */}
      <div className="flex flex-col md:flex-row w-full md:justify-between mb-2 border-b-[1px] border-b-gray-200">
        {addNewAttendee && (
          <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
            <div className="relative bg-white w-[90%] md:w-[50%]  lg:w-[38%] sm:w-[70%] lg:h-[32.5rem] sm:h-[36rem] md:h-[32rem] h-[38rem] px-[3.5%] py-[1.7%] rounded-md overflow-y-auto">
              <div className="w-[90%] mx-auto flex flex-col gap-[4rem] h-full">
                <button
                  className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                  onClick={() => setaddNewAttendee(false)}
                >
                  x
                </button>
                <h1 className="w-[70%] sm:h-[2rem] h-max capitalize text-[#078ECE] font-semibold text-xl mb-4">
                  Add New attendee
                </h1>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="flex flex-col w-full lg:h-[17rem] h-[26rem] md:h-[20rem] justify-center gap-[0.4rem]  ">
                    <div className=" flex flex-col gap-2">
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
                          placeholder="Full names"
                          className="w-full text-xs border focus:border-gray-300 focus:outline-none  px-2 py-3 "
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
                          <option value="">Select</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.role}>
                              {role.role}
                            </option>
                          ))}
                        </Field>
                      </div>
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
                          <option value="">Select</option>
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
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="NID"
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

                    {errorMessage && (
                      <p className="w-[80%] text-sm text-red-500 font-semibold">
                        {errorMessage}
                      </p>
                    )}
                    <button
                      type="submit"
                      className={`w-full px-2 text-sm py-3 my-3 cursor-pointer text-white font-semibold bg-[#078ECE]`}
                    >
                      submit
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        )}

        {allAttendeesErrorMessage && (
          <div className="error text-red-500 mt-2 relative border-[1px] min-h-[10vh] h-max p-2 flex flex-col md:flex-row gap-2 items-start md:items-center">
            <button
              className="close border-[1px] border-mainRed rounded-md px-2 text-mainRed absolute right-2 top-2 text-sm"
              onClick={() => setAllAttendeesErrorMessage()}
            >
              x
            </button>
            <MdDangerous className="text-6xl" />
            <p className="w-[80%] text-sm">{allAttendeesErrorMessage}</p>
          </div>
        )}
        {/* tabs */}
        <div className="h-full md:flex md:align-center md:justify-between w-full md:w-max">
          <button
            className={`h-[%100] py-3 px-4 border-b-4 mr-8 hover:border-b-[#078ECE] hover:text-[#078ECE] ${
              tab === 'active attendees'
                ? 'border-b-mainBlue border-b-[#078ECE] text-[#078ECE]'
                : 'text-mainGray'
            }`}
            onClick={() => setTab('active attendees')}
          >
            Active attendees
          </button>

          <button
            className={`h-[%100] py-3 px-4 border-b-[3px] mr-8 hover:border-b-[#078ECE] hover:text-[#078ECE] ${
              tab === 'all attendees'
                ? 'border-b-mainBlue border-b-[#078ECE] text-[#078ECE]'
                : 'text-mainGray'
            }`}
            onClick={() => setTab('all attendees')}
          >
            All attendees
          </button>

          <button
            className={`h-[%100] py-3 px-4 border-b-4 hover:border-b-[#078ECE] hover:text-[#078ECE] ${
              tab === 'attendence'
                ? 'border-b-mainBlue border-b-[#078ECE] text-[#078ECE]'
                : 'text-mainGray'
            }`}
            onClick={() => setTab('attendence')}
          >
            Attendence
          </button>
        </div>

        <div
          className="w-max mt-4 md:mt-[0px]"
          onClick={() => setaddNewAttendee(true)}
        >
          <div>
            <MainButton text={'+ Add Attendee(s)'} />
          </div>
        </div>
      </div>

      {/* active attendees tab */}
      {tab === 'active attendees' && (
        <div>
          {/* showing expected attendees */}
          <div className="flex flex-col items-center">
            <div className="w-full md:w-max md:flex flex-col gap-4 md:flex-row items-center justify-evenly my-4">
              <div className="flex flex-row items-center justify-evenly gap-2 md:gap-10">
                <div className="font-bold text-3xl text-mainGray">
                  {activeAttendeesData.length}
                </div>
                <p>+</p>
                <form className="flex" onSubmit={handleExpectedAttendees}>
                  <input
                    type="number"
                    placeholder="extra people"
                    value={extraPeople}
                    max={15}
                    min={0}
                    className="border-[1px] border-gray-200 px-4 py-2 outline-none rounded-sm text-mainGray font-semibold mr-2"
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-sm bg-mainBlue text-white text-xs"
                  >
                    Confirm
                  </button>
                </form>
                <p>=</p>
              </div>

              <div className="flex items-center md:flex-row flex-row-reverse md:mt-0 mt-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full mx-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mainBlue"></div>
                  </div>
                ) : (
                  <div className="font-bold text-3xl text-mainGray bg-green-200 h-max py-[2px] px-[8px] sm:py-2 sm:px-4 rounded-sm ml-6 mr-4">
                    {totalEstimatedAttendees}
                  </div>
                )}

                <p className="font-light text-xs text-[#078ECE] w-full md:w-[200px] flex mt-2 mb:mt-[0px] gap-2 items-center">
                  <CgDanger className="text-2xl md:text-6xl" />
                  This is the expected number of attendees the restaurant
                  manager will see!
                </p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[40vh] mt-[7.5vh]">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-mainBlue"></div>
              <p className="mt-4 text-sm font-light text-gray-400">
                Hang tight, we're almost done ...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto relative h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
              <TableComponent
                headers={headers}
                data={activeAttendeesData}
                title=""
                showCheckBox={false}
                showFilter={true}
              />
            </div>
          )}
        </div>
      )}

      {/* all attendees tab */}
      {tab === 'all attendees' && (
        <div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[40vh] mt-[7.5vh]">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-mainBlue"></div>
              <p className="mt-4 text-sm font-light text-gray-400">
                Hang tight, we're almost done ...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
              <TableComponent
                headers={headers}
                data={attendeesData}
                title=""
                showCheckBox={false}
                showFilter={true}
              />
            </div>
          )}
        </div>
      )}

      {/* Attendence */}
      {tab === 'attendence' && (
        <div className="w-full flex md:flex-row flex-col-reverse gap-6">
          {isLoading ? (
            <div className="md:w-4/5 w-full overflow-x-auto h-[40vh] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-mainBlue"></div>
              <p className="mt-4 text-sm font-light text-gray-400">
                Hang tight, we're almost done ...
              </p>
            </div>
          ) : (
            <div className="md:w-4/5 w-full overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
              <TableComponent
                headers={receiptHeaders}
                data={receiptsToDisplay}
                showCheckBox={false}
                showFilter={true}
              />
            </div>
          )}

          <div className="md:w-1/5 w-full h-max border border-3 border-gray rounded-md py-4 flex flex-col items-center text-gray-600">
            <h1 className="font-bold text-6xl">
              {todayAttendance ? (
                todayAttendance
              ) : (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mainBlue"></div>
              )}
            </h1>
            <p className="text-xs mt-4">people attended today</p>
            <p className="mt-6 text-sm flex flex-col text-center">
              <span className="text-xl text-mainGray font-bold mr-4">16</span>
              were added manually
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendees;
