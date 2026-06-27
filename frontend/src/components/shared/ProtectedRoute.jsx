import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to appropriate dashboard if accessing wrong role's route
    return <Navigate to={user.role === 'mentor' ? '/mentor/dashboard' : '/mentee/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
