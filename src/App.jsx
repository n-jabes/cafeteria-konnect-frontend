// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes';
import Login from './pages/auth/Login';
import Statistics from './pages/statistics/Statistics';
import Layout from './components/layout/Layout';

function App() {
  const isAuthenticated = true;

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/hr/statistics"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Statistics/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/attendees"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  Attendees
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/restaurant"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  Restaurant
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/guests"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  Guests
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
