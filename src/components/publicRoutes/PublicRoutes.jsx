import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={role === 'HR' ? '/hr/statistics' : '/restaurant/home'} />;
  }

  return children;
};

export default PublicRoutes;
