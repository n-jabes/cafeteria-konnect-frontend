import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RestaurantHome from './restaurantHome/RestaurantHome';
import ProtectedRoutes from '../components/protectedRoutes/ProtectedRoutes';
import RestaurantReceipts from './restaurantReceipts/RestaurantReceipts';
import RestaurantInvoice from './restaurantInvoice/RestaurantInvoice';

function RestaurantRoutes() {
  return (
    <Routes>
      <Route
        path="home"
        element={
          <ProtectedRoutes>
            <RestaurantHome />
          </ProtectedRoutes>
        }
      />
      <Route
        path="receipts"
        element={
          <ProtectedRoutes>
            <RestaurantReceipts />
          </ProtectedRoutes>
        }
      />
      <Route
        path="invoice"
        element={
          <ProtectedRoutes>
            <RestaurantInvoice />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}

export default RestaurantRoutes;
