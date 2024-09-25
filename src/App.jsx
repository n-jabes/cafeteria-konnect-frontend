import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HRRoutes from './pages/HRRoutes';
import Login from './pages/auth/Login';
import RestaurantRoutes from './pages/RestaurantRoutes';
import { FaChartBar, FaFileInvoice } from 'react-icons/fa';
import { FaFileInvoiceDollar, FaPeopleGroup } from 'react-icons/fa6';
import { BsPeopleFill } from 'react-icons/bs';
import { IoReceipt } from 'react-icons/io5';
import PublicRoutes from './components/publicRoutes/PublicRoutes';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import Signup from './pages/auth/Signup';

function App() {
  const hrHeaderTitle = 'HR Dashboard';
  const hrSidebarFields = [
    {
      id: 1,
      destination: '/hr/statistics',
      icon: <FaChartBar className="mr-2" />,
      title: 'Statistics',
    },
    {
      id: 2,
      destination: '/hr/attendees',
      icon: <FaPeopleGroup className="mr-2" />,
      title: 'Attendees',
    },
    {
      id: 3,
      destination: '/hr/restaurant',
      icon: <FaFileInvoiceDollar className="mr-2" />,
      title: 'Restaurant',
    },
    {
      id: 4,
      destination: '/hr/guests',
      icon: <BsPeopleFill className="mr-2" />,
      title: 'Guests',
    },
  ];

  const restaurantHeaderTitle = 'Restaurant Dashboard';
  const restaurantSidebarFields = [
    {
      id: 1,
      destination: '/restaurant/home',
      icon: <FaChartBar className="mr-2" />,
      title: 'Home',
    },
    {
      id: 2,
      destination: '/restaurant/receipts',
      icon: <IoReceipt className="mr-2" />,
      title: 'Receipts',
    },
    {
      id: 3,
      destination: '/restaurant/invoice',
      icon: <FaFileInvoice className="mr-2" />,
      title: 'Invoice',
    },
  ];

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/hr/*"
            element={
              <ProtectedRoutes>
                <Layout
                  sidebarFields={hrSidebarFields}
                  headerTitle={hrHeaderTitle}
                >
                  <HRRoutes />
                </Layout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/restaurant/*"
            element={
              <ProtectedRoutes>
                <Layout
                  sidebarFields={restaurantSidebarFields}
                  headerTitle={restaurantHeaderTitle}
                >
                  <RestaurantRoutes />
                </Layout>
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          />

          <Route
            path="/sign-up"
            element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
