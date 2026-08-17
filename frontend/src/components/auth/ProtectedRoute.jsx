import React from 'react'
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/auth';
export default function ProtectedRoute({ children }) {
  const access_token = getAccessToken();

  return access_token ? children : <Navigate to="/login" replace />;
}
