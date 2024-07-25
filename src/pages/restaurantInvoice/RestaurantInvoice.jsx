import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  MainButton,
  RestaurantButtons,
  ViewRestaurantInvoiceButton,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdDangerous } from 'react-icons/md';
import { database, firestoreDB } from '../../utils/firebase';
import { onValue, ref } from 'firebase/database';
import { collection, onSnapshot } from 'firebase/firestore';
const token = sessionStorage.getItem('token');

function RestaurantInvoice(props) {
  const [allInvoices, setAllInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [invoiceErrorMessage, setInvoiceErrorMessage] = useState('');

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

  // const allInvoices = [
  //   {
  //     id: 20240602,
  //     month: 'January',
  //     receipts: '22',
  //   },
  //   {
  //     id: 20240602,
  //     month: 'February',
  //     receipts: '24',
  //   },
  //   {
  //     id: 20240602,
  //     month: 'March',
  //     receipts: '25',
  //   },
  //   {
  //     id: 20240602,
  //     month: 'April',
  //     receipts: '25',
  //   },
  // ];

  const invoiceHeaders = ['Receipt Id', 'Date', 'Number of attendees'];

  const headers = ['Invoice Id', 'Month', 'Number of Receipts', 'Actions'];

  const invoicesToDisplay = allInvoices.map((invoice) => [
    invoice.invoiceId,
    invoice.month,
    invoice.totalReceipts,
    <ViewRestaurantInvoiceButton
      invoice={invoice}
      invoiceHeaders={invoiceHeaders}
    />,
  ]);

  const getAllInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('Invoices: ', response)
      setAllInvoices(response.data.data);
    } catch (error) {
      console.log('Error fetching invoices...');
    } finally {
      setIsLoading(false);
    }
  };

  // console.log('all Invoice: ', allInvoices);

  const handleGenerateInvoice = async () => {
    setIsGeneratingInvoice(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices/generate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Generated invoice: ', response);
    } catch (error) {
      console.log('Failed to generate invoice', error);
      setInvoiceErrorMessage(error?.response?.data?.message || error.message);
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  useEffect(() => {
    getAllInvoices();

    // Create a reference to the 'invoices' collection
    const invoicesCollectionRef = collection(firestoreDB, 'invoices');

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      invoicesCollectionRef,
      (snapshot) => {
        // When Firestore updates, trigger a refresh from the API
        getAllInvoices();
      },
      (error) => {
        console.error('Error listening to Firestore: ', error);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-3 md:items-center lg:w-[60vw] md:justify-between mb-3">
          <div className="w-1/3 text-lg text-gray-500 font-semibold">
            <span className="text-sm mr-4">Select year: </span>
            <div className="border-[1px] px-4 py-2 w-max">
              <select className="cursor-pointer outline-none ">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          </div>
          <h2 className="flex items-center select-none text-mainGray text-3xl px-8 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-lg mr-4 ">Total invoices: </span>
            {allInvoices.length}
          </h2>
          {/* <h2 className="flex items-center text-mainGray text-3xl px-4 py-4 font-semibold border-[1px] border-gray-200 w-max">
            <span className="text-sm mr-4">Total attendence: </span>
            7890
          </h2> */}
          <button
            onClick={handleGenerateInvoice}
            className="btn btn-primary text-white w-max float-right bg-mainBlue border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]"
          >
            Generate Invoice
          </button>
        </div>
      </div>
      {isGeneratingInvoice && (
        <div className="flex flex-col items-center justify-center h-[10vh] my-[2.5vh]">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mainBlue"></div>
          <p className="mt-4 text-sm font-light text-gray-400">
            Generating Invoice ...
          </p>
        </div>
      )}
      {invoiceErrorMessage && (
        <div className="error text-red-500 mt-2 relative w-6/7 sm:w-[60%] md:w-[30%] mx-auto border-[1px] min-h-[10vh] h-max p-2 flex flex-col md:flex-row gap-2 items-start md:items-center mb-4">
          <button
            className="close border-[1px] border-mainRed rounded-md px-2 text-mainRed absolute right-2 top-2 text-sm"
            onClick={() => setInvoiceErrorMessage()}
          >
            x
          </button>
          <MdDangerous className="text-6xl" />
          <p className="w-[80%] text-sm">{invoiceErrorMessage}</p>
        </div>
      )}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[40vh] mt-[7.5vh]">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-mainBlue"></div>
          <p className="mt-4 text-sm font-light text-gray-400">
            Hang tight, we're almost done ...
          </p>
        </div>
      ) : (
        <div className="w-full border-2 border-gray-200 rounded-md h-[70vh]">
          <TableComponent
            headers={headers}
            data={invoicesToDisplay}
            showCheckBox={false}
          />
        </div>
      )}
    </div>
  );
}

export default RestaurantInvoice;
