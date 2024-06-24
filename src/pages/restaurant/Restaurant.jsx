import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import { RestaurantButtons } from '../../components/buttons/Buttons';

function Restaurants(props) {
  const allInvoices = [
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
  
  const headers = ['Invoice Id', 'Date', 'Clients', 'Status', 'Actions'];
  const invoicesToDisplay = allInvoices.map((invoice) => [invoice.id, invoice.date, invoice.attendees, invoice.status, <RestaurantButtons invoice={invoice}/>]) 

  return (
    <div className="">
      <div className="overflow-x-auto h-[70vh] border border-3 border-gray rounded-md pl-4 py-4">
        <TableComponent headers={headers} data={invoicesToDisplay} showCheckBox={false} />
      </div>
    </div>
  );
}

export default Restaurants;
