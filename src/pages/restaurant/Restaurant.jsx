import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  RestaurantButtons,
  ViewRestaurantInvoiceButton,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../utils/firebase';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
// const token = sessionStorage.getItem('token');

function Restaurants(props) {
  const [allInvoices, setAllInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

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
    // console.log('isLoading: ')
    // console.log('token: ', token)
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllInvoices(response.data.data);
    } catch (error) {
      console.log('Error fetching invoices...', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllInvoices();
    setToken(sessionStorage.getItem('token'))

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

export default Restaurants;
