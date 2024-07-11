import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from '../components/protectedRoutes/ProtectedRoutes';
import Statistics from './statistics/Statistics';
import Guests from './guests/Guests';
import Attendees from './attendees/Attendees';
import Restaurant from './restaurant/Restaurant';

const HRRoutes = () => (
  <Routes>
    <Route
      path="statistics"
      element={
        <ProtectedRoutes>
          <Statistics />
        </ProtectedRoutes>
      }
    />
    <Route
      path="attendees"
      element={
        <ProtectedRoutes>
          <Attendees />
        </ProtectedRoutes>
      }
    />
    <Route
      path="restaurant"
      element={
        <ProtectedRoutes>
          <Restaurant />
        </ProtectedRoutes>
      }
    />
    <Route
      path="guests"
      element={
        <ProtectedRoutes>
          <Guests />
        </ProtectedRoutes>
      }
    />
    <Route
      path="*"
      element={
        <Navigate to="statistics" />
      }
    />
  </Routes>
);

export default HRRoutes;
