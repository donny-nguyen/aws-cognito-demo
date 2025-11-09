// AWS Amplify Configuration
// Make sure to set up your environment variables in .env.local

const awsConfig = {
  Auth: {
    Cognito: {
      // REQUIRED - Amazon Cognito Region
      region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
      
      // REQUIRED - Amazon Cognito User Pool ID
      userPoolId: process.env.REACT_APP_USER_POOL_ID || 'YOUR_USER_POOL_ID',
      
      // REQUIRED - Amazon Cognito Web Client ID
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || 'YOUR_USER_POOL_CLIENT_ID',
      
      // OPTIONAL - Hosted UI configuration
      loginWith: {
        oauth: {
          domain: process.env.REACT_APP_COGNITO_DOMAIN || 'YOUR_COGNITO_DOMAIN.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [process.env.REACT_APP_REDIRECT_SIGN_IN || 'http://localhost:3000/'],
          redirectSignOut: [process.env.REACT_APP_REDIRECT_SIGN_OUT || 'http://localhost:3000/'],
          responseType: 'code',
        },
      },
    },
  },
};

export default awsConfig;