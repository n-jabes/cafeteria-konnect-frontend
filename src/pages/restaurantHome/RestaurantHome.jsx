import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import TableComponent from '../../components/table/TableComponent';
import { MainButton } from '../../components/buttons/Buttons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const StatsCard = ({ title, text, style }) => (
  <div className="p-4 w-full md:w-1/2 ">
    <p className="text-slate-500 text-sm mb-2">{title}</p>
    <div
      className={`${style} rounded bg-opacity-25 py-6 px-10 text-center text-[#4069B0] text-xl font-bold shadow-statsCard`}
    >
      {text}
    </div>
  </div>
);

const EstimatedAttendeesCard = ({ text, style, time }) => (
  <div className="p-4 w-[70%] ">
    <div
      className={`${style} rounded bg-opacity-25 py-6 px-10 text-center text-[#4069B0] text-xl font-bold shadow-statsCard relative`}
    >
      <p className="mb-2">{text}</p>
      <p className="absolute text-xs font-light mt-4 bottom-2 right-2">
        {time}
      </p>
    </div>
  </div>
);

const allAttendence = [
  {
    id: 20240602,
    name: 'Nshuti Ruranga Jabes',
    department: 'Consultant',
    date: '2024-06-04',
  },
  {
    id: 20240602,
    name: 'Ineza Kajuga',
    department: 'intern',
    date: '2024-06-04',
  },
  {
    id: 20240602,
    name: 'Marie Honnette',
    department: 'intern',
    date: '2024-06-04',
  },
];

const attendenceHeaders = ['Id', 'Name', 'Department'];
const attendenceData = allAttendence.map((attendence) => [
  attendence.id,
  attendence.name,
  attendence.department,
]);

const validationSchema = Yup.object().shape({
  names: Yup.string()
    .min(2, 'First name and last name must be both more than two characters')
    .required('Names are required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

function RestaurantHome(props) {
  const [addNewAttendee, setaddNewAttendee] = useState(false);
  const options = [
    { department: 'Intern', label: 'Intern' },
    { department: 'Consultant', label: 'consultant' },
  ];

  return (
    <div>
      <h1 className="font-semibold text-mainGray">This Week</h1>
      <div className={`w-full px-4 py-2`}>
        <div className="w-full flex flex-col md:flex-row justify-between items-end ">
          <StatsCard title="Today" text="0" style="bg-[#008000] bg-opacity-2" />
          <StatsCard
            title="This week"
            text="1143"
            style="bg-[#4069B0] bg-opacity-2"
          />
          <StatsCard
            title="This month"
            text="5203"
            style="bg-[#808080] bg-opacity-2"
          />
          {/* <p className="h-full w-max flex items-center gap-4 text-[#4069B0] text-xs cursor-pointer  text-nowrap py-4 hover:text-blue-400">
            View all
            <FaArrowRightLong />
          </p> */}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-mainGray">
          People who attended today
        </h1>

        {addNewAttendee && (
          <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
            <div className="relative bg-white w-[90%] lg:w-[38%] lg:h-[26rem] h-max px-[3.5%] lg:py-[1.7%] md:py-[3%] py-[10%] rounded-md ">
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
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  <Form className="flex flex-col w-full h-[17rem] justify-center gap-[0.4rem]">
                    <label
                      htmlFor="Id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Id
                    </label>
                    <Field
                      name="id"
                      type="text"
                      placeholder="id"
                      className="w-full text-sm border border-[8F8F8F] px-2 py-3 "
                    />
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
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>

                    <Field
                      as="select"
                      id="department"
                      name="department"
                      className="block w-full px-3 py-2 mb-3 text-gray-500 text-sm border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-600"
                    >
                      {options.map((option) => (
                        <option
                          key={option.department}
                          value={option.department}
                        >
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
        <div
          className="w-max mt-4 md:mt-[0px]"
          onClick={() => setaddNewAttendee(true)}
        >
          <div>
            <MainButton text={'+ Add Attendee Manually'} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 border-[1px] border-gray-200 rounded-md py-3 px-4 mt-4">
          <TableComponent
            title={'Date: 2024-06-04'}
            headers={attendenceHeaders}
            data={attendenceData}
          />
        </div>
        <div className="w-full md:w-1/4 p-4 border-[1px] border-gray-200 rounded-md mt-4 bg-[#4069B0] bg-opacity-[7%] flex flex-col items-center gap-2">
          <h1 className="text">Recent Activity</h1>
          <p className="text-gray-400 font-medium text-sm">
            Estimated attendees
          </p>
          <EstimatedAttendeesCard
            text="345"
            time="3hr ago"
            style="bg-[#008000] bg-opacity-2 "
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantHome;
