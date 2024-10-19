// frontend/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component checks if user is authenticated
const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;