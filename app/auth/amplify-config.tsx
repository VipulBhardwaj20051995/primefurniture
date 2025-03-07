"use client";

import { Amplify } from '@aws-amplify/core';
import { cognitoUserPoolsTokenProvider } from '@aws-amplify/auth/cognito';

const amplifyConfig = {
  Auth: {
    Cognito: {  // Note: Gen 2 uses a nested "Cognito" property
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      identityPoolId: 'us-east-1:12345678-1234-1234-1234-123456789012'
    },
    oauth: {
      domain: 'us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://dev.bedsflooring.com/',
      redirectSignOut: 'https://dev.bedsflooring.com/',
      responseType: 'code'
    },
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH'
  }
};

// Function to configure Amplify
export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

// Component for use in layout files
export default function AmplifyConfig() {
  // Configure Amplify on component mount
  Amplify.configure(amplifyConfig);
  
  return null; // This component doesn't render anything
}