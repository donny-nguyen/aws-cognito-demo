import { useState, useEffect } from 'react';
import { getCurrentUser, signOut as amplifySignOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthState();

    // Listen for auth state changes
    const hubListener = (data) => {
      const { payload } = data;
      
      switch (payload.event) {
        case 'signedIn':
          setUser(payload.data);
          setLoading(false);
          break;
        case 'signedOut':
          setUser(null);
          setLoading(false);
          break;
        case 'tokenRefresh':
          // Handle token refresh if needed
          break;
        default:
          break;
      }
    };

    const unsubscribe = Hub.listen('auth', hubListener);

    return () => {
      unsubscribe();
    };
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('User not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
  };
};