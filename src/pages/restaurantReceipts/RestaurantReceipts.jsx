import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/table/TableComponent';
import {
  RestaurantButtons,
  ViewRestaurantReceiptButton,
} from '../../components/buttons/Buttons';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../utils/firebase';
// const token = sessionStorage.getItem('token');

function RestaurantReceipts(props) {
  const [allReceipts, setAllReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token'))

  const getAllReceipts = async () => {
    setIsLoading(true);
    // console.log('token: ', token)
    try {
      const response = await axios.get(`${API_BASE_URL}/receipts/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllReceipts(response.data.data);
    } catch (error) {
      console.log('Failed to fetch receipts', error?.response?.data || error.message);
      // setErrorMessage(error.response.data.message);
      // toast.error('Failed to Fetch Stats' + error.response.data.message, {
      //   position: 'top-right',
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      //   transition: Bounce,
      // });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the roles and departments when the component mounts
  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    getAllReceipts();

    // Create a reference to the 'receipts' collection
    const usersCollectionRef = collection(firestoreDB, 'receipts');

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        // When Firestore updates, trigger a refresh from the API
        getAllReceipts();
      },
      (error) => {
        console.error('Error listening to Firestore: ', error);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const receiptHeaders = ['Id', 'Names', 'Department', 'isScanned'];
  const headers = ['Receipt Id', 'Date', 'Clients', 'Actions'];

  const receiptsToDisplay = allReceipts.map((receipt) => [
    receipt.receiptId,
    receipt.createdAt,
    receipt.numberOfAttendees,
    <ViewRestaurantReceiptButton
      receipt={receipt}
      receiptHeaders={receiptHeaders}
      receiptData={receipt}
      receiptDate={receipt.createdAt}
    />,
  ]);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 lg:w-[40vw] w-full md:w-[60vw] md:justify-between md:items-center mb-3">
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
            data={receiptsToDisplay}
            showCheckBox={false}
          />
        </div>
      )}
    </div>
  );
}

export default RestaurantReceipts;
