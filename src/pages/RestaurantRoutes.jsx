import React from 'react';
import Statistics from './statistics/Statistics';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './../components/protectedRoutes/ProtectedRoutes';


function RestaurantRoutes({ isAuthenticated }) {
  <Routes>
    <Route
      path="home"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Statistics />
        </ProtectedRoute>
      }
    />
    <Route
      path="invoice"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Statistics />
        </ProtectedRoute>
      }
    />
  </Routes>;
}

export default RestaurantRoutes;
