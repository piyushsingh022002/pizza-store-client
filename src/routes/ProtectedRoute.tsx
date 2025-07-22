import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  role: 'User' | 'Admin';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  if (!token || storedRole !== role) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
