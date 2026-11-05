import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if (!isAuthenticated) {
        return (_jsx(Navigate, { to: `/login?redirect=${encodeURIComponent(location.pathname)}`, replace: true, state: { message: 'Please log in to proceed to checkout and complete your order.' } }));
    }
    return _jsx(_Fragment, { children: children });
};
