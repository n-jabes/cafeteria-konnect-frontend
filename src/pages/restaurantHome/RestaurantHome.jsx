import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import TableComponent from '../../components/table/TableComponent';

const StatsCard = ({ title, text, style }) => (
  <div className="p-4 w-full md:w-1/2 ">
    <p className="text-slate-500 text-sm mb-2">{title}</p>
    <div
      className={`${style} rounded bg-opacity-25 py-6 px-10 text-center text-[#4069B0] text-xl font-bold shadow-statsCard`}
    >
      {text}
    </div>
  </div>
);

const EstimatedAttendeesCard = ({ text, style, time }) => (
  <div className="p-4 w-[70%] ">
    <div
      className={`${style} rounded bg-opacity-25 py-6 px-10 text-center text-[#4069B0] text-xl font-bold shadow-statsCard relative`}
    >
      <p className="mb-2">{text}</p>
      <p className="absolute text-xs font-light mt-4 bottom-2 right-2">
        {time}
      </p>
    </div>
  </div>
);

const allAttendence = [
  {
    id: 20240602,
    name: 'Nshuti Ruranga Jabes',
    department: 'Consultant',
    date: '2024-06-04',
  },
  {
    id: 20240602,
    name: 'Ineza Kajuga',
    department: 'intern',
    date: '2024-06-04',
  },
  {
    id: 20240602,
    name: 'Marie Honnette',
    department: 'intern',
    date: '2024-06-04',
  },
];

const attendenceHeaders = ['Id', 'Name', 'Department'];
const attendenceData = allAttendence.map((attendence) => [
  attendence.id,
  attendence.name,
  attendence.department,
]);

function RestaurantHome(props) {
  return (
    <div>
      <h1 className="font-semibold text-mainGray">This Week</h1>
      <div className={`w-full px-4 py-2`}>
        <div className="w-full flex flex-col md:flex-row justify-between items-end ">
          <StatsCard title="Today" text="0" style="bg-[#008000] bg-opacity-2" />
          <StatsCard
            title="This week"
            text="1143"
            style="bg-[#4069B0] bg-opacity-2"
          />
          <StatsCard
            title="This month"
            text="5203"
            style="bg-[#808080] bg-opacity-2"
          />
          <p className="h-full w-max flex items-center gap-4 text-[#4069B0] text-xs cursor-pointer  text-nowrap py-4 hover:text-blue-400">
            View all
            <FaArrowRightLong />
          </p>
        </div>
      </div>
      <h1 className="font-semibold text-mainGray">People who attended today</h1>
      <button>Add Attendee</button>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 border-[1px] border-gray-200 rounded-md py-3 px-4 mt-4">
          <TableComponent
            title={'Date: 2024-06-04'}
            headers={attendenceHeaders}
            data={attendenceData}
          />
        </div>
        <div className="w-full md:w-1/4 p-4 border-[1px] border-gray-200 rounded-md mt-4 bg-[#4069B0] bg-opacity-[7%] flex flex-col items-center gap-2">
          <h1 className="text">Recent Activity</h1>
          <p className="text-gray-400 font-medium text-sm">
            Estimated attendees
          </p>
          <EstimatedAttendeesCard
            text="345"
            time="3hr ago"
            style="bg-[#008000] bg-opacity-2 "
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantHome;
