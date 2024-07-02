import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../table/TableComponent';
import attendeesDb from '../../db/attendee';
import { FaRegEye } from 'react-icons/fa6';
import InvoiceTable from '../table/InvoiceTable';
import { IoPrint } from 'react-icons/io5';
import ReactToPrint from 'react-to-print';
import { Formik } from 'formik';
import * as Yup from 'yup';


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

  return (
    <div>
      {showUpdateForm && (
        <div className="fixed top-0 left-0 bg-bgBlue h-screen w-screen overflow-y-auto z-40 overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[40%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowUpdateForm(false)}
            >
              x
            </button>
            <h1 className="text-mainBlue font-semibold text-md md:text-xl">
              Update Attendee:{' '}
              <span className="text-gray-400">{attendeeDetails.id}</span>
            </h1>

            <form action="#" className="w-full">
              <div className="flex flex-row">
                <div className="block w-1/2">
                  <label htmlFor="name" className="text-xs text-gray">
                    Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest full name"
                    name="name"
                    defaultValue={attendeeDetails.name}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
                <div className="block w-1/2">
                  <label htmlFor="name" className="text-xs text-gray">
                    Email:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest full name"
                    name="name"
                    defaultValue={attendeeDetails.name}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="block w-1/2">
                  <label htmlFor="purpose" className="text-xs text-gray">
                    Purpose
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest purpose: eg. consultant"
                    name="purpose"
                    defaultValue={attendeeDetails.role}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
                <div className="block w-1/2">
                  <label htmlFor="purpose" className="text-xs text-gray">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest purpose: eg. consultant"
                    name="purpose"
                    defaultValue={attendeeDetails.role}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="status" className="text-xs text-gray">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={attendeeDetails.status}
                  className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                  required
                >
                  <option value="active">Active</option>
                  <option value="on_pause">On Pause</option>
                  <option value="on_leave">On Leave</option>
                </select>
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
        className="btn btn-primary hover:bg-mainBlue hover:text-white  border-mainBlue border-[1px] rounded-[8px] py-[2px] px-[6px] text-mainBlue font-medium text-xs"
        onClick={() => setShowUpdateForm(true)}
      >
        update
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
        className="btn btn-primary hover:bg-mainBlue hover:text-white border-mainBlue border-[1px] rounded-[8px] py-[2px] px-[6px] text-mainBlue font-medium text-xs"
        onClick={() => setShowUpdateForm(true)}
      >
        update
      </button>
    </div>
  );
}

export function DeleteButton() {
  return (
    <button className="btn btn-primary hover:bg-darkRed hover:text-white  border-darkRed border-[1px] rounded-[8px] py-[2px] px-[6px] text-darkRed font-medium text-xs">
      delete
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
          <div className="relative bg-white w-[40%] lg:w-[50%] h-[80vh] px-[2.5%] py-[2.5%] rounded-md">
            <div className="mx-auto flex flex-col h-full gap-4">
              <button
                className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
                onClick={() => setViewButton(false)}
              >
                x
              </button>

              <h1 className="text-gray-500 font-semibold text-md md:text-[1.1rem]">
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
                    <div className="w-[85%] flex flex-row">
                      <div className="w-[37%] ">
                        <label
                          htmlFor="startDate"
                          className="text-xs text-gray h-3 my-auto pr-1"
                        >
                          From :
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          className={`text-xs w-[8rem] h-[2rem] border-[1px] border-gray rounded-[0.15rem] capitalize ${
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
                      <div className="w-[37%]  ">
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
                          className={`outline-none text-xs  w-[8rem] h-[2rem] border-[1px] border-gray rounded-[0.15rem] capitalize ${
                            errors.startDate && touched.startDate
                              ? 'border-red-500'
                              : ''
                          }`}
                          onChange={handleChange}
                          required
                        />
                        {errors.finalDateDate && touched.finalDate && (
                          <div className="text-red-500 text-xs">
                            {errors.finalDate}
                          </div>
                        )}
                      </div>
                      <div className="w-[20%] text-white">
                        <input
                          type="Submit"
                          value="Filter"
                          className="text-sm text-white w-[8rem] h-[2rem] border-[1px] bg-mainBlue rounded-[0.15rem] capitalize hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </Formik>

              <div className="mt-2 flex flex-row w-full">
                <div className="w-[65%] h-[17.5rem] border border-3 border-mainBlue rounded-md pt-2 pl-2">
                  <TableComponent
                    title=""
                    headers={attendeeHeaders}
                    data={attendeeLastLunch}
                    showCheckBox={false}
                  />
                </div>
                <div className="w-[34%] md:w-4/12 md:pl-4 ">
                  <div className="w-full  flex md:flex-col items-center   text-center  ">
                    <div className="h-[17.5rem] h-full border border-1 border-mainBlue w-full border-gray rounded-md text-sm">
                      <p className="mt-4 flex flex-col items-center">
                        <span className="font-bold text-4xl md:text-8xl text-gray-400 flex flex-col md:flex-row">
                          {lastLunchCount}
                        </span>
                      </p>
                      <div className="flex flex-col gap-3">
                        <p className="text-black font-bold text-[1rem]">
                          From{' '}
                        </p>
                        <p>01/20/2024</p>
                        <p className="text-black font-bold text-[1rem]">to</p>
                        <p>04/5/2024</p>
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
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewButton(true)}
      />
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
  const receiptRef = useRef();

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
                  {receiptData.length}
                </h2>
              </div>
              <div className="w-full border-2 border-gray-200 rounded-md h-[60vh]">
                <TableComponent headers={receiptHeaders} data={receiptData} />
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
              <div className="flex flex-col md:flex-row gap-3 md:items-center mb-3">
                <h2 className="md:w-1/3 text-lg text-gray-500 font-semibold">
                  <span className="text-sm mr-4">Month: </span>
                  {invoice.month}
                </h2>
                <h2 className="flex items-center text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
                  <span className="text-lg mr-4">Total receipts: </span>
                  {invoiceData.length}
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

export function ViewReceiptButton({ receipt, attendees }) {
  const [viewReceipt, setViewReceipt] = useState(false);
  const attendeeHeaders = ['name'];
  const receiptRef = useRef();

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
            Receipt content
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
      <SendToCBMButton guest={guest} />
    </div>
  );
}

export function RestaurantButtons({ invoice }) {
  return (
    <div className="flex gap-2 px-0">
      <ApproveButton invoice={invoice} />
      <DeclineButton invoice={invoice} />
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

export function ReceiptsButtons({ receipt }) {
  return (
    <div className="flex gap-2 px-0">
      <ApproveReceiptButton receipt={receipt} />
      <DeclineReceiptButton receipt={receipt} />
      <ViewReceiptButton receipt={receipt} />
    </div>
  );
}

export function AttendeeButtons({ attendeeDetails }) {
  return (
    <div className="flex gap-2">
      <UpdateAttendeeButton attendeeDetails={attendeeDetails} />
      <DeleteButton />
      <ViewAttendeeButton attendeeDetails={attendeeDetails} />
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
