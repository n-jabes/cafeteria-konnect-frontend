import React, { useState } from 'react';
import TableComponent from './../../components/table/TableComponent';
import {
  GuestButtons,
  MainButton,
  SendAllNewGuestsToCBMButton,
} from '../../components/buttons/Buttons';

function Guests(props) {
  const [showForm, setShowForm] = useState(false);
  const [sendGuestsToCBM, setSendGuestsToCBM] = useState(false);
  const [uploadFormat, setUploadFormat] = useState('form');
  const headers = ['Id', 'Name', 'Purpose', 'Status', 'Actions'];
  const data = [
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [2, 'Jane Smith', 'Consultant', 'Approved', <GuestButtons />],
    [3, 'Sam Johnson', 'intern', 'Declined', <GuestButtons />],
    [4, 'Nshuti Ruranga Jabes', 'Consultant', 'New', <GuestButtons />],
    [5, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [6, 'Jane Smith', 'Consultant', 'Approved', <GuestButtons />],
    [7, 'Sam Johnson', 'intern', 'Declined', <GuestButtons />],
    [8, 'Nshuti Ruranga Jabes', 'Consultant', 'New', <GuestButtons />],
    [9, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [10, 'Jane Smith', 'Consultant', 'Approved', <GuestButtons />],
    [11, 'Sam Johnson', 'intern', 'Declined', <GuestButtons />],
    [12, 'Nshuti Ruranga Jabes', 'Consultant', 'New', <GuestButtons />],
  ];

  const sendToCBMHeaders = ['Id', 'Name', 'Purpose'];
  const sendToCBMData = [
    [1, 'John Doe', 'intern'],
    [2, 'Jane Smith', 'Consultant'],
    [3, 'Sam Johnson', 'intern'],
    [4, 'Nshuti Ruranga Jabes', 'Consultant'],
    [1, 'John Doe', 'intern'],
    [2, 'Jane Smith', 'Consultant'],
    [3, 'Sam Johnson', 'intern'],
    [4, 'Nshuti Ruranga Jabes', 'Consultant'],
    [1, 'John Doe', 'intern'],
    [2, 'Jane Smith', 'Consultant'],
    [3, 'Sam Johnson', 'intern'],
    [4, 'Nshuti Ruranga Jabes', 'Consultant'],
  ];
  return (
    <div className="">
      {sendGuestsToCBM && (
        <div className=" fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className=" relative bg-white w-[90%] lg:w-[55%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setSendGuestsToCBM(false)}
            >
              x
            </button>
            <h1 className="text-mainBlue font-semibold text-xl">
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
                    Send All Guest To CPM
                  </button>
                </div>
              </div>
            </div>
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
              <form action="#" className="w-full">
                <div className="flex flex-col mb-2">
                  <label htmlFor="name" className="text-xs text-gray">
                    Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest full name"
                    name="name"
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col mb-2">
                  <label htmlFor="name" className="text-xs text-gray">
                    Purpose
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest purpose: eg. consultant"
                    name="name"
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-[48%] flex flex-col mb-2">
                    <label htmlFor="name" className="text-xs text-gray">
                      Starting date
                    </label>
                    <input
                      type="date"
                      placeholder="Arrival"
                      name="name"
                      className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                      required
                    />
                  </div>
                  <div className="w-[48%] flex flex-col mb-2">
                    <label htmlFor="name" className="text-xs text-gray">
                      End date
                    </label>
                    <input
                      type="date"
                      placeholder="Depature"
                      name="name"
                      className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                      required
                    />
                  </div>
                </div>
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
                <input type="file" accept=".csv" className="py-4" />
                <button className="btn border-2 border-mainBlue bg-mainBlue font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3">
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
          headers={headers}
          data={data}
          title="Guests"
          showCheckBox={true}
        />
      </div>
    </div>
  );
}

export default Guests;
