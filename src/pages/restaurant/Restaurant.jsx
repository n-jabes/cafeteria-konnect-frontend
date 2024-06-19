import React from 'react';
import RestaurantTableComponent from '../../components/table/RestaurantTableComponent';
import {
  RestaurantButtons,
} from '../../components/buttons/Buttons';
import TableComponent from '../../components/table/TableComponent';

function Restaurants(props) {
  const headers = ['Invoice Id', 'Date', 'Clients', 'Status', 'Actions'];
  const data = [
    [1, 'John Doe', 'intern', 'Pending', <RestaurantButtons />],
    [2, 'Jane Smith', 'Consultant', 'Approved', <RestaurantButtons />],
    [3, 'Sam Johnson', 'intern', 'Declined', <RestaurantButtons />],
    [4, 'Nshuti Ruranga Jabes', 'Consultant', 'New', <RestaurantButtons />],
    [5, 'John Doe', 'intern', 'Pending', <RestaurantButtons />],
    [6, 'Jane Smith', 'Consultant', 'Approved', <RestaurantButtons />],
    [7, 'Sam Johnson', 'intern', 'Declined', <RestaurantButtons />],
    [8, 'Nshuti Ruranga Jabes', 'Consultant', 'New', <RestaurantButtons />],
    [9, 'John Doe', 'intern', 'Pending', <RestaurantButtons />],
    [10, 'Jane Smith', 'Consultant', 'Approved', <RestaurantButtons />],
    [11, 'Sam Johnson', 'intern', 'Declined', <RestaurantButtons />],
    [12, 'Nshuti Ruranga Jabes', 'New', <RestaurantButtons />],
  ];

  return (
    <div className="">
      <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
        {/* <RestaurantTableComponent headers={headers} data={data} /> */}
        <TableComponent headers={headers} data={data}  />
      </div>
    </div>
  );
}

export default Restaurants;
