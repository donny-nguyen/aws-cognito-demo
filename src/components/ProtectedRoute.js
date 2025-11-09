import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Authenticator } from '@aws-amplify/ui-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Authenticator>
        {() => children}
      </Authenticator>
    );
  }

  return children;
};

export default ProtectedRoute;