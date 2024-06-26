import React from 'react';
import Statistics from './statistics/Statistics';

function RestaurantRoutes(props) {
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
