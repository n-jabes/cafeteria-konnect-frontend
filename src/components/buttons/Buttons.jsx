import React, { useEffect, useState } from 'react';
import TableComponent from '../table/TableComponent';
import attendeesDb from '../../db/attendee';
import { FaRegEye } from 'react-icons/fa6';

export function MainButton({ text }) {
  return (
    <button className="btn btn-primary float-right bg-mainBlue border-2 rounded-md mb-2 py-2 px-4 hover:bg-white hover:text-[#4069B0] hover:border-2 hover:border-[#4069B0]">
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

export function UpdateAttendeeButton({attendeeDetails}){
  // const [showUpdateForm]

  return(
  <button className="btn btn-primary hover:bg-mainBlue hover:text-white  border-mainBlue border-[1px] rounded-[8px] py-[2px] px-[6px] text-mainBlue font-medium text-xs">
  update
</button>
  ) 
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


export function ViewAttendeeButton({attendeeDetails}){

 
const [attendeeLastLunch, setAttendeeLastLunch] = useState([])
const [lastLunchCount, setLastLunchCount] = useState(0); // State for unique count

//headers for the table
const attendeeHeaders = ["name","lastlunch"];

//Attendee's data filtered for the table
useEffect(()=>{
  const filteredAttendees = attendeesDb.filter((attendee)=> attendee.id === attendeeDetails.id);
  const formattedData = filteredAttendees.map((attendee)=>[
    attendee.name,
    attendee.lastLunch,
  ]);
  setAttendeeLastLunch(formattedData);
  setLastLunchCount(countLastLunch(attendeeLastLunch)); // Calculate and store count

},[attendeeDetails.id])



//the count of data in attendeelastlunch
function countLastLunch(attendeeLastLunch){
  return new Set(attendeeLastLunch).size
}


 //form displayed after view button is clicked
 const [showViewForm, setViewButton] = useState(false);
 return(    
    <div>
      {showViewForm && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[40%] lg:w-[58%] h-[80vh] px-[2.5%] py-[2.5%] rounded-md">
          <div className='mx-auto flex flex-col h-full gap-2'> 
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setViewButton(false)}
            >
              x
            </button>
        
            <h1 className="text-gray-500 font-semibold text-md md:text-[1.1rem]">
              Employee Details for: <span className=" text-mainBlue ">{attendeeDetails.name}</span>
            </h1>
            <p className='text-gray-500 text-[1rem]'>Role : <span className='text-mainBlue font-bold capitalize'>Intern</span></p>
        

              <div className=" w-[70%] flex flex-row">             
                <div className="w-[49%] flex flex-row ">
                  <label htmlFor="startDate" className="text-xs text-gray h-3 my-auto pr-1 ">
                    From :
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    defaultValue={attendeeDetails.lastLunch}
                    className="outline-none text-sm w-[8rem] h-[2rem] border-[1px] border-gray rounded-[0.15rem] capitalize"                   
                    required
                  />
                </div>
                <div className="w-[49%] flex flex-row">
                  <label htmlFor="endDate" className="text-xs text-gray capitalize h-3 my-auto pr-1">
                   to :
                  </label>
                  <input
                    type="text"
                    name="endDate"
                    defaultValue={attendeeDetails.lastLunch}
                    className="outline-none text-sm w-[8rem] h-[2rem] border-[1px] border-gray rounded-[0.15rem] "
                    required
                  />
                </div>
              </div>
              


     <div className="mt-2 flex flex-row w-full">
              <div className="w-[66%] h-[17.5rem] border border-3 border-mainBlue rounded-md pt-2 pl-2">
                 <TableComponent
                  title=""
                  headers={attendeeHeaders}
                  data={attendeeLastLunch}
                  showCheckBox={false}
                /> 
              </div>
              <div className="w-[34%] md:w-4/12 md:pl-4 ">
                <div className="w-full  flex md:flex-col items-center   text-center  ">
                  <div className="h-[17.6rem] h-full border border-1 border-mainBlue w-full border-gray rounded-md text-sm">
                    <p className="mt-4 flex flex-col items-center">
                      <span className="font-bold text-4xl md:text-8xl text-gray-400 flex flex-col md:flex-row">
                      {lastLunchCount}
                      </span>
                    </p>
                    <div className='flex flex-col gap-3'>
                    <p className='text-black font-bold text-[1rem]'>From </p>
                    <p>01/20/2024</p>
                    <p className='text-black font-bold text-[1rem]'>to</p>
                    <p >04/5/2024</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            
            </div>             
              
           
          </div>
          </div>
        </div>
      )}
      {/* <button className="btn btn-primary hover:bg-red-200 hover:text-white py-[2px] px-[6px] border-black border-[1px] rounded-[8px] py-[2px] px-[6px] text-darkRed font-medium text-xs" onClick={()=> setViewButton(true)}>
    View
  </button> */}
  <FaRegEye className='text-[16px] text-gray-600 mx-2 cursor-pointer' onClick={()=> setViewButton(true)}/>
  </div>
  )
}

export function SendToCBMButton({guest}) {

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
        isSent ? 
          'border-gray-400 text-gray-300 cursor-not-allowed hover:bg-gray-100' : 
          'text-[#2DB94C] border-[#2DB94C] hover:bg-[#2DB94C] hover:text-white'
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
                  className="outline-none text-sm py-6 px-6 border-[2px] border-gray rounded-xl"
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
export function ViewInvoiceButton({invoice }) {
  const [viewInvoice, setViewInvoice] = useState(false);

  return (
    <div>
      {viewInvoice && (
        <div className="fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
          <div className="relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
            <button
              className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
              onClick={() => setViewInvoice(false)}
            >
              x
            </button>
            <h1 className="text-mainBlue font-semibold text-md md:text-xl">
              View Invoice: <span className="text-gray-400"></span>
            </h1>
          </div>
        </div>
      )}
      <FaRegEye className='text-[16px] text-gray-600 mx-2 cursor-pointer' onClick={()=> setViewInvoice(true)}/>
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
      <ViewInvoiceButton invoice={invoice}/>
    </div>
  );
}

export function AttendeeButtons({attendeeDetails}){
  return (
    <div className='flex gap-2'>
    <UpdateAttendeeButton  attendeeDetails = {attendeeDetails}/>
    <DeleteButton />
    <ViewAttendeeButton attendeeDetails = {attendeeDetails} />
      </div>
  )
}
