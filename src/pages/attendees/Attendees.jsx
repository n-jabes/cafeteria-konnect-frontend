import React, { useState } from 'react';
import TableComponent from '../../components/table/TableComponent';
import { AttendeeButtons } from '../../components/buttons/Buttons';
import { MainButton } from '../../components/buttons/Buttons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Status } from '../../components/buttons/Buttons';
import * as Yup from 'yup';
import { CgDanger } from 'react-icons/cg';

const validationSchema = Yup.object().shape({
  names: Yup.string()
    .min(2, 'First name and last name must be both more than two characters')
    .required('Names are required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

function Attendees() {
  const options = [
    { role: 'Intern', label: 'Intern' },
    { role: 'Consultant', label: 'consultant' },
  ];

  const [addNewAttendee, setaddNewAttendee] = useState(false);
  const headers = ['Id', 'Name', 'Role', 'Status', 'Actions'];
  const [tab, setTab] = useState('active attendees');
  const [extraPeople, setExtraPeople] = useState(7);

  const allAttendees = [
    {
      id: 1,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      status: 'on leave',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Consultant',
      status: 'active',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      role: 'intern',
      status: 'active',
    },
    {
      id: 4,
      name: 'Nshuti Ruranga Jabes',
      role: 'Permant worker',
      status: 'active',
    },
    {
      id: 5,
      name: 'John Doe',
      role: 'intern',
      status: 'other',
    },
    {
      id: 6,
      name: 'Jane Smith',
      role: 'Consultant',
      status: 'other',
    },
    {
      id: 7,
      name: 'Sam Johnson',
      role: 'intern',
      status: 'active',
    },
    {
      id: 8,
      name: 'Nshuti Ruranga Jabes',
      role: 'Intern',
      status: 'on leave',
    },
    {
      id: 9,
      name: 'John Doe',
      role: 'intern',
      status: 'on leave',
    },
    {
      id: 10,
      name: 'Jane Smith',
      role: 'Consultant',
      status: 'on leave',
    },
    {
      id: 11,
      name: 'Sam Johnson',
      role: 'intern',
      status: 'on leave',
    },
    {
      id: 12,
      name: 'Nshuti Ruranga Jabes',
      role: 'consultant',
      status: 'active',
    },
  ];

  const attendeesData = allAttendees.map((attendeeDetails) => [
    attendeeDetails.id,
    attendeeDetails.name,
    attendeeDetails.role,
    // <Status status={attendeeDetails.status} />,
    attendeeDetails.status,
    <AttendeeButtons attendeeDetails={attendeeDetails} />,
  ]);

  const activeAttendeesData = allAttendees
    .filter((attendee) => attendee.status === 'active')
    .map((attendeeDetails) => [
      attendeeDetails.id,
      attendeeDetails.name,
      attendeeDetails.role,
      attendeeDetails.status,
      // <Status status={attendeeDetails.status} />,
      <AttendeeButtons attendeeDetails={attendeeDetails} />,
    ]);

  const activeAttendeesCount = activeAttendeesData.length;
  const [totalAttendees, setTotalAttendees] = useState(
    activeAttendeesCount + extraPeople
  );

  const handleExpectedAttendees = (e) => {
    e.preventDefault();
    if (isNaN(extraPeople)) {
      setExtraPeople(0);
      const newExtraPeople = 0;
      setExtraPeople(newExtraPeople);
      setTotalAttendees(activeAttendeesCount + newExtraPeople);
    } else {
      const newExtraPeople = parseInt(extraPeople, 10); // Convert extraPeople to integer
      setExtraPeople(newExtraPeople);
      setTotalAttendees(activeAttendeesCount + newExtraPeople);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    // Remove any leading zero when user starts typing a new number
    const parsedValue = value.replace(/^0+/, '');
    if (parsedValue === '') {
      setExtraPeople(0);
    }
      setExtraPeople(parseInt(parsedValue, 10));
    

  };

  return (
    <div>
      {/* tabs component */}
      <div className="flex flex-col md:flex-row w-full md:justify-between mb-2 border-b-[1px] border-b-gray-200">
        {addNewAttendee && (
          <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
            <div className="relative bg-white w-[90%] lg:w-[38%] lg:h-[26rem] h-max px-[3.5%] py-[1.7%] rounded-md">
              <div className="w-[90%] mx-auto flex flex-col gap-8 h-full">
                <button
                  className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                  onClick={() => setaddNewAttendee(false)}
                >
                  x
                </button>
                <h1 className="w-[60%] capitalize text-[#078ECE] font-semibold text-xl">
                  Add New attendee
                </h1>

                <Formik
                  initialValues={{
                    names: '',
                    email: '',
                    role: '',
                    password: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  <Form className="flex flex-col w-full h-[17rem] justify-center gap-[0.4rem]">
                    <label
                      htmlFor="Names"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Names
                    </label>
                    <Field
                      name="names"
                      type="text"
                      placeholder="Full names"
                      className="w-full text-sm border border-[8F8F8F] px-2 py-3 "
                    />
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Username"
                      className="w-full text-sm border border-[8F8F8F] px-2 py-3 "
                    />
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
                      className="block w-full px-3 py-2 mb-3 text-gray-500 text-sm border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-600"
                    >
                      {options.map((option) => (
                        <option key={option.role} value={option.role}>
                          {option.label}
                        </option>
                      ))}
                    </Field>

                    <button
                      type="submit"
                      className="w-full px-2 text-sm py-3 bg-[#078ECE] text-white font-semibold"
                    >
                      Submit
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
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
                  {activeAttendeesCount}
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
                  <button className="py-2 px-4 rounded-sm bg-mainBlue text-white text-xs">
                    Confirm
                  </button>
                </form>
                <p>=</p>
              </div>

              <div className="flex items-center md:flex-row flex-row-reverse md:mt-0 mt-6">
                <div className="font-bold text-3xl text-mainGray bg-green-200 h-max py-[2px] px-[8px] sm:py-2 sm:px-4 rounded-sm ml-6 mr-4">
                  {totalAttendees}
                </div>
                <p className="font-light text-xs text-[#078ECE] w-full md:w-[200px] flex mt-2 mb:mt-[0px] gap-2 items-center">
                  <CgDanger className="text-2xl md:text-6xl" />
                  This is the expected number of attendees the restaurant
                  manager will see!
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto relative h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
            <TableComponent
              headers={headers}
              data={activeAttendeesData}
              title=""
              showCheckBox={false}
              showFilter={true}
            />
          </div>
        </div>
      )}

      {/* all attendees tab */}
      {tab === 'all attendees' && (
        <div>
          <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
            <TableComponent
              headers={headers}
              data={attendeesData}
              title=""
              showCheckBox={false}
              showFilter={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendees;
