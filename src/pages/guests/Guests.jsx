import React from 'react';
import TableComponent from './../../components/table/TableComponent';
import {
  GuestButtons,
  MainButton,
  SendAllNewGuestsToCBMButton,
} from '../../components/buttons/Buttons';

function Guests(props) {
  const headers = ['Id', 'Name', 'Purpose', 'Status', 'Actions'];
  const data = [
    [1, 'John Doe', 'intern', 'pending', <GuestButtons />],
    [2, 'Jane Smith', 'Consultant', 'approved', <GuestButtons />],
    [3, 'Sam Johnson', 'intern', 'declined', <GuestButtons />],
    [4, 'Nshuti Ruranga Jabes', 'intern', 'pending', <GuestButtons />],
  ];

  return (
    <div className=" ">
      <div className="md:flex md:align-center md:justify-between text-white font-medium mb-3">
        <SendAllNewGuestsToCBMButton />
        <MainButton text={'+ Add Guest(s)'} />
      </div>
      <div className="overflow-x-auto h-[70vh] border border-3 border-[#30415F] rounded-md pl-4 py-4">
        <TableComponent headers={headers} data={data} />
      </div>
    </div>
  );
}

export default Guests;
