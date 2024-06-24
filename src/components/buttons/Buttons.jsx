import React, { useEffect, useRef, useState } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import InvoiceTable from '../table/InvoiceTable';
import { IoPrint } from 'react-icons/io5';
import ReactToPrint from 'react-to-print';

export function MainButton({ text }) {
  return (
    <button className="btn btn-primary bg-mainBlue border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]">
      {text}
    </button>
  );
}

export function SendAllNewGuestsToCBMButton() {
  return (
    <button className="btn btn-primary bg-mainGreen border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-mainGreen hover:border-2 hover:border-mainGreen">
      Send All New Guests To CBM
    </button>
  );
}

export function UpdateGuestButton({ guest }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div>
      {showUpdateForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowUpdateForm(false)}
            >
              x
            </button>
            <h1 className="text-mainBlue font-semibold text-md md:text-xl">
              Update Guest: <span className="text-gray-400">{guest.id}</span>
            </h1>
            <form action="#" className="w-full">
              <div className="flex flex-col mb-2">
                <label htmlFor="name" className="text-xs text-gray">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter guest full name"
                  name="name"
                  defaultValue={guest.name}
                  className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="purpose" className="text-xs text-gray">
                  Purpose
                </label>
                <input
                  type="text"
                  placeholder="Enter guest purpose: eg. consultant"
                  name="purpose"
                  defaultValue={guest.purpose}
                  className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[48%] flex flex-col mb-2">
                  <label htmlFor="startDate" className="text-xs text-gray">
                    Starting date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={guest.startDate}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
                <div className="w-[48%] flex flex-col mb-2">
                  <label htmlFor="endDate" className="text-xs text-gray">
                    End date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={guest.endDate}
                    className="outline-none text-sm py-2 px-4 border-[1px] border-gray rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn border-2 border-mainBlue bg-mainBlue text-md font-semibold text-white py-2 px-4 rounded-md w-full hover:bg-white hover:text-mainBlue mt-3"
              >
                Update Guest
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary hover:bg-mainBlue hover:text-white border-mainBlue border-[1px] rounded-[8px] py-[2px] px-[6px] text-mainBlue font-medium text-xs"
        onClick={() => setShowUpdateForm(true)}
      >
        update
      </button>
    </div>
  );
}

export function DeleteButton() {
  return (
    <button className="btn btn-primary hover:bg-darkRed hover:text-white  border-darkRed border-[1px] rounded-[8px] py-[2px] px-[6px] text-darkRed font-medium text-xs">
      delete
    </button>
  );
}

export function SendToCBMButton({ guest }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(guest.status !== 'New');

  useEffect(() => {
    setIsSent(guest.status !== 'New');
  }, [guest.status]);

  const handleClick = () => {
    setIsLoading(true);

    // Simulate sending to CBM with a delay (replace with actual logic)
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1000);

    console.log('Sending to CBM...');
  };

  return (
    <button
      className={`font-medium text-xs border-[1px] rounded-[8px] py-[2px] px-[6px] text-nowrap ${
        isSent
          ? 'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100'
          : 'text-[#2DB94C] border-[#2DB94C] hover:bg-[#2DB94C] hover:text-white'
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
      disabled={isSent || isLoading} // Disable the button when sent or loading
    >
      {isLoading ? 'Sending...' : isSent ? 'Sent' : 'Send To CBM'}
    </button>
  );
}

export function ApproveButton({ invoice }) {
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    invoice.status !== 'New'
  );

  useEffect(() => {
    setActionPerformed(invoice.status !== 'New');
  }, [invoice.status]);

  return (
    <div>
      {showApproveForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowApproveForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to approve?
            </h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn mt-4 text-white font-semibold btn-primary bg-mainGreen border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-mainGreen border-mainGreen"
                onClick={() => setShowApproveForm(false)}
              >
                Yes, I Approve
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary  border-[1px] rounded-[8px] py-[2px] px-[6px] font-medium text-xs ${
          actionPerfomed
            ? 'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-mainGreen hover:text-white border-mainGreen text-mainGreen'
        }`}
        onClick={() => setShowApproveForm(true)}
        disabled={actionPerfomed}
      >
        approve
      </button>
    </div>
  );
}

export function DeclineButton({ invoice }) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [actionPerfomed, setActionPerformed] = useState(
    invoice.status != 'New' ? true : false
  );

  return (
    <div>
      {showDeclineForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setShowDeclineForm(false)}
            >
              x
            </button>
            <h1 className="pb-6 flex justify-center text-gray-500 text-md md:text-xl">
              Are you sure you want to decline?
            </h1>
            <form action="#" className="w-full">
              <div className="flex flex-col mb-2">
                <label htmlFor="reason" className="text-md text-gray-800 pb-2">
                  Reason for declining the invoice:
                </label>
                <textarea
                  type="text"
                  placeholder=""
                  name="reason"
                  className="outline-none text-sm py-6 px-6 border-[2px] border-gray rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="btn mt-4 text-white font-semibold btn-primary bg-darkRed border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-darkRed border-darkRed"
                  onClick={() => setShowDeclineForm(false)}
                >
                  Yes, I Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        className={`btn btn-primary border-[1px] rounded-[8px] py-[2px] px-[6px]  font-medium text-xs ${
          actionPerfomed
            ? 'border-[1px] border-gray-400  text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-300'
            : 'hover:bg-darkRed hover:text-white border-darkRed text-darkRed'
        }`}
        onClick={() => setShowDeclineForm(true)}
        disabled={actionPerfomed}
      >
        decline
      </button>
    </div>
  );
}

export function ViewInvoiceButton({ invoice }) {
  const [viewInvoice, setViewInvoice] = useState(false);
  const headers = ['Date', 'Lunch Attendees', 'Price Per Person', 'Total'];
  const data = [['06.06.2024', '400', '............', '............']];
  const invoiceRef = useRef();

  return (
    <div>
      {viewInvoice && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center cursor-pointer">
          <div className="relative bg-white w-[90%] lg:w-[50%] h-[90vh] overflow-y-auto px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setViewInvoice(false)}
            >
              x
            </button>

            <div className="bg-white" ref={invoiceRef}>
              {/* invoice headings */}
              <div className="w-full flex items-center gap-8 md:justify-between pt-5">
                <img
                  className="w-[5rem]"
                  src="/Coat_of_arms.png"
                  alt="coat of arms logo"
                />
                <div className="text-right">
                  <p className="mb-4 text-xs">Kigali, {invoice.date}</p>
                  <h1 className="text-3xl">INVOICE</h1>
                  <p className="text-xs">Invoice: #{invoice.id}</p>
                </div>
              </div>

              {/* ministry details */}
              <div className="mt-6">
                <p>MINISTRY OF FINANCE AND ECONOMIC PLANNING</p>
                <p>P.O Box 158 Kigali</p>
                <p>
                  <span>Tel: +250 252575756</span>
                  <span className="ml-4">Fax: +250 252 5777581</span>
                </p>
                <p>
                  Email:
                  <span className="text-mainBlue ml-4 hover:cursor-pointer hover:underline hover:underline-offset-1">
                    mfin@minecofin.gov.rw
                  </span>
                </p>
              </div>

              {/* restaurant details */}
              <div className="mt-8 w-[65%]">
                <img
                  src="/Bourbon_Coffee_Logo.png"
                  alt=""
                  className="w-[6.5rem]"
                />
                <p>Tel: +250 789 777 771</p>
                <p>
                  Email:
                  <span className="text-mainBlue ml-4 hover:cursor-pointer hover:underline hover:underline-offset-1">
                    Bourboncoffee@Restaurant.rw
                  </span>
                </p>
              </div>

              {/* table */}
              <div className="my-6">
                <InvoiceTable
                  headers={headers}
                  data={data}
                  showCheckBox={false}
                  title={''}
                />
              </div>
              {/* signatures */}
              <div className="h-[15vh] w-full">
                <p className="font-semibold text-gray-800">Signatures:</p>
              </div>

              {/* parties involved */}
              <div className="w-full flex items-center justify-between">
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">
                    KIMENYI Emmanuel
                  </p>
                  <p className="text-gray-500 text-xs">
                    Human Resource Department
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">JOHN Doe</p>
                  <p className="text-gray-500 text-xs">Bouborn Coffee CEO</p>
                </div>
              </div>
            </div>

            {/* print button */}
            <ReactToPrint
              trigger={() => {
                return (
                  <div className="mt-[3rem] w-full flex items-center justify-center">
                    <button className="btn btn-primary bg-[#28A4E2] border-2 rounded-md mb-2 py-2 px-4 hover:bg-[#2696CD] hover:border-[#2696CD] border-[#28A4E2] text-white flex items-center gap-2">
                      <IoPrint className="text-xl" />
                      Print / Download
                    </button>
                  </div>
                );
              }}
              content={() => invoiceRef.current}
            />
          </div>
        </div>
      )}
      <FaRegEye
        className="text-[16px] text-gray-600 mx-2 cursor-pointer"
        onClick={() => setViewInvoice(true)}
      />
    </div>
  );
}

export function GuestButtons({ guest }) {
  return (
    <div className="flex gap-2">
      <UpdateGuestButton guest={guest} />
      <DeleteButton />
      <SendToCBMButton guest={guest} />
    </div>
  );
}

export function RestaurantButtons({ invoice }) {
  return (
    <div className="flex gap-2 px-0">
      <ApproveButton invoice={invoice} />
      <DeclineButton invoice={invoice} />
      <ViewInvoiceButton invoice={invoice} />
    </div>
  );
}
