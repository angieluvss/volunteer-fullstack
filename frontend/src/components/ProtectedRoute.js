// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if token exists

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if no token is found
    }

    return children; // If token exists, render the child components (protected routes)
};

export default ProtectedRoute;