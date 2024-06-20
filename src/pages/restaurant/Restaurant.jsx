import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import { GuestButtons } from '../../components/buttons/Buttons';

function Restaurants(props) {
  const headers = ['Invoice Id', 'Date', 'Clients', 'Status', 'Actions'];
  const data = [
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
    [1, 'John Doe', 'intern', 'Pending', <GuestButtons />],
  ];

  return (
    <div className="">
      <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
        {/* <RestaurantTableComponent headers={headers} data={data} /> */}
        <TableComponent headers={headers} data={data} showCheckBox={false} />
      </div>
    </div>
  );
}

export default Restaurants;
