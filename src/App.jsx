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

function App() {
  const isAuthenticated = true; // This would typically come from your AuthContext or similar

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Routes */}
          <Route
            path="/hr/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <HRRoutes isAuthenticated={isAuthenticated} />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/hr/statistics" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
