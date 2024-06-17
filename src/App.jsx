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
  const isAuthenticated = true;

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/hr/*"
              element={<HRRoutes isAuthenticated={isAuthenticated} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/hr/statistics" />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
