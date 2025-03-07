"use client";

import { Amplify } from '@aws-amplify/core';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      identityPoolId: 'us-east-1:615a7c59-ab21-49a8-9c40-814d647c7e53',
      loginWith: {
        oauth: {
          domain: 'us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['https://dev.bedsflooring.com/'],
          redirectSignOut: ['https://dev.bedsflooring.com/'],
          responseType: "code" as "code" | "token"
        }
      }
    }
  }
};

// Configure Amplify immediately
Amplify.configure(amplifyConfig);

// Only export the configuration component - no RootLayout here!
export default function AmplifyConfig() {
  return null;
}