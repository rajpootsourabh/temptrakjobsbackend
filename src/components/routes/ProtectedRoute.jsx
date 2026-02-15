import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader/Loader';

const ProtectedRoute = ({ children, requiredRoles = [], requiredPermissions = [] }) => {
  const { 
    isAuthenticated, 
    loading, 
    hasRole, 
    hasPermission,
    user 
  } = useAuth();
  const location = useLocation();

  // Show loader while checking auth
  if (loading) {
    return <Loader message="Checking authentication..." />;
  }

  // Check authentication
  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check if user has required roles
  const hasRequiredRole = requiredRoles.length === 0 || 
    requiredRoles.some(role => hasRole(role));

  // Check if user has required permissions
  const hasRequiredPermission = requiredPermissions.length === 0 ||
    requiredPermissions.some(permission => hasPermission(permission));

  if (!hasRequiredRole || !hasRequiredPermission) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;