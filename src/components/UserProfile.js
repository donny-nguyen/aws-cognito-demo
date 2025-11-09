import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [userAttributes, setUserAttributes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAttributes = async () => {
      if (isAuthenticated) {
        try {
          const attributes = await fetchUserAttributes();
          setUserAttributes(attributes);
        } catch (error) {
          console.error('Error fetching user attributes:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getUserAttributes();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Please sign in to view your profile</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Profile</h2>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <h3>Basic Information</h3>
        <p><strong>Username:</strong> {user?.username || 'N/A'}</p>
        <p><strong>User ID:</strong> {user?.userId || 'N/A'}</p>
        <p><strong>Email:</strong> {userAttributes.email || 'N/A'}</p>
        <p><strong>Email Verified:</strong> {userAttributes.email_verified || 'N/A'}</p>
      </div>

      <div style={{ 
        backgroundColor: '#e8f4ff', 
        padding: '1rem', 
        borderRadius: '8px' 
      }}>
        <h3>Session Information</h3>
        <p><strong>Sign-in Method:</strong> {user?.signInDetails?.loginId || 'N/A'}</p>
        <p><strong>Auth Flow Type:</strong> {user?.signInDetails?.authFlowType || 'N/A'}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Available Actions</h3>
        <ul>
          <li>Update profile information</li>
          <li>Change password</li>
          <li>Enable multi-factor authentication</li>
          <li>View sign-in history</li>
          <li>Manage connected devices</li>
        </ul>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          Note: These features can be implemented using additional AWS Amplify Auth APIs.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;