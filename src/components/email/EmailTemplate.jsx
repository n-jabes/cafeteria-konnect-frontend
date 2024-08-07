import { React, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Toast from './../toast/Toast';
import { Bounce, toast } from 'react-toastify';
import TableComponent from '../table/TableComponent';
import Guests from './../../pages/guests/Guests';
import Papa from 'papaparse';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import { API_BASE_URL } from '../../utils/api';

const uploadToStorageService = async (csvData) => {
  const storage = getStorage();
  const fileName = `guests_${Date.now()}.csv`;
  const storageRef = ref(storage, fileName);

  await uploadString(storageRef, csvData, 'raw');
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

const generateCSV = (data) => {
  return Papa.unparse(data);
};

const uploadCSV = async (guests) => {
  const csvData = generateCSV(guests);
  // Upload csvData to your storage service
  // Return the URL of the uploaded file
  const csvUrl = await uploadToStorageService(csvData);
  return csvUrl;
};

function EmailTemplate({ headers, guests }) {
  const [senderName, setSenderName] = useState('Marie Honnette');
  const [senderEmail, setSenderEmail] = useState('honnettemarie12@gmail.com');
  const [receiverName, setReceiverName] = useState('Nshuti Jabes');
  const [receiverEmail, setReceiverEmail] = useState('nshutij7@gmail.com');
  const [sendingToCBM, setSendingToCBM] = useState(false);
  const [message, setMessage] = useState(
    'Hello, this is the list of new guests'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setshowList] = useState(false);
  const form = useRef();

  const guestsToShow = guests.map((guest) => [
    guest.id,
    guest.name,
    guest.purpose,
  ]);

  // console.log('guestsToShow: ', guestsToShow);

  const generateGuestListHTML = () => {
    return guests
      .map(
        (guest, index) =>
          `<tr>
            <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: left;">${guest.id}</td>
            <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: left;">${guest.name}</td>
            <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: left;">${guest.purpose}</td>
          </tr>`
      )
      .join('');
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // console.log('new guests: ', guests);

    const csvUrl = await uploadCSV(guests);
    // const guestIds = guests.map((guest) => guest.userId);
    const guestIds = guests.map((guest) => guest.userId).join(',');

    console.log('guest Ids: ', guestIds);

    const templateParams = {
      sender_name: senderName,
      sender_email: senderEmail,
      receiver_name: receiverName,
      receiver_email: receiverEmail,
      message: message,
      csv_url: csvUrl,
      guest_list: generateGuestListHTML(),
      approve_url: `${API_BASE_URL}/users/approve-guests-proxy`,
      decline_url: `${API_BASE_URL}/users/decline-guests`,
      guestIds: guestIds,
    };
    

    // const templateParams = {
    //   sender_name: senderName,
    //   sender_email: senderEmail,
    //   receiver_name: receiverName,
    //   receiver_email: receiverEmail,
    //   message: message,
    //   guest_list: generateGuestListHTML(),
    // };

    // EmailJS credentials
    const templateId = 'template_euz6s5h';
    const serviceId = 'Nshtui42@123';
    const publicKey = 'Xu_wSmnOS-BmuvXeV';

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      () => {
        toast.success('Email sent successfully!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        setSenderName('');
        setSenderEmail('');
        setReceiverName('');
        setReceiverEmail('');
        setMessage('');
        setIsLoading(false);
      },
      (error) => {
        toast.error('Failed to send email!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    );
  };

  return (
    <div className="h-[70vh] overflow-y-auto pr-4">
      <form ref={form} onSubmit={sendEmail} className="mt-6 md:mt-2">
        <Toast />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col mb-3 w-full md:w-[48%]">
            <label htmlFor="sender_name" className="text-xs text-gray-500">
              Sender Name
            </label>
            <input
              className="border-[1px] border-gray-300 outline-none py-2 px-4"
              type="text"
              name="sender_name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3 w-full md:w-[48%]">
            <label htmlFor="sender_email" className="text-xs text-gray-500">
              Sender Email
            </label>
            <input
              type="email"
              className="border-[1px] border-gray-300 outline-none py-2 px-4"
              name="sender_email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col mb-3 w-full md:w-[48%]">
            <label htmlFor="receiver_name" className="text-xs text-gray-500">
              Receiver Name
            </label>
            <input
              className="border-[1px] border-gray-300 outline-none py-2 px-4"
              type="text"
              name="receiver_name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3 w-full md:w-[48%]">
            <label htmlFor="receiver_email" className="text-xs text-gray-500">
              Receiver Email
            </label>
            <input
              type="email"
              className="border-[1px] border-gray-300 outline-none py-2 px-4"
              name="receiver_email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xs text-gray-500">Message</label>
          <textarea
            name="message"
            className="border-[1px] w-full h-[30vh] border-gray-300 outline-none py-2 px-4 text-sm text-gray-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className={`py-2 px-4 w-full md:w-1/4 text-white rounded-[3px]   ${
            isLoading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-mainBlue border-[1px] border-mainBlue hover:bg-white hover:text-mainBlue cursor-pointer'
          }`}
          disabled={isLoading}
          value={isLoading ? 'Sending...' : 'Send'}
        />
      </form>
      {!showList && (
        <h2
          className="text-sm font-semibold text-blue-600 pt-4 underline cursor-pointer"
          onClick={() => setshowList(true)}
        >
          View List
        </h2>
      )}
      {showList && (
        <div className="mt-4 border-[1px] border-gray-300">
          <div className="flex items-center justify-between w-full px-4 py-4">
            <h2 className="font-semibold text-gray-400">List of new Guests</h2>
            <h2
              className="text-sm font-semibold text-blue-600 underline cursor-pointer"
              onClick={() => setshowList(false)}
            >
              Hide List
            </h2>
          </div>
          <TableComponent headers={headers} data={guestsToShow} />
        </div>
      )}
    </div>
  );
}

export default EmailTemplate;
