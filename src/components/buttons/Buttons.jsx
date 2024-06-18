import React, { useState } from 'react';

export function MainButton({ text }) {
  return (
    <button className="btn btn-primary bg-[#4069B0] border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]">
      {text}
    </button>
  );
}
export function SendAllNewGuestsToCBMButton() {
  return (
    <button className="btn btn-primary bg-green border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-green hover:border-2 hover:border-green">
      Send All New Guests To CBM
    </button>
  );
}

export function UpdateButton() {
  return (
    <button className="btn btn-primary border-blue border-2 rounded-[8px] py-[2px] px-[6px] text-blue ">
      update
    </button>
  );
}

export function DeleteButton() {
  return (
    <button className="btn btn-primary border-darkRed border-2 rounded-[8px] py-[2px] px-[6px] text-darkRed ">
      delete
    </button>
  );
}

export function SendToCBMButton() {
  const [isSent, setIsSent] = useState(false);
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
      className={` border-[#2DB94C] border-2 rounded-[8px] py-[2px] px-[6px] text-[#2DB94C] text-nowrap${
        isSent ? 'border-gray-400  text-gray cursor-not-allowed' : ''
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
      disabled={isSent || isLoading} // Disable the button when sent or loading
    >
      {isLoading ? 'Sending...' : isSent ? 'Sent' : 'Send To CBM'}
    </button>
  );
}

export function GuestButtons() {
  return (
    <div className="flex gap-2">
      <UpdateButton />
      <DeleteButton />
      <SendToCBMButton />
    </div>
  );
}
