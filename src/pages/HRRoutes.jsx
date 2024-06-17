import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './../components/protectedRoutes/ProtectedRoutes';
import Statistics from './statistics/Statistics';
import Guests from './guests/Guests';
import Attendees from './attendees/Attendees'; 
import Restaurant from './restaurant/Restaurant'; 

const HRRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route
      path="statistics"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Statistics />
        </ProtectedRoute>
      }
    />
    <Route
      path="attendees"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Attendees />
        </ProtectedRoute>
      }
    />
    <Route
      path="restaurant"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Restaurant />
        </ProtectedRoute>
      }
    />
    <Route
      path="guests"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Guests />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default HRRoutes;
