import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  RestaurantButtons,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';

function RestaurantReceipts(props) {
  const allAttendees = [
    {
      id: 1,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      department: 'FMIS',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
    },
    {
      id: 4,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      department: 'FMIS',
    },
    {
      id: 5,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
    },
    {
      id: 6,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
    },
    {
      id: 7,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      department: 'FMIS',
    },
    {
      id: 8,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
    },
    {
      id: 9,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
    },
  ];

  const allReceipts = [
    {
      id: 20240602,
      date: '2024-06-01',
      attendees: '30',
    },
    {
      id: 20240602,
      date: '2024-06-02',
      attendees: '30',
    },
    {
      id: 20240602,
      date: '2024-06-03',
      attendees: '30',
    },

    {
      id: 20240603,
      date: '2024-06-04',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-05',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-06',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-07',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-08',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-09',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-10',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-11',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-12',
      attendees: '30',
    },
  ];

  const receiptAttendees = allAttendees.map((attendee) => [
    attendee.id,
    attendee.name,
    attendee.department,
  ]);

  const receiptHeaders = ['Attendee Id', 'Name', 'Department'];
  const headers = ['Receipt Id', 'Date', 'Clients', 'Actions'];

  const receiptsToDisplay = allReceipts.map((receipt) => [
    receipt.id,
    receipt.date,
    receipt.attendees,
    <ViewRestaurantReceiptButton
      receipt={receipt}
      receiptHeaders={receiptHeaders}
      receiptData={receiptAttendees}
      receiptDate={receipt.date}
    />,
  ]);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 lg:w-[60vw] w-full md:justify-between md:items-center mb-3">
          <div className="md:w-1/3 text-lg text-gray-500 font-semibold">
            <span className="text-sm mr-4">Select month: </span>
            <div className="border-[1px] px-4 py-2 w-max">
              <select className="cursor-pointer outline-none ">
                <option value="January">Jan</option>
                <option value="February">Feb</option>
                <option value="March">Mar</option>
                <option value="April">Apr</option>
                <option value="May">May</option>
                <option value="June">Jun</option>
                <option value="July">Jul</option>
                <option value="August">Aug</option>
                <option value="September">Sept</option>
                <option value="October">Oct</option>
                <option value="November">Nov</option>
                <option value="December">Dec</option>
              </select>
            </div>
          </div>
          <h2 className="flex items-center text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-lg mr-4">Total receipts: </span>
            {receiptsToDisplay.length}
          </h2>
          <h2 className="flex items-center text-mainGray text-3xl px-4 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-sm mr-4">Total attendence: </span>
            7890
          </h2>
        </div>
      </div>
      <div className="w-full border-2 border-gray-200 rounded-md h-[70vh]">
        <TableComponent
          headers={headers}
          data={receiptsToDisplay}
          showCheckBox={false}
        />
      </div>
    </div>
  );
}

export default RestaurantReceipts;
