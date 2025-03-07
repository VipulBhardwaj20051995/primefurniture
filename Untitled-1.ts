import { Amplify } from '@aws-amplify/core';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      identityPoolId: 'us-east-1:615a7c59-ab21-49a8-9c40-814d647c7e53', // If you have one
      loginWith: {
        oauth: {
          domain: 'https://us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['https://dev.bedsflooring.com/'],
          redirectSignOut: ['https://dev.bedsflooring.com/'],
          responseType: 'code'
        }
      }
    }
  }
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

export default amplifyConfig;

// Initialize Amplify
configureAmplify();

import { Auth } from 'aws-amplify';

function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="google-signin-button">
      Continue with Google
    </button>
  );
}

export default GoogleSignIn;