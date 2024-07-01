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
      status: 'on leave',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
      status: 'active',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
      status: 'active',
    },
    {
      id: 4,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      department: 'FMIS',
      status: 'on leave',
    },
    {
      id: 5,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
      status: 'active',
    },
    {
      id: 6,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
      status: 'active',
    },
    {
      id: 7,
      name: 'Nshuti Ruranga Jabes',
      role: 'intern',
      department: 'FMIS',
      status: 'on leave',
    },
    {
      id: 8,
      name: 'Jane Smith',
      role: 'Consultant',
      department: 'Budget',
      status: 'active',
    },
    {
      id: 9,
      name: 'Sam Johnson',
      role: 'intern',
      department: 'Human Resource',
      status: 'active',
    },
  ];

  const allReceipts = [
    {
      id: 20240602,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240602,
      date: '2024-06-18',
      attendees: '30',
      status: 'Approved',
    },
    {
      id: 20240602,
      date: '2024-06-18',
      attendees: '30',
      status: 'Declined',
    },

    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'Declined',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'New',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'Declined',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'Approved',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
      status: 'Declined',
    },
  ];

  const receiptAttendees = allAttendees.map((attendee) => [
    attendee.id,
    attendee.name,
    attendee.department,
  ]);

  const receiptHeaders = ['Attendee Id', 'Name', 'Department'];
  const headers = ['Receipt Id', 'Date', 'Clients', 'Status', 'Actions'];
  const receiptsToDisplay = allReceipts.map((receipt) => [
    receipt.id,
    receipt.date,
    receipt.attendees,
    receipt.status,
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
        <div className="flex items-center mb-3">
          <h2 className="w-1/3 text-lg text-gray-500 font-semibold">
            <span className="text-sm mr-4">This month</span>
          </h2>
          <h2 className="flex items-center text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-lg mr-4">Total receipts: </span>
            {receiptsToDisplay.length}
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
