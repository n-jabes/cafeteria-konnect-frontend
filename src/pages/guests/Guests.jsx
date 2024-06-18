import React, { useState } from 'react';
import TableComponent from './../../components/table/TableComponent';
import {
  GuestButtons,
  MainButton,
  SendAllNewGuestsToCBMButton,
} from '../../components/buttons/Buttons';

function Guests(props) {
  const [showForm, setShowForm] = useState(false);
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
    [12, 'Nshuti Ruranga Jabes', 'New', <GuestButtons />],
  ];

  return (
    <div className="">
      {showForm && (
        <div className="formParentContainer fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="patientFormContainer relative bg-white w-[90%] lg:w-[45%] h-[60%] px-[5%] py-[2%] rounded-md">
            <button
              className="close border-2 border-red rounded-md px-2 text-red absolute right-6 top-6"
              onClick={() => setShowForm(false)}
            >
              x
            </button>
            <h1 className="text-blue font-semibold text-xl">
              Add New Guest
            </h1>
            <form action="#" className="w-full">
              <button type="submit" className="btn">
                Create Guest
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="md:flex md:align-center md:justify-between text-white font-medium mb-3">
        <SendAllNewGuestsToCBMButton />
        <div className="w-max" onClick={() => setShowForm(true)}>
          <MainButton text={'+ Add Guest(s)'} />
        </div>
      </div>
      <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
        <TableComponent headers={headers} data={data} />
      </div>
    </div>
  );
}

export default Guests;
