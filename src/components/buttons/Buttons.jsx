import React, { useState } from 'react';

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
  const [isSent, setIsSent] = useState(guest.status != 'New' ? true : false);

  const [isLoading, setIsLoading] = useState(false);

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
      className={`font-medium text-xs hover:bg-[#2DB94C] hover:text-white border-[#2DB94C] border-[1px] rounded-[8px] py-[2px] px-[6px] text-[#2DB94C] text-nowrap${
        isSent
          ? 'border-[1px] border-gray-400  text-gray-300 cursor-not-allowed hover:bg-gray-100 hover:text-gray-400'
          : ''
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
      disabled={isSent || isLoading} // Disable the button when sent or loading
    >
      {isLoading ? 'Sending...' : isSent ? 'Sent' : 'Send To CBM'}
    </button>
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
