# AWS Cognito React Authentication

This project demonstrates how to integrate AWS Cognito authentication with a React application using AWS Amplify.

## Features

- ✅ User Sign Up
- ✅ User Sign In  
- ✅ User Sign Out
- ✅ Password Reset
- ✅ Email Verification
- ✅ Protected Routes
- ✅ User Session Management
- ✅ Responsive UI Components

## Prerequisites

1. **AWS Account**: You need an AWS account to create a Cognito User Pool
2. **Node.js**: Version 14 or higher
3. **npm or yarn**: Package manager

## AWS Cognito Setup

### 1. Create a User Pool

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Click "Create User Pool"
3. Choose "Email" as the sign-in option
4. Configure required attributes (email is recommended)
5. Set up password requirements
6. Complete the creation process

### 2. Create an App Client

1. In your User Pool, go to "App Integration" → "App clients"
2. Click "Create app client"
3. Choose "Public client" 
4. Configure the following:
   - **App client name**: Your app name
   - **Authentication flows**: Enable "ALLOW_USER_PASSWORD_AUTH" and "ALLOW_REFRESH_TOKEN_AUTH"
   - **OAuth 2.0 settings**:
     - Allowed callback URLs: `http://localhost:3000/`
     - Allowed sign-out URLs: `http://localhost:3000/`
     - OAuth grant types: Authorization code grant
     - OAuth scopes: email, openid, profile

### 3. Set up Hosted UI (Optional)

1. In your User Pool, go to "App Integration" → "Domain"
2. Create a domain prefix for your hosted UI
3. Note the full domain URL

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your AWS Cognito configuration:
   ```env
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_USER_POOL_ID=us-east-1_xxxxxxxxx
   REACT_APP_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   REACT_APP_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
   REACT_APP_REDIRECT_SIGN_IN=http://localhost:3000/
   REACT_APP_REDIRECT_SIGN_OUT=http://localhost:3000/
   ```

### 3. Start the Development Server

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.js    # Route protection component
├── hooks/
│   └── useAuth.js           # Authentication state hook
├── aws-config.js            # AWS Amplify configuration
├── CognitoAuth.js          # Main authentication component
├── App.js                  # Main app component
└── index.js                # App entry point with Amplify setup
```

## Key Components

### CognitoAuth.js
Main authentication component that provides:
- Sign in/sign up forms
- User profile display
- Sign out functionality

### useAuth Hook
Custom React hook that provides:
- User authentication state
- Loading states
- Sign out functionality
- Auth state changes listener

### ProtectedRoute Component
Wrapper component that:
- Protects routes that require authentication
- Redirects to sign-in if user is not authenticated
- Shows loading state during auth checks

## Usage Examples

### Using the useAuth Hook
```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, loading, signOut, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

### Protecting Routes
```javascript
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <ProtectedRoute>
        <MySecureComponent />
      </ProtectedRoute>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Invalid configuration**: Make sure all environment variables are set correctly
2. **CORS issues**: Ensure your callback URLs match exactly in Cognito settings
3. **Network errors**: Check if you're using the correct AWS region
4. **User not confirmed**: New users need to verify their email before signing in

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **HTTPS in Production**: Always use HTTPS for redirect URLs in production
3. **Token Storage**: AWS Amplify handles secure token storage automatically
4. **Session Management**: Tokens are automatically refreshed by Amplify

## Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Amplify UI React Components](https://ui.docs.amplify.aws/react)
- [AWS Amplify Auth API](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
- [Secure your API Gateway with Amazon Cognito User Pools | Step by Step AWS Tutorial](https://www.youtube.com/watch?v=oFSU6rhFETk)

---

## Original Create React App Scripts

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
