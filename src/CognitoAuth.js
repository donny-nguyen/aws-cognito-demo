import React, { useState, useEffect } from 'react';
import { Authenticator, useTheme, View, Text, Heading } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';

const AuthenticatedApp = ({ user, signOut }) => {
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserAttributes(currentUser);
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      }
    };

    fetchUserAttributes();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Heading level={1}>Welcome to AWS Cognito App!</Heading>
      
      <div style={{ margin: '2rem 0' }}>
        <Text>Hello, {user?.signInDetails?.loginId || 'User'}!</Text>
        
        {userAttributes && (
          <div style={{ margin: '1rem 0' }}>
            <Text>User ID: {userAttributes.userId}</Text>
            <br />
            <Text>Username: {userAttributes.username}</Text>
          </div>
        )}
      </div>

      <button 
        onClick={signOut}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Sign Out
      </button>

      <div style={{ marginTop: '2rem' }}>
        <Heading level={3}>What you can do now:</Heading>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>User is authenticated with AWS Cognito</li>
          <li>You can access user attributes and profile information</li>
          <li>Implement protected routes and features</li>
          <li>Add role-based access control</li>
          <li>Integrate with other AWS services</li>
        </ul>
      </div>
    </div>
  );
};

const CognitoAuth = () => {
  const { tokens } = useTheme();

  const components = {
    Header() {
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Heading level={1}>AWS Cognito Authentication</Heading>
          <Text>Sign in to your account or create a new one</Text>
        </View>
      );
    },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Authenticator components={components} hideSignUp={true}>
        {({ signOut, user }) => (
          <AuthenticatedApp user={user} signOut={signOut} />
        )}
      </Authenticator>
    </div>
  );
};

export default CognitoAuth;