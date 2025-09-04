import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

// If no token, redirect to /login
export default function ProtectedRoute() {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    return <Outlet />;
}
