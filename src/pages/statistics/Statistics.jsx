import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CafeteriaAttendeesChart from '../../components/chart/CafeteriaAttendeesChart';

const RoundedIcon = ({ text, style }) => (
  <div
    className={`${style} text-white rounded-full h-10 w-10 flex items-center justify-center`}
  >
    {text}
  </div>
);

const StatsCard = ({ title, text, style }) => (
  <div className="p-4 w-full md:w-1/2">
    <p className='text-slate-500 text-sm mb-2'>{title}</p>
    <div className={`${style} rounded bg-opacity-25 py-6 px-10 h-[7.3rem] text-center text-[#4069B0] text-xl font-bold shadow-statsCard`}>
      {text}
    </div>
  </div>
);

const initialChartData = [
  { date: '6/1/2024', value: 4500 },
  { date: '6/2/2024', value: 3000 },
  { date: '6/3/2024', value: 4000 },
  { date: '6/4/2024', value: 3500 },
  { date: '6/5/2024', value: 3800 },
  { date: '6/6/2024', value: 3200 },
];

const initialNotifications = [
  {
    id: 1,
    icon: <RoundedIcon text="R" style="bg-[#008000]" />,
    text: 'Restaurant manager sent a new invoice',
    time: 'just now',
  },
  {
    id: 2,
    icon: <RoundedIcon text="C" style="bg-[#E79602]" />,
    text: 'CPM acted on your request to approve new guests',
    time: '1 week ago',
  },
  {
    id: 3,
    icon: <RoundedIcon text="R" style="bg-[#008000]" />,
    text: 'Restaurant manager sent a new invoice',
    time: '07/06/24',
  },
  {
    id: 4,
    icon: <RoundedIcon text="R" style="bg-[#008000]" />,
    text: 'Restaurant manager sent a new invoice',
    time: '07/06/24',
  },
  {
    id: 5,
    icon: <RoundedIcon text="C" style="bg-[#E79602]" />,
    text: 'CPM acted on your request to approve new guests',
    time: '1 week ago',
  },
  {
    id: 6,
    icon: <RoundedIcon text="R" style="bg-[#008000]" />,
    text: 'Restaurant manager sent a new invoice',
    time: '07/06/24',
  },
  {
    id: 7,
    icon: <RoundedIcon text="R" style="bg-[#008000]" />,
    text: 'Restaurant manager sent a new invoice',
    time: '07/06/24',
  },
];

function Statistics(props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(initialChartData);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [visibleNotifications, setVisibleNotifications] = useState(4);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const generateRandomData = (start, end) => {
    const data = [];
    const currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      data.push({
        date: currentDate.toLocaleDateString(),
        value: Math.floor(Math.random() * 6000),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const generatedData = generateRandomData(start, end);
      setFilteredData(generatedData);
      setIsCalendarOpen(false);
    }
  };

  const handleNotificationClose = (id) => {
    const newNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(newNotifications);
    setVisibleNotifications(newNotifications.length < 4 ? newNotifications.length : visibleNotifications);
  };

  const handleViewMore = () => {
    setVisibleNotifications(notifications.length);
  };

  const handleViewLess = () => {
    setVisibleNotifications(4);
  };

  return (
    <div className='w-full sm:h-[80vh] h-auto'>
      <p className='font-medium font-extrabold'>Cafeteria attendances</p>
      <div className={`flex flex-col lg:flex-row justify-between p-2 h-[75vh] `}>
        <div className={`w-full p-4 `}>
          <div className='flex flex-col md:flex-row justify-between'>
            <StatsCard title="Today" text="0" style="bg-[#008000] bg-opacity-2" />
            <StatsCard title="This week" text="1143" style="bg-[#4069B0] bg-opacity-2" />
            <StatsCard title="This month" text="5203" style="bg-[#808080] bg-opacity-2" />
          </div>
          <div className='border border-current rounded w-full lg:h-[80%] px-4 pt-2 md:block relative'>
            <div className='flex justify-between items-center'>
              <p>Cafeteria attendees</p>
              <button
                className="text-mainBlue flex items-center"
                onClick={toggleCalendar}
              >
                <FaCalendarAlt />
              </button>
            </div>
            {isCalendarOpen && (
              <div className="absolute top-10 right-0 rounded shadow z-50">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </div>
            )}
            <div className="relative h-[90%]">
              <CafeteriaAttendeesChart data={filteredData} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Statistics;