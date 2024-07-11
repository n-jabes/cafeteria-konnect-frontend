import React from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  RestaurantButtons,
  ViewRestaurantInvoiceButton,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';

function Restaurants(props) {
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
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240602,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240602,
      date: '2024-06-18',
      attendees: '30',
    },

    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
    {
      id: 20240603,
      date: '2024-06-18',
      attendees: '30',
    },
  ];

  const allInvoices = [
    {
      id: 20240602,
      month: 'January',
      receipts: '22',
    },
    {
      id: 20240602,
      month: 'February',
      receipts: '24',
    },
    {
      id: 20240602,
      month: 'March',
      receipts: '25',
    },
    {
      id: 20240602,
      month: 'April',
      receipts: '25',
    },
  ];

  const invoiceHeaders = ['Receipt Id', 'Date', 'Number of attendees'];

  const headers = ['Invoice Id', 'Month', 'Number of Receipts', 'Actions'];

  const invoiceReceipts = allReceipts.map((receipt) => [
    receipt.id,
    receipt.date,
    receipt.attendees,
  ]);

  const invoicesToDisplay = allInvoices.map((invoice) => [
    invoice.id,
    invoice.month,
    invoice.receipts,
    <ViewRestaurantInvoiceButton
      invoice={invoice}
      invoiceHeaders={invoiceHeaders}
      invoiceData={invoiceReceipts}
    />,
  ]);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-3 md:items-center mb-3">
          <div className="w-1/3 text-lg text-gray-500 font-semibold">
            <span className="text-sm mr-4">Select year: </span>
            <div className="border-[1px] px-4 py-2 w-max">
              <select className="cursor-pointer outline-none ">
                <option value="2024">2024</option>
                <option value="2024">2025</option>
                <option value="2024">2026</option>
                <option value="2024">2027</option>
                <option value="2024">2028</option>
              </select>
            </div>
          </div>
          <h2 className="flex items-center select-none text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-lg mr-4 ">Total invoices: </span>
            {allInvoices.length}
          </h2>
        </div>
      </div>
      <div className="w-full border-2 border-gray-200 rounded-md h-[70vh]">
        <TableComponent
          headers={headers}
          data={invoicesToDisplay}
          showCheckBox={false}
        />
      </div>
    </div>
  );
}

export default Restaurants;
