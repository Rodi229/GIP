import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;