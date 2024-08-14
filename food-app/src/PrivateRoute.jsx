import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { state } = useAuth();

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
